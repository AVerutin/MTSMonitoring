﻿using MtsConnect;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace MTSMonitoring
{
    public class MTS
    {
        public bool Connected { get; private set; }
        private static MtsTcpConnection _connection;
        // private static SubscriptionConfig _subsCfg;
        private static Subscription _subscription;
        private Action<SubscriptionStateEventArgs> _callBack;
        // private Action<SubscriptionStateEventArgs> _failedCallBack;
        private int _reconnectTimeout;
        private int _timeout;


        private static string _address;
        private static int _port;

        public MTS(string addr, int port) 
        { 
            _address = addr;
            _port = port;
            _reconnectTimeout = 3000;
            _timeout = 1500;
        }

        public bool Connect ()
        {
            bool Res = false;
            try
            {
                _connection = MtsTcpConnection.Create(_address, _port);
                Res = true;
            }
            catch
            {
                Connected = Res;
            }

            return Res;
        }

        private void SubscribeInternal()
        {
            // Устанавливаем подписки на изменение значения сигналов
            if (_subscription == null)
                return;

            _subscription.NewData += SubscriptionOnNewData;  // Подписка на изменение данных
            _subscription.OnError += SubscriptionOnError;    // Подписка на возникновение ошибки
        }

        private void SubscriptionOnNewData(object sender, SubscriptionStateEventArgs e) =>
    _callBack?.Invoke(e);

        private void SubscriptionOnError(object sender, SubscriptionErrorEventArgs e)
        {
            // Вызов функции обратного вызова и попытка переподключения при возникновении ошибки от сигнала
            // _failedCallBack?.Invoke(e);
            Connected = false;
            TryReconnect();
        }

        private void TryConnect()
        {
            if (!Connected)
            {
                try
                {
                    // Пытаемся создать подключение к MTSSercice
                    _connection = MtsTcpConnection.Create(_address, _port);
                    Connected = true;

                    // Поключение создано, устанавливаем подписки на изменение значений сигналов
                    SubscribeInternal();
                }
                catch (Exception e)
                {
                    // Если не удалось подключиться
                    Connected = false;
                    // _failedCallBack?.Invoke("Не удается подключиться к источнику сигналов.");
                    Console.WriteLine(e.Message);
                    // Пытаемся переподключиться через указаное в настройках время
                    TryReconnect();
                }
            }
        }

        private void ResetConnection()
        {
            // Попытка сбросить предыдущее неудачное соединение
            _connection?.Dispose();
            if (_subscription == null)
                return;

            // Удаление предыдущих подписок на сигналы
            _subscription.OnError -= SubscriptionOnError;
            _subscription.NewData -= SubscriptionOnNewData;
        }

        private void TryReconnect()
        {
            // Попытка переподключения если прошло указанное в настройках время
            Task.Delay(TimeSpan.FromMilliseconds(_reconnectTimeout));

            // Сбрасываем предыдущую неудачную попытку подключения
            ResetConnection();

            // Пытаемся подключиться заново
            TryConnect();
        }

        public Task Subscribe(List<ushort> signalIds, Action<SubscriptionStateEventArgs> callBack)
        {
            _callBack = callBack;
            // _failedCallBack = failedCallBack;
            TryConnect();

            var subConfig = new SubscriptionConfig()
                .Identity("AVP")
                .Timeout(TimeSpan.FromMilliseconds(_timeout));
            foreach (var id in signalIds)
                subConfig.AddSignal(id);

            subConfig.AddAoI();
            _subscription = _connection.CreateNewSubscription(subConfig);
            SubscribeInternal();
            return Task.CompletedTask;
        }
    }
}
