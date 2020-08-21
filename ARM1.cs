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
    public class ARM1 : Hub
    {

        private Logger logger;
        private readonly List<IClientProxy> clients = new List<IClientProxy>();

        // Обработка вновь подключившегося клиента
        public override async Task OnConnectedAsync()
        {
            logger = LogManager.GetCurrentClassLogger();
            clients.Add(Clients.Caller);
            logger.Info("Подлючился новый клиент {0}", Context.ConnectionId);

            //await Clients.All.SendAsync("send", $"{Context.ConnectionId} вошел в чат");
            // Subscribe();
            await base.OnConnectedAsync();
        }

    }
}
