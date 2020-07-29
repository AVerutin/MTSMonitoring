using System.Collections.Generic;
using System.Linq;

namespace MTSMonitoring
{
    public class Sensors
    {
        // Список сенсоров и их значения
        private static Dictionary<ushort, string> _sensors;

        // Конструктор класса создает пустой экземпляр списка сенсоров
        public Sensors()
        {
            _sensors = new Dictionary<ushort, string>();
        }

        // Добавить новый сенсор в список по его id
        public bool AddSensor(ushort id)
        {
            bool res = false;
            if (id != 0)
            {
                if (!_sensors.ContainsKey(id))
                {
                    _sensors.Add(id, "");
                    res = true;
                }
            }
            return res;
        }

        // Получить значение сенсора по его id.
        // Если такого сенсора нет, то возвращается пустая строка
        public string GetSensorValue(ushort id)
        {
            string res = "";
            if (_sensors.ContainsKey(id))
                res = _sensors[id];

            return res;
        }

        // Получить значение сенсора по его id
        public bool SetValue (ushort id, string value)
        {
            bool res = false;
            if (id != 0 && value != "")
            {
                if (_sensors.ContainsKey(id))
                {
                    _sensors[id] = value;
                    res = true;
                }
            }
            return res;
        }

        // Сбросить значение сенсора по его id
        public bool ResetSensor(ushort id)
        {
            bool res = false;
            if (id != 0)
            {
                if (_sensors.ContainsKey(id))
                {
                    _sensors[id] = "";
                    res = true;
                }
            }

            return res;
        }

        // Преобразование списка сенсоров и их значений в строку JSON
        public string toString()
        {
            string res = "{\"Sensors\":[";

            for (int i=0; i<_sensors.Count; ++i)
            {
                KeyValuePair<ushort, string> sensor = _sensors.ElementAt(i);
                ushort key = sensor.Key;
                string val = sensor.Value != "" ? sensor.Value : "0" ;
                val = val.Replace(',', '.');

                res += "{\"id\":" +  key + ",";
                res += "\"value\":" + val + "}";
                if (i < _sensors.Count-1)
                {
                    res += ",";
                }
            }
            res += "]}";

            return res;
        }
    }
}
