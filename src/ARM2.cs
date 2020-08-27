using Microsoft.AspNetCore.SignalR;
using NLog;
using MtsConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace MTSMonitoring
{
    public class ARM2 : Hub
    {
        private MTS mts;
        private string mtsIP;
        private int mtsPort;
        private int mtsTimeout;
        private int mtsReconnect;
        private IConfigurationRoot config;
        // private Sensors sensors;
        private readonly Dictionary<ushort, double> sensorsList = new Dictionary<ushort, double>();
        private readonly List<IClientProxy> clients = new List<IClientProxy>();
        private Logger logger;

        private void TestModule()
        {
            /**********************************************************/
            /* Начало тестирование модуля работы со слоями материалов */
            /**********************************************************/

            Ingot ingot = new Ingot();
            ingot.Test();

            // Установлено подключение к СУБД
            DBConnection db = new DBConnection();
            logger.Info("Подключились к СУБД");

            db.InitDB();
            var data = db.GetMaterials("FeSiMn");

            Material mt = new Material(15, "FeSiMn", 10, 7.9, 8.2);
            bool m = db.AddMaterial(mt);

            InputTanker tanker1 = new InputTanker(1);
            tanker1.Load(mt);
            mt = new Material(16, "FeSiMn", 15, 12.3, 12.7);
            tanker1.Load(mt);

            Silos silos1 = new Silos(1);
            Silos silos2 = new Silos(2);
            silos1.Load(tanker1, 12);

            WeightTanker weight1 = new WeightTanker(1);
            weight1.AddSilos(silos1);
            weight1.AddSilos(silos2);
            weight1.Load(silos1, 10);

            List<Material> u = weight1.Unload(1.3);

            Conveyor conveyor1 = new Conveyor(1, Conveyor.Types.Horizontal, 78);
            conveyor1.SetSpeed(3);
            conveyor1.Deliver(u, onDelivered);

            /*********************************************************/
            /* Конец тестирования модуля работы со слоями материалов */
            /*********************************************************/
        }

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
            // sensors = new Sensors();

            // List<ushort> ids = new List<ushort>();
            // foreach (ushort item in signals)
            // {
            //    ids.Add(item);
            //    sensors.AddSensor(item);
            // }

            // Создание подключения к службе MTSService
            mts = new MTS("ARM-2", mtsIP, mtsPort, mtsTimeout, mtsReconnect);

            // Открытие подписки на сигналы
            await mts.Subscribe(/* ids */ signals, SubOnNewDiff);
        }

        /// <summary>
        /// Метод, вызываемый при доставке материала через конвейер
        /// </summary>
        /// <param name="material"></param>
        private void onDelivered(List<Material> material)
        {
            Console.WriteLine($"Материал {material[0].Name} был доставлен через конвейер");
        }

        /// <summary>
        /// Обработка сигнала при получении его нового значения
        /// </summary>
        /// <param name="e">Экземпляр класса MtsConnect.SubscriptionStateEventArgs</param>
        private void SubOnNewDiff(SubscriptionStateEventArgs e)
        {
            string msg;
            SignalsState diff = e.Diff.Signals;
            if (diff == null)
                return;

            foreach (var (key, value) in diff)
            {
                string val;
                if (key == 777)
                {
                    val = String.Format("{0:f0}", value);
                }
                else
                {
                    val = String.Format("{0:f4}", value);
                }

                // Вести локально список сигналов и их значений. Отправлять клиенту только номер одного сигнала и его значения,
                // если значение изменилось

                // Проверяем, есть ли полученный сигнал в списке
                if (sensorsList.ContainsKey(key))
                {
                    // Этот сигнал уже есть
                    for (int i=0; i<sensorsList.Count; ++i)
                    {
                        KeyValuePair<ushort, double> signal = sensorsList.ElementAt(i);
                        // Проверяем его значение
                        if (signal.Key == key && signal.Value != value)
                        {
                            // Если значение изменилось, обновляем его и отсылаем клиенту {Сигнал: Значение}
                            sensorsList[key] = value;
                            string v = value.ToString();
                            val = val.Replace(',', '.');
                            msg = "{\"Sensors\":[" + "{\"id\":" + key + "," + "\"value\":" + val + "}" + "]}";

                            foreach (var client in clients)
                            {
                                client.SendAsync("receive", msg);
                            }
                        }
                    }
                }
                else
                {
                    // Такого сигнала ещё нет
                    sensorsList.Add(key, value);
                    string v = value.ToString();
                    val = val.Replace(',', '.');
                    msg = "{\"Sensors\":[" + "{\"id\":" + key + "," + "\"value\":" + val + "}" + "]}";

                    foreach (var client in clients)
                    {
                        client.SendAsync("receive", msg);
                    }
                }

                // sensors.SetValue(key, val.ToString());
                // Console.WriteLine("New signal from MTS: {0} = {1}", key, val);
                // Message = sensors.ToString();
                // foreach (var client in clients)
                // {
                    // client.SendAsync("receive", Message);
                // }
            }
        }

        // Обработка вновь подключившегося клиента
        public override async Task OnConnectedAsync()
        {
            logger = LogManager.GetCurrentClassLogger();
            clients.Add(Clients.Caller);
            logger.Info("Подлючился новый клиент {0}", Context.ConnectionId);

            //await Clients.All.SendAsync("send", $"{Context.ConnectionId} вошел в чат");
            // TestModule();
            Subscribe();
            await base.OnConnectedAsync();
        }

        // Обработка отключившегося клиента
        //public override async Task OnDisconnectedAsync(Exception exception)
        //{
        //    await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} покинул в чат");
        //    await base.OnDisconnectedAsync(exception);
        //}

        // Прием сообщений от веб-клиента
        public Task SendARM2(string message)
        {
            Console.WriteLine(message);

            if (message == "getMeData")
            {

            }

            return base.OnConnectedAsync();
        }
    }
}
