module.exports = [{
name: "setlogs",
code: `
$setGlobalUserVar[SetLogsTemporallyChannelID;$findServerChannel[$message;yes]]
$sendMessage[{"embeds": "{newEmbed:{description:$getVar[InfoEmoji] **__Logs Channel:__**\\n**The logs channel is a channel where I will send all the actions or events executed on the server, such as when a user sends a malicious link. (It is obligatory to activate this system, in addition, it is recommended that the channel be private)**\\n\\n> **Do you want to enable the logs channel to <#$findServerChannel[$message;yes]>?**}{color:YELLOW}}","components": "{actionRow:{button:Yes:success:LogsSetYes_$authorID:no}{button:No:danger:LogsSetNo_$authorID:no}}"};no]

$onlyIf[$hasAnyPerm[$guildID;$authorID;managemessages;manageserver;admin]!=false;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You need to have permission "Manage Messages" or "Manage Server" to execute this command.**}}]
`
}, {
type: "interaction",
prototype: "button",
code:`
$setServerVar[ServerLogs;$getGlobalUserVar[SetLogsTemporallyChannelID]]

$interactionUpdate[;{newEmbed:{description:$getVar[SuccessEmoji] **I have updated the logs channel to <#$getGlobalUserVar[SetLogsTemporallyChannelID]>!**}{color:GREEN}}]

$onlyif[$getServerVar[ServerLogs]!=$getGlobalUserVar[SetLogsTemporallyChannelID];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **I already send logs to that channel!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==LogsSetYes;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{description:$getVar[SuccessEmoji] **Okay.**}{color:GREEN}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==LogsSetNo;]
`
}]