﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text;

namespace MTSMonitoring
{
    public class ConfigMill
    {
        private static string _cfgFileName;
        private static List<ushort> _signals;
        

        public ConfigMill()
        {
            _cfgFileName = @"c:\mts\Config\RollingMillConfig.txt";
            _signals = new List<ushort>();
        }

        public List<ushort> GetSignals()
        {
            using (StreamReader sr = new StreamReader(_cfgFileName, System.Text.Encoding.Default))
            {

                /// <summary>
                /// if (objectStart == true && objectSignal == true) => ищем параметр "Идентификатор=4005"
                /// </summary>
                string line;
                bool objectSignal = false;
                string objectName = "";
                ushort signalNumber = 0;

                while ((line = sr.ReadLine()) != null)
                {

                    // Обработка строк файла
                    if (line == "")
                        continue;
                    if (line.StartsWith("//")) // Комментарий
                        continue;
                    if (line == "(") // Начало блока описания объекта
                        continue;
                    if (line == ")") // Начало блока описания объекта
                        continue;

                    if (line.Contains("="))
                    {
                        string[] par = line.Split("=");
                        if (par[0] == "Идентификатор" && objectSignal)
                        {
                            try
                            {
                                signalNumber = ushort.Parse(par[1]);
                                _signals.Add(signalNumber);
                            }
                            catch
                            {
                                throw new ArgumentNullException();
                            }
                        }
                    }
                    else
                    {
                        objectName = line.Trim();
                        if (objectName == "Сигнал")
                        {
                            objectSignal = true;
                        }
                        else
                        {
                            objectSignal = false;
                        }
                    }
                }
            }

            return _signals;
        }
    }
}
