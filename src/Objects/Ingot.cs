using System;
using NLog;

namespace MTSMonitoring
{
    public class Ingot
    {
        private readonly Materials Layers;           // Использовано вместо Materials
        private readonly Parameters Parameters;      // Список параметров единицы учета
        private readonly Logger logger;
        // При необходимости добавления новых параметров, следует добавить их в класс Parameters
        // И реализовать методы для их добавления/получения/удаления

        public double InputWeight { get; set; }
        public double OutputWeight { get; set; }

        public Ingot()
        {
            Layers = new Materials();
            Parameters = new Parameters();
        }

        public Ingot(ulong uid)
        {
            logger = LogManager.GetCurrentClassLogger();
            Layers = new Materials();
            Parameters = new Parameters(uid);
        }

        public Ingot(ulong uid, uint plavno)
        {
            logger = LogManager.GetCurrentClassLogger();
            Layers = new Materials();
            Parameters = new Parameters(uid, plavno);
        }

        /// <summary>
        /// Добавить новый материал
        /// </summary>
        /// <param name="material">Материал, добавляемый в химический состав единицы учета</param>
        public void PushMaterial(Material material)
        {
            if (material != null)
            {
                Layers.Push(material);
            }
            else
            {
                logger.Error("Методу Ingot.PushMaterial() передан null вместо экземпляра класса Material");
                throw new ArgumentNullException("Требуется действительный экземпляр класса Material!");
            }
        }

        private void RemoveMaterial()
        {
            if (Layers.Count == 0)
            {
                logger.Error("Метод Ingot.RemoveMaterial() вызван для пустого списка материалов");
                throw new IndexOutOfRangeException("Номер материала превышает количество слоев!");
            }

            Layers.Pop();
        }

        /// <summary>
        /// Извлечение самого нижнего слоя материала с удалением его из списка материалов единицы учета
        /// </summary>
        /// <returns></returns>
        public Material PopMaterial()
        {
            Material Result = null;

            if (Layers.Count > 0)
            {
                Result = Layers.Pop();
                // RemoveMaterial();
            }

            return Result;
        }

        public Material GetMaterial(int number)
        {
            Material Result = null;
            if (number > Layers.Count)
            {
                logger.Error("Методу GetMaterial() передан номер слоя, отсутствующий в списке слоев материала");
                throw new IndexOutOfRangeException("Номер материала превышает количество слоев!");
            }

            return Result;
        }

        public void Test()
        {
            Material mat1 = new Material();
            Material mat2 = new Material(2, "FeSiMn", 25, 3.5);
            mat1.setMaterial(1, "FeSiMn", 17, 1.5);

            int cnt = Layers.Count;
            Layers.Push(mat1);
            Layers.Push(mat2);

            for (int i=0; i<Layers.Count; i++)
            {
                Material mat = Layers.GetMaterial(i);
            }

            Material mats = Layers.Pop();
            Layers.Empty();
        }
    }
}
