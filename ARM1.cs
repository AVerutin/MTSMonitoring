using Microsoft.AspNetCore.SignalR;
using NLog;
using MtsConnect;
using System;
using System.Collections.Generic;
// using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.Design;
using static MTSMonitoring.Statuses;
// using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MTSMonitoring
{
    public class ARM1 : Hub
    {
        private MTS mts;
        private string mtsIP;
        private int mtsPort;
        private int mtsTimeout;
        private int mtsReconnect;
        private IConfigurationRoot config;
        DBConnection db;

        private Logger logger;
        private readonly List<IClientProxy> clients = new List<IClientProxy>();

        // Загрузочные бункера 1 и 2
        private InputTanker tanker1;
        private string material1;
        private InputTanker tanker2;
        private string material2;

        // Силоса 8 штук
        private Silos silos1;
        private Silos silos2;
        private Silos silos3;
        private Silos silos4;
        private Silos silos5;
        private Silos silos6;
        private Silos silos7;
        private Silos silos8;

        // Конвейеры 3 штуки
        private Conveyor conveyor1;
        private Conveyor conveyor2;
        private Conveyor conveyor3;

        // Обработка вновь подключившегося клиента
        public override async Task OnConnectedAsync()
        {
            logger = LogManager.GetCurrentClassLogger();
            clients.Add(Clients.Caller);
            logger.Info("Подлючился новый клиент {0}", Context.ConnectionId);

            Init();
            Subscribe();
            await base.OnConnectedAsync();
        }

        // Прием сообщений от веб-клиента
        public Task SendARM1(string message)
        {
            Console.WriteLine(message);

            if (message == "getMeData")
            {

            }

            return base.OnConnectedAsync();
        }

        /// <summary>
        /// Первоначальная инициализация техузлов
        /// </summary>
        private void Init()
        {
            db = new DBConnection();
            string msgStats = "{\"Statuses\":[";

            tanker1 = new InputTanker(1);   // Загрузочный бункер 1
            material1 = "";
            msgStats += "{\"id\":\"Input1\",\"status\":\"off\"},";

            tanker2 = new InputTanker(2);   // Загрузочный бункер 2
            material2 = "";
            msgStats += "{\"id\":\"Input2\",\"status\":\"off\"},";

            silos1 = new Silos(1);  // Силос 1
            msgStats += "{\"id\":\"Silos1\",\"status\":\"off\"},";
            silos2 = new Silos(2);  // Силос 2
            msgStats += "{\"id\":\"Silos2\",\"status\":\"off\"},";
            silos3 = new Silos(3);  // Силос 3
            msgStats += "{\"id\":\"Silos3\",\"status\":\"off\"},";
            silos4 = new Silos(4);  // Силос 4
            msgStats += "{\"id\":\"Silos4\",\"status\":\"off\"},";
            silos5 = new Silos(5);  // Силос 5
            msgStats += "{\"id\":\"Silos5\",\"status\":\"off\"},";
            silos6 = new Silos(6);  // Силос 6
            msgStats += "{\"id\":\"Silos6\",\"status\":\"off\"},";
            silos7 = new Silos(7);  // Силос 7
            msgStats += "{\"id\":\"Silos7\",\"status\":\"off\"},";
            silos8 = new Silos(8);  // Силос 8
            msgStats += "{\"id\":\"Silos8\",\"status\":\"off\"},";

            conveyor1 = new Conveyor(1, Conveyor.Types.Horizontal, 5);
            msgStats += "{\"id\":\"Conveyor1\",\"status\":\"off\"},";
            conveyor2 = new Conveyor(2, Conveyor.Types.Vertical, 25);
            msgStats += "{\"id\":\"Conveyor2\",\"status\":\"off\"},";
            conveyor3 = new Conveyor(3, Conveyor.Types.Horizontal, 3);
            msgStats += "{\"id\":\"Conveyor3\",\"status\":\"off\"}";

            msgStats += "]}";
            Clients.All.SendAsync("statuses", msgStats);
        }

        /// <summary>
        /// Оформление подписки на сигналы от MTS Service
        /// </summary>
        private async void Subscribe()
        {
            // Читаем параметры подключения к MTSService
            config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            mtsIP = config.GetSection("Mts:Ip").Value;
            mtsPort = Int32.Parse(config.GetSection("Mts:Port").Value);
            mtsTimeout = Int32.Parse(config.GetSection("Mts:Timeout").Value);
            mtsReconnect = Int32.Parse(config.GetSection("Mts:ReconnectTimeout").Value);

            // Получаем список сигналов из файла ConfigMill.txt
            ConfigMill cnf_mill = new ConfigMill();
            List<ushort> signals = cnf_mill.GetSignals();

            // Создание подключения к службе MTSService
            mts = new MTS("ARM-1", mtsIP, mtsPort, mtsTimeout, mtsReconnect);

            // Открытие подписки на сигналы
            await mts.Subscribe(signals, SubOnNewDiff);
        }

        // Обработка полученных сигналов от MTS Service
        private void SubOnNewDiff(SubscriptionStateEventArgs e)
        {
            SignalsState diff = e.Diff.Signals;
            if (diff == null)
                return;

            foreach (var (Key, Value) in diff)
            {
                // Key   - номер сигнала
                // Value - полученное значение сигнала
                switch (Key)
                {
                    case 4038: LoadInput(1, Value); break;
                    case 4039: LoadInput(2, Value); break;
                    case 4040: UnloadInput(1, Value); break;
                    case 4041: UnloadInput(2, Value); break;
                    case 4014: LoadSilos(1, Value); break;
                    case 4015: LoadSilos(2, Value); break;
                    case 4016: LoadSilos(3, Value); break;
                    case 4017: LoadSilos(4, Value); break;
                    case 4018: LoadSilos(5, Value); break;
                    case 4019: LoadSilos(6, Value); break;
                    case 4020: LoadSilos(7, Value); break;
                    case 4021: LoadSilos(8, Value); break;
                    case 4042: SetMaterial(1, Value); break;
                    case 4043: SetMaterial(2, Value); break;
                }
            }
        }

        /// <summary>
        /// Установить выбранный материал для загрузочного бункера
        /// </summary>
        /// <param name="number">Номер загрузочного бункера</param>
        /// <param name="material">Номер материала по списку</param>
        private void SetMaterial(int number, double material)
        {
            if (number > 2 || number == 0)
            {
                logger.Error($"Отсутствует загрузочный бункер с номером [{number}]");
                throw new ArgumentOutOfRangeException($"Отсутствует загрузочный бункер с номером [{number}]");
            }

            int _material = (int)material;

            string[] materials = { "", "Al Met", "Al2O3", "CaC2", "CaF2", "CaMg", "CaO", "Carbon", "FeB", "FeCr", "FeMn", "FeNb", 
                "FeSi", "FeSiMn", "FeV", "FOMi", "Met Mn", "MgO", "Mn", "SiC", "USM" };

            if (_material == 0 || _material > materials.Length)
            {
                logger.Error($"Материал с номером [{number}] не определен!");
                throw new ArgumentOutOfRangeException($"Материал с номером [{number}] не определен!");
            }

            switch (number)
            {
                case 1: material1 = materials[_material]; break;
                case 2: material2 = materials[_material]; break;
            }
        }

        /// <summary>
        /// Загрузка загрузочного бункера
        /// </summary>
        /// <param name="number">Номер загрузочного бункера</param>
        private void LoadInput(int number, double value)
        {
            InputTanker tanker;
            string _material;
            string msgStats;

            switch (number)
            {
                case 1:
                    {
                        // Бункер 1
                        tanker = tanker1;
                        _material = material1;
                        break;
                    }
                case 2:
                    {
                        // Бункер 2
                        tanker = tanker2;
                        _material = material2;
                        break;
                    }
                default:
                    {
                        // Неправильный номер загрузочного бункера
                        logger.Error($"Неправильный номер загрузочного бункера: {number}");
                        throw new ArgumentOutOfRangeException($"Неправильный номер загрузочного бункера: {number}");
                    }
            }

            // Получаем материал, выбранный для этого бункера
            if (_material == "")
            {
                logger.Error($"Не установлен материал для загрузочного бункера [{number}]");
                tanker.SetStatus(Status.Error);
                Clients.All.SendAsync("statuses", "{'status': 'error'}");
                throw new ArgumentNullException($"Не установлен материал для загрузочного бункера [{number}]");
            }

            // Получаем материал, установленный для выбранного загрузочного бункера
            string loadedMaterial = tanker.GetMaterial();

            // Если выбранный материал для загрузки в загрузочный бункер и материал, который установлен
            // для этого загрузочного бункера не совпадают, выдать сообщение оператору и установить состояние ошибки
            if (_material != loadedMaterial)
            {
                logger.Error($"Нельзя загрузить материал [{_material}] в бункер, для которого установлен материал [{loadedMaterial}]");
                tanker.SetStatus(Status.Error);

                // Передаем веб-клиенту статус загрузочного бункера
                msgStats = "{\"Statuses\":[{\"id\":\"" + tanker + "\",\"status\":\"error\"}]}";
                Clients.All.SendAsync("statuses", msgStats);

                throw new TypeAccessException($"Нельзя загрузить материал [{_material}] в бункер, для которого установлен материал [{loadedMaterial}]");
            }

            // Передаем веб-клиенту статус загрузочного бункера
            msgStats = "{\"Statuses\":[{\"id\":\"" + tanker + "\",\"status\":\"on\"}]}";
            Clients.All.SendAsync("statuses", msgStats);

            List<Material> material = GetMaterial(_material);
            if (material.Count == 0)
            {
                logger.Error($"Материал [{_material}] не найден в базе данных!");

                // Передаем веб-клиенту статус загрузочного бункера
                msgStats = "{\"Statuses\":[{\"id\":\"" + tanker + "\",\"status\":\"error\"}]}";
                Clients.All.SendAsync("statuses", msgStats);
                throw new ArgumentNullException($"Материал [{_material}] не найден в базе данных!");
            }
        }

        /// <summary>
        /// Разгрузка загрузочного бункера
        /// </summary>
        /// <param name="number">Номер загрузочного бункера</param>
        private void UnloadInput(int number, double value)
        {
            switch (number)
            {
                case 1:
                    {
                        // Бункер 1
                        break;
                    }
                case 2:
                    {
                        // Бункер 2
                        break;
                    }
            }
        }


        private void LoadSilos(int number, double value)
        {
            switch (number)
            {
                case 1:
                    {
                        // Силос 1
                        break;
                    }
                case 2:
                    {
                        // Силос 2
                        break;
                    }
                case 3:
                    {
                        // Силос 3
                        break;
                    }
                case 4:
                    {
                        // Силос 4
                        break;
                    }
                case 5:
                    {
                        // Силос 5
                        break;
                    }
                case 6:
                    {
                        // Силос 6
                        break;
                    }
                case 7:
                    {
                        // Силос 7
                        break;
                    }
                case 8:
                    {
                        // Силос 8
                        break;
                    }

            }
        }

        /// <summary>
        /// Получить материал из базы данных по его наименованию (список по номерам партий)
        /// </summary>
        /// <returns>Список доступных номеров партий материала по его наименованию</returns>
        private List<Material> GetMaterial(string materialName)
        {
            List<Material> materilas = db.GetMaterials(materialName);

            return materilas;
        }
    }
}
