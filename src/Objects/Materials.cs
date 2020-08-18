using NLog;
using System;
using System.Collections.Generic;

namespace MTSMonitoring
{
    /// <summary>
    /// Класс для описания слоев материала
    /// </summary>
    public class Materials
    {
        // Слои материала
        private List<Material> layers;
        private readonly Logger logger;

        // Количество слоев материалов
        public int Count { get; private set; }

        /// <summary>
        /// Конструктор по умолчанию
        /// </summary>
        public Materials()
        {
            layers = new List<Material>();
            Count = layers.Count;
            logger = LogManager.GetCurrentClassLogger();
        }

        /// <summary>
        /// Добавить слой материала
        /// </summary>
        /// <param name="material">Экземпляр класса Material</param>
        public void Push(Material material)
        {
            if (material == null)
            {
                logger.Error("Методу Materials.Push() передан null в качестве параметра");
                throw new ArgumentNullException("Требуется действительный экземпляр класса Material!");
            }
            layers.Add(material);
            Count = layers.Count;
        }

        /// <summary>
        /// Получить слой материала по его номеру
        /// </summary>
        /// <param name="number">Номер слоя материала</param>
        /// <returns>Материал по его номеру слоя</returns>
        public Material GetMaterial(int number)
        {
            if (number > Count)
            {
                logger.Error("Методу Materials.GetMaterial() передан номер слоя, отсутствующий в списке слоев материалов");
                throw new IndexOutOfRangeException("Номер материала превышает количество слоев материала!");
            }

            Material result = layers[number];
            return result;
        }

        /// <summary>
        /// Удаление нижнего слоя материала со сдвигом остальных слоев вниз
        /// </summary>
        /// <returns>Удаленный материал</returns>
        public Material Pop()
        {
            if (Count == 0)
            {
                logger.Error("Метод Materials.Pop() вызван для пустого списка материалов");
                throw new NullReferenceException("Список слоев материала пуст!");
            }

            Material Result; 
            List<Material> _layers = new List<Material>(); // Новые слои материала с удаленным нижним слоем
            
            for (int i=1; i<layers.Count; i++)
            {
                _layers.Add(layers[i]);
            }

            Result = layers[0];
            layers = _layers;
            Count = layers.Count;

            return Result;
        }

        /// <summary>
        /// Удалить все слои материала
        /// </summary>
        public void Empty()
        {
            for (int i=0; i<Count; i++)
            {
                layers[i] = null;
            }

            Count = 0;
        }
    }
}
