using Microsoft.AspNetCore.SignalR;
using static MTSMonitoring.MTLogger;
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
        private Dictionary<ushort, double> sensorsList = new Dictionary<ushort, double>();
        private readonly List<IClientProxy> clients = new List<IClientProxy>();

        private async void GetMTSStats()
        {
            // Получаем список сигналов из файла ConfigMill.txt
            ConfigMill cnf_mill = new ConfigMill();
            List<ushort> signals = cnf_mill.GetSignals();

            // Читаем параметры подключения к СУБД PostgreSQL
            config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            string db_host = config.GetSection("PGSQL:DBHost").Value;
            string db_port = config.GetSection("PGSQL:DBPort").Value;
            string db_name = config.GetSection("PGSQL:DBName").Value;
            string db_user = config.GetSection("PGSQL:DBUser").Value;
            string db_pass = config.GetSection("PGSQL:DBPass").Value;

            // Читаем параметры подключения к MTSService
            mtsIP = config.GetSection("Mts:Ip").Value;
            mtsPort = Int32.Parse(config.GetSection("Mts:Port").Value);
            mtsTimeout = Int32.Parse(config.GetSection("Mts:Timeout").Value);
            mtsReconnect = Int32.Parse(config.GetSection("Mts:ReconnectTimeout").Value);

            /* Начало тестирование модуля работы со слоями материалов */

            Ingot ingot = new Ingot();
            ingot.Test();

            DBConnectionOptions DBCnf = new DBConnectionOptions(config);
            DBConnection db = new DBConnection(DBCnf);
            if (db.Connect())
            {
                // Устанорвлено подключение к СУБД
                Logger.Info("Подключились к СУБД");
                bool q = db.ExequteQuery("CREATE TABLE IF NOT EXISTS Material (Id SERIAL PRIMARY KEY, Name varchar(10), Partno smallint, Weight real);");
                var data = db.ReadData();
            }

            /* Конец тестирования модуля работы со слоями материалов */

            List<ushort> ids = new List<ushort>();
            sensors = new Sensors();

            foreach (ushort item in signals)
            {
                // ushort sensor = item;
                ids.Add(item);
                sensors.AddSensor(item);
            }

            // Вынести параметры подключения в файл настроек
            mts = new MTS(mtsIP, mtsPort, mtsTimeout, mtsReconnect);
            await mts.Subscribe(ids, SubOnNewDiff);
        }

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
            InitNlog();
            clients.Add(Clients.Caller);
            Logger.Info($"Подлючился новый клиент {Context.ConnectionId}.");

            //await Clients.All.SendAsync("send", $"{Context.ConnectionId} вошел в чат");
            GetMTSStats();
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
