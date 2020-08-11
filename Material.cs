namespace MTSMonitoring
{
    /// <summary>
    /// Класс для описания материала
    /// </summary>
    public class Material
    {
        // Свойства класса Материал
        #region
        private long ID;           // Уникальный идентификационный номер
        private string Name;        // Наименование материала
        private int PartNo;        // Номер партии
        private double Weight;      // Вес партии материала 
        #endregion

        // Конструктор по умолчанию
        public Material()
        {
            ID = 0;
            Name = "";
            PartNo = 0;
            Weight = 0;
        }

        /// <summary>
        /// Конструктор для создания материала
        /// </summary>
        /// <param name="id">Уникальный идентификатор материала</param>
        /// <param name="name">Наименование материала</param>
        /// <param name="partno">Номер партии</param>
        /// <param name="weight">Вес</param>
        public Material(long id=0, string name = "", int partno = 0, double weight=0.0)
        {
            ID = id;
            Name = name;
            PartNo = partno;
            Weight = weight;
        }

        /// <summary>
        /// Установить параметры материала
        /// </summary>
        /// <param name="id">Уникальный идентификатор материала</param>
        /// <param name="name">Наименование материала</param>
        /// <param name="partno">Номер партии</param>
        /// <param name="weight">Вес</param>
        public void setMaterial(long id, string name, int partno, double weight)
        {
            ID = id;
            Name = name;
            PartNo = partno;
            Weight = weight;
        }

        // Получить имя материала
        public string getName()
        {
            return Name;
        }

        // Задать имя материала
        public void setName(string name)
        {
            Name = name;
        }

        // Получить номер партии материала
        public int getPartNo()
        {
            return PartNo;
        }

        // Задать номер партии материала
        public void setPartNo(int partno)
        {
            PartNo = partno;
        }

        // Получить вес материала
        public double getWeight()
        {
            return Weight;
        }

        // Задать вес материала
        public void setWeight(double weight)
        {
            Weight = weight;
        }

        // Получить уникальный идентификатор материала
        public long getId()
        {
            return ID;
        }

        // Задать уникальный идентификатор материала
        public void setId(long id)
        {
            ID = id;
        }
    }
}
