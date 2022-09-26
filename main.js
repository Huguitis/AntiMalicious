 const aoijs = require('aoi.js');
 const setting = require("./settings.js")
 const bot = new aoijs.AoiClient({
   token: setting.BotToken,
   prefix: setting.BotPrefix,
   suppressAllErrors: setting.DoNotShowErrors,
   sharding: setting.Sharding,
   shardCount: setting.ShardCount,
   intents: setting.BotIntents,
   database: {
     db: require("dbdjs.db"),
     type: "dbdjs.db",
     path: setting.DatabasePath,
     tables: setting.DatabaseName
   }
 });
require('aoi-ubfb')(bot);

// Command Handler
const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")
loader.setColors({
    walking:["blink","dim","fgWhite"],
    failedWalking:{
        name:["bright","fgYellow","underline"],
        text:["bright","fgRed"]
    },
    typeError:{
        command:["bright","fgYellow"],
        type:["fgYellow"],
        text:["bright","fgRed"]
    },
    failLoad:{
        command:["bright","fgMagenta"],
        type:["fgRed"],
        text:["bright","fgRed"],
        },
    loaded:{
           command:["bright","fgCyan"],
           type:["bright","fgBlue"],
           text:["bright","fgGreen"]
           }
});

// Callbacks
bot.onMessage();
bot.onJoin();
bot.onInteractionCreate();

// Anti Crash
process.on('unhandledRejection', (reason, p) => {
  console.log('[antiCrash] :: Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log('[antiCrash] :: Uncaught Exception/Catch');
  console.log(err, origin);
}); process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('[antiCrash] :: Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log('[antiCrash] :: Multiple Resolves');
});

// Bot Status
bot.status({
  text: setting.StatusText,
  type: setting.StatusType,
  status: "online"
});

// Variables
bot.variables({
OwnerIDs: setting.OwnerIDs,
Prefix: setting.BotPrefix,

SuccessEmoji: setting.SuccessEmoji,
ErrorEmoji: setting.ErrorEmoji,
LoadingEmoji: setting.LoadingEmoji,
InfoEmoji: setting.InfoEmoji,

TemporallyUserCommandMessageID: "",
SetLogsTemporallyChannelID: "",
MaliciousUserBan: "Deactivated",
ServerLogs: "None"
})