# DiscordCaptcha

A Captcha verification bot based on discord.js.

## Setup procedure

The configuration file is located in src/config.json.

![Config](https://i.imgur.com/i50h5nT.gif)

**Note: The prefix must not be longer than 1 character, otherwise some commands won't work!**

![Prefix](https://i.imgur.com/xRFvCCG.png)

Download Node.js from here: https://nodejs.org/en/download/package-manager/

![NodeInstall](https://i.imgur.com/cvgsE16.png)

Before starting the bot for the first time, run `~/setup.bat`.

**If your operating system is not Windows, please run `npm install` in the bot's directory with your respective terminal program.

## Additional commands

!block <USERID> -> User will get kicked after writing something.

!pop -> Removes the last blocked ID.

!clear <int 1-100> -> Deletes x messages.

## Tips

Look at the wiki for some fixes.

Make sure you've created a channel called verify and the bot role is higher than the verified role.
![verifychannel](https://i.imgur.com/Ws9HJql.png)
![roles](https://i.imgur.com/R7ugoYO.png)
