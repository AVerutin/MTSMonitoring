namespace MTSMonitoring
{
    /// <summary>
    /// Класс для описания слоев материала
    /// </summary>
    public class Materials
    {
        // Слои материала
        private Material[] layers; 

        // Количество слоев материалов
        public int Count;

        /// <summary>
        /// Конструктор по умолчанию
        /// </summary>
        public Materials()
        {
            layers = new Material[8];
            Count = 0;
        }

        /// <summary>
        /// Добавить слой материала
        /// </summary>
        /// <param name="material">Экземпляр класса Material</param>
        /// <returns>TRUE - если слой материала добавлен, FALSE - если свободных слоев больше нет</returns>
        public bool addMaterial(Material material)
        {
            bool result = false;

            if (Count >= 8)
                return result;

            layers[Count++] = material;

            result = true;
            return result;
        }

        /// <summary>
        /// Получить слой материала по его номеру
        /// </summary>
        /// <param name="number">Номер слоя материала</param>
        /// <returns>Экземпляр класса Material</returns>
        public Material getMaterial(int number)
        {
            Material result;

            if (number <= Count)
            {
                result = layers[number];
            }
            else
            {
                result = null;
            }

            return result;
        }

        /// <summary>
        /// Удаление самого нижнего слоя материала со сдвигом слоев вниз
        /// </summary>
        /// <param name="number">Номер слоя материала</param>
        /// <returns>TRUE - если слой материала удален, FALSE - если слоя с таким номером нет</returns>
        public Materials removeMaterial()
        {
            Materials result = new Materials();
            
            if (Count == 1)
            {
                return null;
            }
            else
            {
                Material[] tmp = new Material[8];
                for (int i=1; i<Count; i++)
                {
                    result.addMaterial(layers[i]);
                }                
            }

            return result;
        }

        /// <summary>
        /// Удалить все слои материала
        /// </summary>
        public void empty()
        {
            for (int i=0; i<Count; i++)
            {
                layers[i] = null;
            }

            Count = 0;
        }
    }
}
