module.exports = [{
name: "setmaliciousban",
code: `
$sendMessage[{
"embeds": "{newEmbed:{description:$getVar[InfoEmoji] **__Ban Malicious:__**\\n**It will ban all malicious users that we have in the ubfb database that tries to join the server.**\\n**If this is disabled, the bot will send a warning to the log channel that a malicious user has joined, but it will not ban him.**\\n\\n> **Ban Malicious current status: __$getServerVar[MaliciousUserBan]__.**}{color:YELLOW}}",
"components": "{actionRow:{button:Enable:success:ActivateBan_$authorID:no}{button:Disable:danger:DesactivateBan_$authorID:no}}"};no]

$onlyIf[$serverChannelExists[$getServerVar[ServerLogs]]!=false;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **The logs channel has been deleted or I don't have access to it. Please reconfigure it with __$getVar[Prefix]setlogs__**}}]

$onlyIf[$getServerVar[ServerLogs]!=None;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You need to setup the logs channel first, use the __$getServerVar[Prefix]setlogs__ command to do it.**}}]

$onlyIf[$hasAnyPerm[$guildID;$clientID;ban;admin]!=false;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **I need to have the "Ban" permission to be able to ban malicious users.**}}]

$onlyIf[$hasAnyPerm[$guildID;$authorID;ban;manageserver;admin]!=false;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You need to have the "Ban" or "Manage Server" permission to execute this command.**}}]
`
}, {
type: "interaction",
prototype: "button",
code:`
$setServerVar[MaliciousUserBan;Activated]

$interactionUpdate[;{newEmbed:{description:$getVar[SuccessEmoji] **I have activated the system, now I will ban malicious users who try to join the server!**}{color:GREEN}}]

$onlyif[$getServerVar[MaliciousUserBan]!=Activated;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **The malicious user ban system is already enabled!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ActivateBan;]
`
}, {
 type: "interaction",
 prototype: "button",
 code: `
$setServerVar[MaliciousUserBan;Deactivated]

$interactionUpdate[;{newEmbed:{description:$getVar[ErrorEmoji] **I have deactivated the system, now I won't ban malicious users!**}{color:RED}}]

$onlyif[$getServerVar[MaliciousUserBan]!=Deactivated;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **The malicious user ban system is already disabled!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DesactivateBan;]
`
}]