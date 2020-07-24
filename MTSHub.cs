using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace MTSMonitoring
{
    public class MTSHub : Hub
    {
        private static int MtsConnection;
        private static string Message;

        private string GetMTSStats()
        {
            // var _timer = new Timer(GetData, null, TimeSpan.Zero, TimeSpan.FromSeconds(15));
            GetData();
            return Message;
        }

        private void GetData()
        {
            Message = "{\"Sensors\": [{\"id\":4000, \"val\":15}, {\"id\":4001, \"val\":2}, {\"id\":4002, \"val\":3}, {\"id\":4003, \"val\":21}]}";
        }

        public Task Send(string message)
        {
            if (message == "getMeData")
            {
                string answer = GetMTSStats();
                Clients.Caller.SendAsync("send", answer);
                // Clients.Caller.SendAsync("send", GetMTSStats());
            }

            return base.OnConnectedAsync();
        }
    }
}
