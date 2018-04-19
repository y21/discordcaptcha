let sql = require("sqlite");
sql.open('./src/db.sqlite');

/**
 * @param {object} message - The message object
 * @param {object} config - The config object
 */

module.exports = (message, config) => {
	message.member.removeRole(config.userrole).catch(e => console.log(e));
	message.reply("unverified!");
};
