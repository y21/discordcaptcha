const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

// Config
var queue = [];
var filter = [];
var kicked = [];




// Do not modify
client.on("ready", () => {
    client.user.setGame(config.streamingGame, config.streamingLink);
});
client.on('message', (message) => {
    var time = new Date();
    var author = message.author.id;
    if (message.author.id != config.clientID) {
        if (message.content == config.prefix + "receive" || message.content == config.prefix + "verify") {
            if (message.channel.name == "verify") {
                var captcha = String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4);
                message.author.send(new Discord.RichEmbed().setTitle("Verification").setDescription("This Server is using the verification bot DiscordCaptcha, Please verify yourself as a human by pasting in the following code into the channel #verify from `" + message.guild.name + "`").setColor(0x9575CD).addField("Contact", "The Bot was made by **y21#0909**. Feel free to contact me if you found a bug or open a pull request."));
                message.author.send("```JavaScript\n" + config.prefix + "verify " + captcha + "\n```");
                var author = message.author.id;
                queue.push(author + "x" + captcha);
            }
        } else if (message.channel.name == "verify" && message.content.includes(config.prefix + "verify")) {
            var input = message.content.substr(8);
            for (i = 0; i < queue.length; i++) {
                var cpoint = queue[i].indexOf("x");
            }
            cpoint++;
            for (i = 0; i < queue.length; i++) {
                var oldcaptcha = queue[i].substr(cpoint);
            }
            if (input == oldcaptcha) {
                message.member.addRole(config.userrole).catch(error => console.log(error));
            } else {
                if (message.content != config.prefix + "verify") {
                    message.author.send("You were kicked from " + message.guild.name + " (WRONG_CAPTCHA)");
                    message.member.kick();
                }
            }
        }
    }
    if (message.content.startsWith(config.prefix + "ban") && message.member.hasPermission("BAN_MEMBERS")) {
        message.guild.member(message.mentions.users.first()).kick();
    }
    for (i = 0; i < config.blockedAccountIDs.length; i++) {
        if (message.author.id == config.blockedAccountIDs[i]) {
            message.delete();
            message.author.send("You were kicked from " + message.guild.name + " (BLOCKED)");
            message.member.kick();
        }
    }
    if (message.content.startsWith(config.prefix + "block")) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            config.blockedAccountIDs.push(message.content.substr(7));
            message.channel.send("Added `" + message.content.substr(7) + "` to the blocked list.");
            fs.writeFileSync("./config.json", JSON.stringify(config), (err) => {
                console.log(err)
            });
        } else {
            return message.channel.send("Missing Permissions");
        }
    }
    if (message.content.startsWith(config.prefix + "pop")) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            config.blockedAccountIDs.pop();
            message.channel.send(`Removed last blocked user.`);
            fs.writeFileSync("./config.json", JSON.stringify(config), (err) => {
                console.log(err)
            });
        } else {
            return message.channel.send("Missing Permissions");
        }
    }
    if (message.content.startsWith(config.prefix + "clear")) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.bulkDelete(message.content.substr(7));
        } else {
            return message.channel.send("Missing Permissions");
        }
    }
    if (message.channel.name == "verify") {
        message.delete();
    }
});
client.login(config.token);