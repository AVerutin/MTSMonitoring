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
    public class MTSHub : Hub
    {
        private MTS mts;
        private string mtsIP;
        private int mtsPort;
        private int mtsTimeout;
        private int mtsReconnect;
        private IConfigurationRoot config;
        private Sensors sensors;
        private readonly Dictionary<ushort, double> sensorsList = new Dictionary<ushort, double>();
        private readonly List<IClientProxy> clients = new List<IClientProxy>();
        private Logger logger;

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

            /**********************************************************/
            /* Начало тестирование модуля работы со слоями материалов */
            /**********************************************************/
            /**/
            /**/ Ingot ingot = new Ingot();
            /**/ ingot.Test();
            /**/
            /**/ DBConnection db = new DBConnection();
            /**/
            /**/ // Устанорвлено подключение к СУБД
            /**/ logger.Info("Подключились к СУБД");
            /**/ db.InitDB();
            /**/ var data = db.ReadData();
            /**/ 
            /**/ Material mt = new Material(13, "CaO", 10, 7.9, 7.2);
            /**/ bool m = db.AddMaterial(mt);
            /**/
            /*********************************************************/
            /* Конец тестирования модуля работы со слоями материалов */
            /*********************************************************/

            // Получаем список сигналов из файла ConfigMill.txt
            ConfigMill cnf_mill = new ConfigMill();
            List<ushort> signals = cnf_mill.GetSignals();
            List<ushort> ids = new List<ushort>();
            sensors = new Sensors();

            foreach (ushort item in signals)
            {
                ids.Add(item);
                sensors.AddSensor(item);
            }

            // Создание подключения к службе MTSService
            mts = new MTS(mtsIP, mtsPort, mtsTimeout, mtsReconnect);

            // Открытие подписки на сигналы
            await mts.Subscribe(ids, SubOnNewDiff);
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
            Subscribe();
            await base.OnConnectedAsync();
        }

        // Обработка отключившегося клиента
        //public override async Task OnDisconnectedAsync(Exception exception)
        //{
        //    await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} покинул в чат");
        //    await base.OnDisconnectedAsync(exception);
        //}

        // Прием сообщений от клиента
        //public Task Send(string message)
        //{
        //    if (message == "getMeData")
        //    {

        //    }

        //    return base.OnConnectedAsync();
        //}
    }
}
