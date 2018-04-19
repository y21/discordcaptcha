const config = require("../config.json");
/**
 * 
 * @param {object} message - The message object
 */
module.exports = (message) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you are missing the `ADMINISTRATOR` permission');
    if(message.guild.roles.get(config.userrole)){
        message.reply("There's already a role for verifications. React with 🇾 if you want me to create one or with 🇳 to cancel.")
        .then(m => {m.react("🇾"); m.react("🇳"); m.awaitReactions(
        mes=>(mes.emoji.name === "🇾" && mes.users.filter(u=>u.id===message.author.id)).size == 1 ? (()=>{ message.guild.createRole({name:"Users",permissions:["SEND_MESSAGES"]}); message.reply("`Users` role created!"); })() : null
        )});
    } else {
        message.guild.createRole({name:"Users",permissions:["SEND_MESSAGES"]});
        message.reply("`Users` role created!");
    }
}
