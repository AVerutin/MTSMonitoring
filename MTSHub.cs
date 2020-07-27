using Microsoft.AspNetCore.SignalR;
using MtsConnect;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace MTSMonitoring
{
    public class MTSHub : Hub
    {
        MTS mts;
        // private static bool _connected = false;
        private static string Message;
        Sensors sensors;
        List<IClientProxy> clients = new List<IClientProxy>();

        private async void GetMTSStats()
        {
            // var _timer = new Timer(GetData, null, TimeSpan.Zero, TimeSpan.FromSeconds(15));
            Config cnf = new Config();
            Dictionary<string, ushort> cnf_ = cnf.GetConfigList();
            List<ushort> ids = new List<ushort>();
            sensors = new Sensors();

            foreach (KeyValuePair<string, ushort> item in cnf_)
            {
                ushort sensor = item.Value;
                ids.Add(sensor);
                sensors.AddSensor(sensor);
            }

            mts = new MTS("10.23.196.4", 9977);
            // if (mts.Connected)
            // {
                await mts.Subscribe(ids, SubOnNewDiff);
            // }
            
            // GetData();
            // Clients.All.
            // return Task.CompletedTask;
        }

        private void SubOnNewDiff(SubscriptionStateEventArgs e)
        {
            SignalsState diff = e.Diff.Signals;
            if (diff == null)
                return;

            foreach (var (key, value) in diff)
            {
                //var signals = _signals[key];
                //if (signals == null || !signals.Any())
                //    continue;

                //foreach (var signal in signals)
                //    signal.Value = value;

                sensors.SetValue(key, value.ToString());
                Console.WriteLine($"New signal from MTS: {key} = {value}");
                Message = sensors.toString();
                // Clients.All.SendAsync("receive", Message);
                foreach (var client in clients)
                {
                    client.SendAsync("receive", Message);
                }
            }
            
        }

        //private void WriteError(SubscriptionStateEventArgs e)
        //{

        //}

        //public static void GetData()
        //{
        //    Sensors sensors = new Sensors();
        //    sensors.AddSensor(4000);
        //    sensors.AddSensor(4001);
        //    sensors.AddSensor(4002);
        //    sensors.AddSensor(4003);
        //    sensors.SetValue(4000, "15");
        //    sensors.SetValue(4001, "2");
        //    sensors.SetValue(4002, "3");
        //    sensors.SetValue(4003, "21");

        //    Message = sensors.toString();
        //}

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

        public Task Send(string message)
        {
            if (message == "getMeData")
            {
                // Connect to MTS Service
                // Subscribe to signals


                //TimerCallback tm = new TimerCallback(GetData);
                //var _timer = new Timer(tm, 0, TimeSpan.Zero, TimeSpan.FromSeconds(2));
                // GetMTSStats();
                // Clients.All.SendAsync("receive", Message);
            }

            return base.OnConnectedAsync();
        }
    }
}
