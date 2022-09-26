module.exports = [{
name: "user",
aliases: ["userinfo", "profile"],
code: `
$if[$ubfb#getBoolean[$findUser[$message]]!=true;{execute:NoMaliciousUser};{execute:MaliciousUser}]

$setGlobalUserVar[TemporallyUserCommandMessageID;$get[id]]
$wait[1s]
$let[id;$sendMessage[{
"embeds" : "{newEmbed:{description:$getVar[LoadingEmoji] **Getting info...**}{color:YELLOW}}"
};yes]]
`
}, {
name: "MaliciousUser",
type: "awaited",
code: `
$editMessage[$getGlobalUserVar[TemporallyUserCommandMessageID];{newEmbed:{field:Discord Tag:\`\`\`$userTag[$findUser[$message]]\`\`\`:yes}
{field:Discord ID:\`\`\`$findUser[$message]\`\`\`:yes}
{field:Malicious User:\`\`\`
$ubfb#getBoolean[$findUser[$message]]
Reason: $ubfb#getReason[$findUser[$message]]
\`\`\`:no}
{field:Creation Date:\`\`\`$creationDate[$findUser[$message];date]\`\`\`:yes}
{color:RED}
{image:$ubfb#getProof[$findUser[$message]]}
{thumbnail:$userAvatar[$findUser[$message]]}}]
`
}, {
name: "NoMaliciousUser",
type: "awaited",
code: `
$editMessage[$getGlobalUserVar[TemporallyUserCommandMessageID];{newEmbed:{field:Discord Tag:\`\`\`$userTag[$findUser[$message]]\`\`\`:yes}
{field:Discord ID:\`\`\`$findUser[$message]\`\`\`:yes}
{field:Malicious User:\`\`\`
$if[$ubfb#getBoolean[$findUser[$message]]==;false;]
\`\`\`:no}
{field:Creation Date:\`\`\`$creationDate[$findUser[$message];date]\`\`\`:yes}
{color:GREEN}
{thumbnail:$userAvatar[$findUser[$message]]}}]
`
}]