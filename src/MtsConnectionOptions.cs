namespace MTSMonitoring
{
    internal class MtsConnectionOptions
    {
        /// <summary>
        /// Адрес сервера MTSService
        /// </summary>
        public string Ip { get; set; }

        /// <summary>
        /// Номер порта сервера
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// Максимальное время ожидания подключения к серверу MTSService
        /// </summary>
        public int Timeout { get; set; }

        /// <summary>
        /// Время в миллисекундах через которое пытаемся переподелючиться к источнику сигналов
        /// </summary>
        public int ReconnectTimeout { get; set; }
    }
}