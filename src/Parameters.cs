namespace MTSMonitoring
{
    /// <summary>
    /// Список параметров единицы учета
    /// </summary>
    public class Parameters
    {
        // Состав параметров единицы учета
        // Добавить сюда все необходимые параметры для единицы учета
        public ulong UID { get;  set; }
        public uint PlavNo { get; set; }

        // Конструктор по умолчанию, устанавливает значения всех свойств класса
        public Parameters()
        {
            UID = default;
            PlavNo = default;
        }

        /// <summary>
        /// Конструктор класса, создающий экземпляр класса с установленным UID
        /// </summary>
        /// <param name="uid">Уникальный идентификатор единицы учета</param>
        public Parameters(ulong uid)
        {
            UID = uid;
            PlavNo = default;
        }

        /// <summary>
        /// Конструктор класса, создающий экземпляр класса с установленным UID и номером плавки
        /// </summary>
        /// <param name="uid">Уникальный идентификатор единицы учета</param>
        /// <param name="plavno">Номер плавки</param>
        public Parameters(ulong uid, uint plavno)
        {
            UID = uid;
            PlavNo = plavno;
        }
    }
}
