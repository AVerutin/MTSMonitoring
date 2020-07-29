using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace MTSMonitoring
{
    public class Config
    {
        private static string filePath;
        private static Dictionary<string, string> pars;

        public Config()
        {
            filePath = @"c:\mts\Config\config.txt";
            pars = new Dictionary<string, string>();
            try
            {
                using (StreamReader sr = new StreamReader(filePath, System.Text.Encoding.Default))
                {
                    string line;
                    while ((line = sr.ReadLine()) != null)
                    {
                        string[] par = line.Split('=');
                        pars.Add(par[0], par[1]);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Не удалось открыть файл параметров");
                Console.ReadKey(true);
                throw ex;
            }
        }

        public Dictionary<string, string> GetConfigList()
        {
            return pars;
        }
    }
}
