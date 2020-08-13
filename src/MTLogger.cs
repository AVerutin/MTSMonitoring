using System;
using NLog;
using NLog.Targets.Wrappers;
using NLog.Config;
using NLog.Targets;

namespace MTSMonitoring
{
    public class MTLogger
    {
        public static Logger Logger;
        public static void InitNlog()
        {
            var configNLog = new LoggingConfiguration();
            var targetFile = new FileTarget();
            var targetFolder = AppDomain.CurrentDomain.BaseDirectory;

            targetFile.FileName = targetFolder + "/logs/${shortdate}.log";
            targetFile.Layout = "[${date:format=dd.MM.yyyy HH\\:mm\\:ss.fff}] [${level:uppercase=true}]: ${message}";
            targetFile.ArchiveFileName = "${basedir}/logs/archives/${shortdate}.zip";
            targetFile.ArchiveEvery = FileArchivePeriod.Day;
            targetFile.EnableArchiveFileCompression = true;
            targetFile.MaxArchiveFiles = 20;
            targetFile.ArchiveAboveSize = 104857600; //100 Mb
            AsyncTargetWrapper asyncWrapperF = new AsyncTargetWrapper
            {
                Name = "AsyncFile",
                WrappedTarget = targetFile
            };
            configNLog.AddTarget(asyncWrapperF);
            var ruleFile = new LoggingRule("*", LogLevel.Trace, targetFile);
            configNLog.LoggingRules.Add(ruleFile);

            LogManager.Configuration = configNLog;
            Logger = LogManager.GetCurrentClassLogger();
            Logger.Info("Logger started.");
        }
    }
}

