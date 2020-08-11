namespace MTSMonitoring
{
    public class DBConnectionOptions
    {
        /// <summary>
        /// Адрес сервера СУБД
        /// </summary>
        public string DBHost { get; set; }

        /// <summary>
        /// Порт для подключения к СУБД
        /// </summary>
        public ushort DBPort { get; set; }

        /// <summary>
        /// Имя базы данных
        /// </summary>
        public string DBName { get; set; }

        /// <summary>
        /// Имя пользователя СУБД
        /// </summary>
        public string DBUser { get; set; }

        /// <summary>
        /// Пароль для подключения к СУБД
        /// </summary>
        public string DBPass { get; set; }
    }
}
