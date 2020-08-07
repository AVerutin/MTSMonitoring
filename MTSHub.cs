using Microsoft.AspNetCore.SignalR;
using MtsConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTSMonitoring
{
    public class MTSHub : Hub
    {
        private MTS mts;
        private string mtsIP;
        private int mtsPort;
        private static string Message;
        private Sensors sensors;
        private Dictionary<ushort, double> sensorsList = new Dictionary<ushort, double>();
        private readonly List<IClientProxy> clients = new List<IClientProxy>();

        private async void GetMTSStats()
        {
            // Получаем список сигналов из файла ConfigMill.txt
            ConfigMill cnf_mill = new ConfigMill();
            List<ushort> signals = cnf_mill.GetSignals();

            // Читаем параметры подключения к MTSService
            Config cnf = new Config();
            Dictionary<string, string> _pars = cnf.GetConfigList();
            foreach (KeyValuePair<string, string> _par in _pars)
            {
                if (_par.Key == "address")
                {
                    if (_par.Value == "")
                    {
                        throw new ArgumentNullException();
                    }

                    mtsIP = _par.Value;
                    continue;
                }

                if (_par.Key == "port")
                    try
                    {
                        mtsPort = int.Parse(_par.Value);
                        continue;
                    }
                    catch
                    {
                        throw new ArgumentNullException();
                    }
            }

            List<ushort> ids = new List<ushort>();
            sensors = new Sensors();

            foreach (ushort item in signals)
            {
                // ushort sensor = item;
                ids.Add(item);
                sensors.AddSensor(item);
            }

            // Вынести параметры подключения в файл настроек
            mts = new MTS(mtsIP, mtsPort);
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

                sensors.SetValue(key, val.ToString());
                // Console.WriteLine("New signal from MTS: {0} = {1}", key, val);
                Message = sensors.ToString();
                // foreach (var client in clients)
                // {
                    // client.SendAsync("receive", Message);
                // }
            }
        }

        // Обработка вновь подключившегося клиента
        public override async Task OnConnectedAsync()
        {
            clients.Add(Clients.Caller);
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
