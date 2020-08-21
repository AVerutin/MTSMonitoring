using System;
using System.Collections.Generic;
using NLog;
using static MTSMonitoring.Statuses;

namespace MTSMonitoring
{
    /// <summary>
    /// Класс загрузочного бункера
    /// </summary>
    public class InputTanker
    {
        /// <summary>
        /// Уникальный идентификатор загрузочного бункера
        /// </summary>
        public int InputTankerId { get; private set; }

        /// <summary>
        /// Текущее состояние загрузочного бункера
        /// </summary>
        public Status Status { get; private set; }

        /// <summary>
        /// Наименование загруженного в бункер материала
        /// </summary>
        public string Material { get; private set; }

        /// <summary>
        /// Вес загруженного в бункер материала
        /// </summary>
        public double Weight { get; private set; }

        private List<Material> Materials;
        private readonly Logger logger;
        private int LayersCount;

        public InputTanker(int number)
        {
            if (number > 0)
            {
                logger = LogManager.GetCurrentClassLogger();
                InputTankerId = number;
                Status = Status.Off;
                Materials = new List<Material>();
                LayersCount = 0;
                Material = "";
                Weight = 0;
            }
            else
            {
                Status = Status.Error;
                logger.Error($"Неверный ID загузочного бункера: [{number}]");
                throw new ArgumentException($"Неверный ID загузочного бункера: [{number}]");
            }
        }

        /// <summary>
        /// Установить статус загрузочного бункера
        /// </summary>
        /// <param name="status">Статус загрузочного бункера</param>
        public void SetStatus(Status status)
        {
            Status = status;
        }

        /// <summary>
        /// Выбор материала загрузочного бункера
        /// </summary>
        /// <param name="material"></param>
        public void SetMaterial(string material)
        {
            if (material != "")
            {
                Material = material;
            }
            else
            {
                Status = Status.Error;
                logger.Error($"Установка пустого материала для загрузочного бункера {InputTankerId}");
                throw new ArgumentNullException("Нельзя установить пустой материал для загрузочного бункера!");
            }
        }

        /// <summary>
        /// Загрузить материал в загрузочный бункер
        /// </summary>
        /// <param name="material">Загружаемый материал</param>
        public void Load(Material material)
        {
            Status = Status.Loading;

            // Если текущий материал загрузочного бункера не выбран, то, вероятнее всего,
            // Можно брать наименование из загружаемого материала и присваивать его материалу бункера
            if (Material == "")
            {
                // logger.Error($"Не установлен материал для загрузки в загрузочный бункер {InputTankerId}");
                // throw new MissingMemberException($"Не установлен материал для загрузки в загрузочный бункер {InputTankerId}");

                logger.Warn($"Не установлен материал для загрузки в загрузочный бункер {InputTankerId}, используется загружаемый материал {material.Name}");
                Material = material.Name;
            }

            if (material != null)
            {
                if (LayersCount > 0 && material.Name != Material)
                {
                    Status = Status.Error;
                    // Если наименование загружаемого материала не соответствует наименованию ранее заруженного материала
                    logger.Error($"Попытка загрузить в загрузочный бункер {InputTankerId}, содержащий материал {Materials[LayersCount - 1].Name}, новый  материал {material.Name}");
                    throw new InvalidCastException($"Невозможно загрузить в загрузочный бункер {InputTankerId}, содержащий материал {Material}," +
                        $"новый  материал {material.Name}");
                }

                try
                {
                    Materials.Add(material);
                    LayersCount = Materials.Count;
                    Material = Materials[LayersCount - 1].Name;
                    Weight = GetWeight();
                }
                catch (Exception e)
                {
                    Status = Status.Error;
                    logger.Error($"Ошибка при добавлении материала в загрузочного бункер [{InputTankerId}] : {e.Message}");
                    throw new NotSupportedException();
                }
            }
        }

        /// <summary>
        /// Получить суммарный вес всех загруженных материалов в загрузочный бункер
        /// </summary>
        /// <returns>Суммарный вес загруженного материала</returns>
        public double GetWeight()
        {
            double Result = 0;

            if (Materials != null && LayersCount > 0)
            {
                for (int i=0; i<LayersCount; i++)
                {
                    Result += Materials[i].getWeight();
                }
            }

            return Result;
        }

        /// <summary>
        /// Выгрузить из загрузочного бункера требуемый вес материала
        /// </summary>
        /// <param name="weight">Вес выгружаемого материала</param>
        /// <returns>Список выгруженного материала из загрузочного бункера</returns>
        public List<Material> Unload(double weight)
        {
            Status = Status.Unloading;

            // Получаем количество слоев материала. Если материала нет, выдаем ошибку
            if (LayersCount == 0)
            {
                Status = Status.Error;
                logger.Error($"Загрузочный бункер {InputTankerId} не содержит материал, невозможно выгрузить {weight} тонн");
                throw new ArgumentNullException($"Загрузочный бункер {InputTankerId} не содержит материал, невозможно выгрузить {weight} тонн");
            }

            List<Material> unloaded = new List<Material>();
            if (weight > 0)
            {
                // Известен вес выгружаемого материала, начинаем выгружать

                // Пока остались слои материала и количество списываемого материала больше нуля
                while (Materials.Count > 0 && weight > 0)
                {
                    List<Material> _materials = new List<Material>();
                    Material _material = Materials[0]; // получаем первый слой материала

                    // Если вес материала в слое больше веса списываемого материала,
                    // то вес списываемого материала устанавливаем в ноль, а вес слоя уменьшаем на вес списываемого материала
                    if (_material.Weight > weight)
                    {
                        // Находим вес оставшегося материала на слое
                        _material.setWeight(_material.Weight - weight);
                        Materials[0] = _material;

                        // Добавляем в выгруженную часть слоя в список выгруженного материала
                        Material unload = new Material();
                        unload.setMaterial(_material.ID, _material.Name, _material.PartNo, weight, _material.Volume);
                        unload.setWeight(weight);
                        unloaded.Add(unload);
                        weight = 0;
                    }
                    else
                    {
                        // Если вес материала в слое меньше веса списываемого материала,
                        // то удаляем полностью слой и уменьшаем вес списываемого материала на вес, который был в слое
                        if (_material.Weight < weight)
                        {
                            weight -= _material.Weight;
                            unloaded.Add(Materials[0]);
                            for (int i = 1; i < Materials.Count; i++)
                            {
                                _materials.Add(Materials[i]);
                            }
                            Materials = _materials;
                            LayersCount--;
                        }
                        else
                        {
                            // Если вес материала в слое равен весу списываемого материала,
                            // то удаляем слой и устнавливаем вес списываемого материала равным нулю
                            if (_material.Weight == weight)
                            {
                                weight = 0;
                                unloaded.Add(Materials[0]);
                                for (int i = 1; i < Materials.Count; i++)
                                {
                                    _materials.Add(Materials[i]);
                                }
                                Materials = _materials;
                                LayersCount--;
                            }
                        }
                    }
                }

                // Если вес списываемого материала больше нуля, а количество слоев равно нулю, 
                // то выдаем сообщение, что материал уже закончился, списывать больше нечего!
                if (Materials.Count == 0 && weight > 0)
                {
                    Status = Status.Error;
                    logger.Error($"Материал в загрузочном бункере {InputTankerId} закончился. Не хватило {weight} тонн");
                    throw new IndexOutOfRangeException($"Материал в загрузочном бункере {InputTankerId} закончился. Не хватило {weight} тонн");
                }
            }
            else
            {
                Status = Status.Error;
                logger.Warn($"Не указан вес выгружаемого материала из загрузочного бункера {InputTankerId}");
                throw new ArgumentNullException($"Не указан вес выгружаемого материала из загрузочного бункера {InputTankerId}");
            }

            Weight = GetWeight();
            return unloaded;
        }

        /// <summary>
        /// Сброс загрузочного бункера в исходное состояние
        /// </summary>
        public void Reset()
        {
            Status = Status.Off;
            LayersCount = 0;
            Materials = new List<Material>();
            Material = "";
            Weight = 0;
        }
    }
}
