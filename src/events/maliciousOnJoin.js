module.exports = [{
channel: "$getServerVar[ServerLogs]",
type: "join",
code: `
$if[$getServerVar[MaliciousUserBan]!=Deactivated;{execute:MaliciousUserBanOn};{execute:MaliciousUserBanOff}]

$onlyIf[$serverChannelExists[$getServerVar[ServerLogs]]!=false;]
$onlyIf[$ubfb#getBoolean[$authorID]!=;]
$onlyIf[$getServerVar[ServerLogs]!=None;]
`
},{
type: "awaited",
name: "MaliciousUserBanOn",
code: `
$ban[$guildID;$authorID;;$ubfb#getReason[$authorID] ($ubfb#getProof[$authorID])]
$wait[0.3s]
$color[1;YELLOW]
$description[1;$getVar[InfoEmoji] **A malicious user has tried to join the server! I have banned it.**]
$image[1;$ubfb#getProof[$authorID]]
$addfield[1;Creation Date;\`\`\`$creationDate[$authorID;date]\`\`\`;yes]
$addfield[1;Malicious User;\`\`\`
$ubfb#getBoolean[$authorID]
Reason: $ubfb#getReason[$authorID]
\`\`\`;no]
$addfield[1;Discord ID;\`\`\`$authorID\`\`\`;yes]
$addfield[1;Discord Tag;\`\`\`$userTag[$authorID]\`\`\`;yes]
`
},{
type: "awaited",
name: "MaliciousUserBanOff",
code: `
$apiMessage[$getServerVar[ServerLogs];;{newEmbed:
{field:Discord Tag:\`\`\`$userTag[$authorID]\`\`\`:yes}
{field:Discord ID:\`\`\`$authorID\`\`\`:yes}
{field:Malicious User:\`\`\`
$ubfb#getBoolean[$authorID]
Reason: $ubfb#getReason[$authorID]
\`\`\`:no}
{field:Creation Date:\`\`\`$creationDate[$authorID;date]\`\`\`:yes}
{description:$getVar[InfoEmoji] **A malicious user joined to the server! Be careful.**}
{color:YELLOW}
{image:$ubfb#getProof[$authorID]}};
{actionRow:{button:Ban User:4:BanUserMalicious_$authorID:no}
{button:Kick User:4:KickUserMalicious_$authorID:no}}]
`
},{
type: "interaction",
prototype: "button",
code: `
$ban[$guildID;$advancedTextSplit[$interactionData[customId];_;2];;$ubfb#getReason[$authorID] ($ubfb#getProof[$authorID])]
 
$interactionUpdate[;{newEmbed:
{image:$ubfb#getProof[$advancedTextSplit[$interactionData[customId];_;2]]}
{description:$getVar[InfoEmoji] **A malicious user joined to the server! Banned by <@$authorID>**}
{color:YELLOW}
{field:Creation Date:\`\`\`$creationDate[$advancedTextSplit[$interactionData[customId];_;2];date]\`\`\`:yes}
{field:Malicious User:\`\`\`
$ubfb#getBoolean[$advancedTextSplit[$interactionData[customId];_;2]]
Reason: $ubfb#getReason[$advancedTextSplit[$interactionData[customId];_;2]]
\`\`\`:no}
{field:Discord ID:\`\`\`$advancedTextSplit[$interactionData[customId];_;2]\`\`\`:yes}
{field:Discord Tag:\`\`\`$userTag[$advancedTextSplit[$interactionData[customId];_;2]]\`\`\`:yes}}]

$onlyif[$isBanned[$advancedTextSplit[$interactionData[customId];_;2]]!=true;{"embeds":"{newEmbed:{description:$getVar[ErrorEmoji] **That user is already banned on this guild!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]

$onlyif[$hasAnyPerm[$guildid;$clientID;ban;admin]!=false;{"embeds": "{newEmbed:{description:$getVar[ErrorEmoji] **I do not have the permission 'Ban'!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]

$onlyif[$hasAnyPerm[$guildid;$authorID;ban;admin]!=false;{"embeds": "{newEmbed:{description:$getVar[ErrorEmoji] **You need the permission 'Ban' to execute this action!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]
 
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==BanUserMalicious;]
`
},{
type: "interaction",
prototype: "button",
code: `
$kick[$advancedTextSplit[$interactionData[customId];_;2];$guildID;$ubfb#getReason[$advancedTextSplit[$interactionData[customId];_;2]] ($ubfb#getProof[$advancedTextSplit[$interactionData[customId];_;2]])]
 
$interactionUpdate[;{newEmbed:
{image:$ubfb#getProof[$advancedTextSplit[$interactionData[customId];_;2]]}
{description:$getVar[InfoEmoji] **A malicious user joined to the server! Kicked by <@$authorID>**}
{color:YELLOW}
{field:Creation Date:\`\`\`$creationDate[$advancedTextSplit[$interactionData[customId];_;2];date]\`\`\`:yes}
{field:Malicious User:\`\`\`
$ubfb#getBoolean[$advancedTextSplit[$interactionData[customId];_;2]]
Reason: $ubfb#getReason[$advancedTextSplit[$interactionData[customId];_;2]]
\`\`\`:no}
{field:Discord ID:\`\`\`$advancedTextSplit[$interactionData[customId];_;2]\`\`\`:yes}
{field:Discord Tag:\`\`\`$userTag[$advancedTextSplit[$interactionData[customId];_;2]]\`\`\`:yes}}]

$onlyif[$memberExists[$advancedTextSplit[$interactionData[customId];_;2]]!=false;{"embeds": "{newEmbed:{description:$getVar[ErrorEmoji] **That user is not on the guild!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]

$onlyif[$hasAnyPerm[$guildid;$clientID;kick;admin]!=false;{"embeds": "{newEmbed:{description:$getVar[ErrorEmoji] **I do not have the permission 'Kick'!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]

$onlyif[$hasAnyPerm[$guildid;$authorID;kick;admin]!=false;{"embeds": "{newEmbed:{description:$getVar[ErrorEmoji] **You need the permission 'Kick' to execute this action!**}{color:RED}}","ephemeral": true,"options": {"interaction" : true}}]
 
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==KickUserMalicious;]
`
}]