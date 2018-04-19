let sql = require("sqlite");
sql.open('./src/db.sqlite');

/**
 * @param {Object} message - The message object
 * @param {array} contrib - Users that are allowed to use that command
**/
module.exports = async (message, contrib) => {
    try {
        if (contrib.includes(message.author.tag)) {
            if (message.mentions.users.size === 0) {
                if (!await sql.get('select * from blocked where id="' + message.content.split(" ")[1] + '"')) {
                    sql.run('insert into blocked values ("' + message.content.split(" ")[1] + '")');
                    message.channel.send("Added `" + message.content.split(" ")[1] + "` to the blocked list.");
                } else {
                    message.channel.send("ID is already blocked.");
                }
            }
        } else {
            return message.channel.send("Missing Permissions");
        }
    } catch (e) {
        console.log("[DISCORDCAPTCHA-block] >> " + e);
    }
}
