using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace MTSMonitoring
{
    public class Config
    {
        private static string filePath;
        private static Dictionary<string, ushort> pars;

        public Config()
        {
            filePath = System.IO.Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName) + @".\config.txt";
            pars = new Dictionary<string, ushort>();
            try
            {
                using (StreamReader sr = new StreamReader(filePath, System.Text.Encoding.Default))
                {
                    string line;
                    ushort key;
                    while ((line = sr.ReadLine()) != null)
                    {
                        string[] par = line.Split(':');
                        try
                        {
                            key = ushort.Parse(par[1]);
                        }
                        catch
                        {
                            key = 0;
                        }
                        pars.Add(par[0], key);
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

        public Dictionary<string, ushort> GetConfigList()
        {
            return pars;
        }
    }
}
