using Microsoft.AspNetCore.SignalR;
using MtsConnect;
using System;
using System.Collections.Generic;
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
        private List<IClientProxy> clients = new List<IClientProxy>();

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
                        throw new ArgumentNullException();

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
                
                sensors.SetValue(key, val.ToString());
                // Console.WriteLine("New signal from MTS: {0} = {1}", key, val);
                Message = sensors.toString();
                foreach (var client in clients)
                {
                    client.SendAsync("receive", Message);
                }
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
