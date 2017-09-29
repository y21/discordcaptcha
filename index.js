const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require("./src/config.json");
const clientID = config.clientid;
const prefix = config.prefix;
var blockedAccountIDs = [
	"ID1",
	"ID2"
];
// Configuration File: src/config.json



// DON'T Manipulate the next lines. I've warned you.
// ----
var waitingQueue = [];
var queue = [];
var kicked = [];
client.on("guildMemberAdd", (member) => {
	member.user.send({embed: {
		color: 0xffff00,
		description: "To verify yourself as a human, write `" + prefix + "receive` in the guild to receive your captcha"
	}});
});


client.on("ready", () => {
	console.log("Logged in!")
	client.user.setGame(config.streamingGame, config.streamingLink);
});

client.on('message', (message) => {
var time = new Date();
var content = message.content;
var author = message.author.id;
if(message.author.id != clientID){
	if(message.content === prefix + "receive" || message.content === prefix + "verify" || message.content === prefix + "captcha"){
		if(message.channel.name === "verify"){
			if(message.member.roles.has(userRoleID)){
				message.author.send({embed: {
					color: 0xff0000,
					description: "Already verified on `" + message.guild.name + "`"
				}});
			}else{
				var captcha = Math.floor(Math.random() * 9000) + 1001;
				var floor = Math.floor(Math.random() * 10000) + 1;
				let webshot = require("webshot"); 
				var fontFace, fontSize, fontPosition;
				if(floor < 5000){
					fontFace = "Comic Sans MS";
				}else if(floor >= 5000){
					fontFace = "Arial";
				}
				var colors = [
					"red",
					"green",
					"blue",
					"magenta",
					"brown",
					"darkcyan",
					"gold"
				]
				var floorx = Math.floor(Math.random() * 10000) + 1;
				fontSize = Math.floor(Math.random() * 20) + 35;
				var height = Math.floor(Math.random() * 20) + 10 + "%";
				var width = Math.floor(Math.random() * 20) + 10 + "%";
				var fontColor = colors[Math.floor(Math.random() * 4) + 1];
				var bgColor = colors[Math.floor(Math.random() * 4) + 1];
				var rotate = Math.floor(Math.random() * 70) + 11;
				var letterSpacing = Math.floor(Math.random() * 30) + 10;
				var boxWidth = Math.floor(Math.random() * 30) + 30;
				var boxHeight = Math.floor(Math.random() * 30) + 30;
				var boxColor = colors[Math.floor(Math.random() * 4) + 1];
				var boxBorderSize = Math.floor(Math.random() * 7) + 1 + "px";
				var boxMarginTop = Math.floor(Math.random() * 70) + 10 + "%";
				var boxMarginLeft = Math.floor(Math.random() * 70) + 10 + "%";
				if(Math.random() > Math.random()){
					var rbackup = rotate;
					rotate -= rbackup;
					rotate -= rbackup;
				}
				if(bgColor === fontColor){
					fontColor = colors[Math.floor(Math.random() * 4) + 1];
				}
				webshot('<html><body style=\'background-image: url("http://b.reich.io/jjvoab.png");\'><h1 style="font-family:' + fontFace + '; color:' + fontColor + '; font-size:' + fontSize + 'px; position: absolute; top:' + height + ';left:' + width + '; -moz-transform: rotate(' + rotate + 'deg); -ms-transform: rotate(' + rotate + 'deg);-o-transform: rotate(' + rotate + 'deg);-webkit-transform: rotate(' + rotate + 'deg);letter-spacing: ' + letterSpacing + 'px;"><i><del>' + captcha + '</del></i></h1></body></html>', './captchas/' + floor + '.png', {siteType:'html',screenSize:{width:500, height:500}}, function(err) {message.author.send("",{files:['./captchas/' + floor + ".png"]}) });
				setTimeout(function(){fs.unlinkSync("./captchas/" + floor + ".png");}, 30000);
				message.author.send({embed: {
					color: 0x0000ff,
					description: "Write `!verify` <code> in the guild to write in all channel. \n\n**Verification Bot made by y21#0909**"
				}});
				message.delete();
				var author = message.author.id;
				queue.push(author + "x" + captcha);
				waitingQueue.push(message.author.id);
				console.log(queue);
			}
		}
    }
    else if(message.channel.name === "verify" && message.content.includes(prefix + "verify")){
        var input = message.content.substr(8);
        for(i=0;i<queue.length;i++){
            var cpoint = queue[i].indexOf("x");
        }
        cpoint++;
        for(i=0;i<queue.length;i++){
            var oldcaptcha = queue[i].substr(cpoint);
		}
		if(input === oldcaptcha){
            if(message.member.roles.has(userRoleID)){
				message.author.send({embed: {
					color: 0xff0000,
					description: "Already verified on `" + message.guild.name + "`"
				}});
			}else{
				message.author.send({embed: {
					color: 0x00ff00,
					description: "Successfully verified on `" + message.guild.name + "`"
				}});
				client.channels.find('name', config.chat).send("<@" + message.author.id + "> was successfully verified.");
				queue.pop();
				fs.appendFileSync("./verify_logs.txt", "[VerifyBot] " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "| " + message.author.tag + "(" + message.author.id + ") verified himself.");
				message.member.addRole(userRoleID).catch(error => console.log(error));
			}
			
        }else{
			if(message.content.toLowerCase() != prefix + "verify"){
				message.author.send("You were kicked from " + message.guild.name + " (WRONG_CAPTCHA)");
				message.delete();
				message.member.kick();
			}
		}
	}
}
if(message.guild){
	if(message.content.startsWith(prefix + "ban") && message.author.id === "312715611413413889"){
		message.guild.member(message.mentions.users.first()).kick();
	}
	
	for(i=0;i<blockedAccountIDs.length;i++){
		if(message.author.id === blockedAccountIDs[i]){
				message.delete();
					message.author.send("You were kicked from " + message.guild.name + " (BLOCKED)");
					message.member.kick();
			}
	}
	if(message.content.startsWith(prefix + "block")){
		if(message.member.hasPermission('ADMINISTRATOR')){
			blockedAccountIDs.push(message.content.substr(7));
			message.channel.send("Added `" + message.content.substr(7) + "` to the blocked list.");
		}else{
			return message.channel.send("Missing Permissions");
		}
	}
	if(message.content.startsWith(prefix + "pop")){
		if(message.member.hasPermission('ADMINISTRATOR')){
			blockedAccountIDs.pop();
			message.channel.send("Removed last blocked user.");
		}else{
			return message.channel.send("Missing Permissions");
		}
	}
	if(message.content.startsWith(prefix + "clear") && message.content.indexOf("captcha") === "-1"){
		if(message.member.hasPermission('ADMINISTRATOR')){
			message.channel.bulkDelete(message.content.substr(7));
		}else{
			return message.channel.send("Missing Permissions");
		}
	}
	if(message.channel.name === "verify"){
		message.delete();
	}
	if(message.content === prefix + "dumpWaitingQueue"){
		if(message.member.hasPermission('ADMINISTRATOR')){
			message.author.send({embed: {
				color: 0x00ff00,
				description: "**Waiting Queue Dump**\n\n" + waitingQueue
			}});
			message.delete();
		}else{
			return message.channel.send("Missing Permissions");
		}
	}
	if(message.author.id === config.ownerid && config.evalAllowed === "true" && message.content.startsWith(prefix + "eval")){
		message.channel.send(":outbox_tray: Output: ```JavaScript\n" + eval(message.content.substr(6)) + "\n```");
	}
}else{
	message.author.send(":x: I only react in guilds!");
}
});
client.login(config.token);
