using System;
using System.Collections.Generic;
using static MTSMonitoring.Statuses;
using NLog;

namespace MTSMonitoring
{
    public class WeightTanker
    {
        /// <summary>
        /// Уникальный идентификатор весового бункера
        /// </summary>
        public readonly int WeightTankerId;

        /// <summary>
        /// Текущее состояние загрузочного бункера
        /// </summary>
        public Status Status { get; private set; }

        /// <summary>
        /// Вес загруженного в весовой бункер материала
        /// </summary>
        public double Weight { get; private set; }

        private List<Silos> Siloses;
        private List<Material> Materials;
        private readonly Logger logger;
        private int LayersCount;

        /// <summary>
        /// Создание нового весового бункера с уникальным номером
        /// </summary>
        /// <param name="number"></param>
        public WeightTanker(int number)
        {
            if (number <= 0)
            {
                Status = Status.Error;
                logger.Error($"Номер создаваемого весового бункера не может быть равен {number}");
                throw new ArgumentException($"Номер создаваемого весового бункера не может быть равен {number}");
            }

            logger = LogManager.GetCurrentClassLogger();
            WeightTankerId = number;
            Status = Status.Off;
            Materials = new List<Material>();
            Siloses = new List<Silos>();
            LayersCount = default;
            Weight = default;
        }

        /// <summary>
        /// Добавить силос в список, из которых весовой бункер может загружать материал
        /// </summary>
        /// <param name="silos">Добавляемый силос</param>
        public void AddSilos(Silos silos)
        {
            if (silos == null)
            {
                Status = Status.Error;
                logger.Error($"Привязываемый силос к весовому бункеру {WeightTankerId} не может быть NULL");
                throw new ArgumentNullException($"Привязываемый силос к весовому бункеру {WeightTankerId} не может быть NULL");
            }

            Siloses.Add(silos);
        }

        /// <summary>
        /// Получение совокупного веса материала, загруженного в весовой бункер
        /// </summary>
        /// <returns>Совокупный вес загруженного материала</returns>
        private double GetWeight()
        {
            double weight = 0;

            if (LayersCount == 0)
            {
                return weight;
            }

            for (int i=0; i<LayersCount; i++)
            {
                weight += Materials[i].Weight;
            }

            return weight;
        }

        /// <summary>
        /// Загрузка весового бункера из выбранного силоса
        /// </summary>
        /// <param name="silos">Силос, из которого будет загружен материал</param>
        /// <param name="weight">Вес загружаемого материала</param>
        public void Load(Silos silos, double weight)
        {
            Status = Status.Loading;
            if (Siloses.Count == 0)
            {
                Status = Status.Error;
                logger.Error($"Список силосов для весового бункера {WeightTankerId} пуст! Невозможно загрузить материал");
                throw new ArgumentException($"Список силосов для весового бункера {WeightTankerId} пуст! Невозможно загрузить материал");
            }

            bool included = false;
            for (int i=0; i<Siloses.Count; i++)
            {
                if (silos == Siloses[i])
                {
                    included = true;
                    break;
                }
            }
            if (!included)
            {
                Status = Status.Error;
                logger.Error($"Силос {silos.SilosId} не добавлен в список силосов весового бункера {WeightTankerId}. Загрузка материала невозможна");
                throw new ArgumentOutOfRangeException($"Силос {silos.SilosId} не добавлен в список силосов весового бункера {WeightTankerId}. Загрузка материала невозможна");
            }

            try
            {
                Materials = silos.Unload(weight);
                LayersCount = Materials.Count;
                Weight = GetWeight();
            }
            catch (Exception e)
            {
                Status = Status.Error;
                logger.Error(e.Message);
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Выгрузка заданного веса материала из весового бункера
        /// </summary>
        /// <param name="weight">Вес выгружаемого материала</param>
        /// <returns></returns>
        public List<Material> Unload(double newWeight)
        {
            Status = Status.Unloading;
            double unloadWeight;
            List<Material> unloaded = new List<Material>();

            // Если новый полученный вес равен нулю, то был выгружен весь материал из бункера
            if (newWeight == 0)
            {
                unloaded = Materials;
                Materials = new List<Material>();
                LayersCount = 0;
                Weight = 0;
            }
            else
            {
                //TODO: Необходимо установить значение веса материала в весовом бункере (Weight) в фактическое значение

                unloadWeight = Weight - newWeight;

                // Получаем количество слоев материала. Если материала нет, выдаем ошибку
                if (LayersCount == 0)
                {
                    Status = Status.Error;
                    logger.Error($"Силос {WeightTankerId} не содержит материал, невозможно выгрузить {unloadWeight} тонн");
                    throw new ArgumentOutOfRangeException($"Силос {WeightTankerId} не содержит материал, невозможно выгрузить {unloadWeight} тонн");
                }

                if (unloadWeight > 0)
                {
                    // Известен вес выгружаемого материала, начинаем выгружать

                    // Пока остались слои материала и количество списываемого материала больше нуля
                    while (Materials.Count > 0 && unloadWeight > 0)
                    {
                        List<Material> _materials = new List<Material>();
                        Material _material = Materials[0]; // получаем первый слой материала

                        // Если вес материала в слое больше веса списываемого материала,
                        // то вес списываемого материала устанавливаем в ноль, а вес слоя уменьшаем на вес списываемого материала
                        if (_material.Weight > unloadWeight)
                        {
                            // Находим вес оставшегося материала на слое
                            _material.setWeight(_material.Weight - unloadWeight);
                            Materials[0] = _material;

                            // Добавляем в выгруженную часть слоя в список выгруженного материала
                            Material unload = new Material();
                            unload.setMaterial(_material.ID, _material.Name, _material.PartNo, unloadWeight, _material.Volume);
                            unload.setWeight(unloadWeight);
                            unloaded.Add(unload);
                            unloadWeight = 0;
                        }
                        else
                        {
                            // Если вес материала в слое меньше веса списываемого материала,
                            // то удаляем полностью слой и уменьшаем вес списываемого материала на вес, который был в слое
                            if (_material.Weight < unloadWeight)
                            {
                                unloadWeight -= _material.Weight;
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
                                if (_material.Weight == unloadWeight)
                                {
                                    unloadWeight = 0;
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
                    if (Materials.Count == 0 && unloadWeight > 0)
                    {
                        Status = Status.Error;
                        logger.Error($"Материал в силосе {WeightTankerId} закончился. Не хватило {unloadWeight} тонн");
                        throw new ArgumentOutOfRangeException($"Материал в силосе {WeightTankerId} закончился. Не хватило {unloadWeight} тонн");
                    }
                }
                else
                {
                    Status = Status.Error;
                    logger.Warn($"Не указан вес выгружаемого материала из силоса {WeightTankerId}");
                    throw new ArgumentNullException($"Не указан вес выгружаемого материала из силоса {WeightTankerId}");
                }

                Weight = GetWeight();
                return unloaded;
            }

            return unloaded;
        }
    }
}
