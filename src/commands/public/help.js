module.exports = [{
name: "help",
aliases: ["commands", "config", "info"],
code: `
$sendMessage[{
"embeds": "{newEmbed:{footer:Developed by Huguitis:$userAvatar[$clientID]}{description:**__Public Commands:__**\\n- \`$getVar[Prefix]help\` This command.\\n- \`$getVar[Prefix]setlogs\` Set the logs channel.\\n- \`$getVar[Prefix]setmaliciousban\` Enables/Disables the ban malicious system.\\n- \`$getVar[Prefix]user\` Gets info of an user.\\n\\n**__Private Commands:__**\\n- \`$getVar[Prefix]eval\` Evaluates a code.\\n\\n> [Invite Me](https://discord.com/oauth2/authorize?client_id=$clientID&scope=bot+applications.commands&permissions=8)\\n> [Support Server](https://discord.gg/CVbPZRt9yG)\\n> [GitHub Repository](https://github.com/Huguitis/AntiMalicious)\\n> [UBFB](https://www.npmjs.com/package/ubfb)}{color:YELLOW}}",
"components": "{actionRow:{button:Commands:success:Help1_$authorID:yes}{button:Server Config:primary:Help2_$authorID:no}}"};no]
`
}, {
type: "interaction",
prototype: "button",
code:`
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis:$userAvatar[$clientID]}{description:
**__Public Commands:__**
- \`$getVar[Prefix]help\` This command.
- \`$getVar[Prefix]setlogs\` Set the logs channel.
- \`$getVar[Prefix]setmaliciousban\` Enables/Disables the ban malicious system.
- \`$getVar[Prefix]user\` Gets info of an user.

**__Private Commands:__**
- \`$getVar[Prefix]eval\` Evaluates a code.

> [Invite Me](https://discord.com/oauth2/authorize?client_id=$clientID&scope=bot+applications.commands&permissions=8)
> [Support Server](https://discord.gg/CVbPZRt9yG)
> [GitHub Repository](https://github.com/Huguitis/AntiMalicious)
> [UBFB](https://www.npmjs.com/package/ubfb)}{color:YELLOW}};

{actionRow:{button:Commands:success:Help1_$authorID:yes}{button:Server Config:primary:Help2_$authorID:no}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button, you are not the author of this one!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Help1;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis:$userAvatar[$clientID]}{description:
**__$serverName's config:__**
- __Server Logs:__ $if[$getServerVar[ServerLogs]==None;None.;<#$getServerVar[ServerLogs]>]
- __Ban Malicious Users:__ $getServerVar[MaliciousUserBan]

> [Invite Me](https://discord.com/oauth2/authorize?client_id=$clientID&scope=bot+applications.commands&permissions=8)
> [Support Server](https://discord.gg/CVbPZRt9yG)
> [GitHub Repository](https://github.com/Huguitis/AntiMalicious)
> [UBFB](https://www.npmjs.com/package/ubfb)}{color:YELLOW}};

{actionRow:{button:Commands:success:Help1_$authorID:no}{button:Server Config:primary:Help2_$authorID:yes}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button, you are not the author of this one!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Help2;]
`
}]