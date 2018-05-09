<img src="https://image.ibb.co/gEN0oR/discord_banner.png"><br/>
A Captcha verification bot based on Discord.js.

> Discordcaptcha 3.0.0 is coming!
> Currently you can't really decide whether to use images or text as captcha type in a proper way. (text branch is deprecated)
> Version 3.0.0 has much new features, which you can see on the project page.

You can find a detailed tutorial <a href="https://www.gitbook.com/book/y21/discordcaptcha/">here</a>. <br />
Feel free to join our <a href="https://discord.gg/955naZw">discord server</a> for live support.

## Setup procedure
DiscordCaptcha requires NodeJS 8.0+. Install it <a href="https://nodejs.org/en/download/package-manager/">here</a>.<br />
To install all required NPM-Modules, run the install script in `~/setup/` (.sh or .bat file depends on your operating system) (or `npm install` <b>in bots' directory</b> if both don't work.) (Click <a href="https://discordjs.guide/#/preparations/?id=installing-nodejs">here</a> for a detailed installation tutorial on how to install nodejs)<br/><br/>
For now, make sure the bot is only in one guild.
The config file is located in `~/src/`. Get your Token from <a href="https://discordapp.com/developers/applications/me">here</a>.

## Config-file generator
Newer versions of discordcaptcha have a config-file generator. It is written in C++ and needs to be compiled if you want to run it. If you don't have a compiler, i recommend the g++ gnu compiler. The file is located in `~/setup/Setup.cpp`.

## Additional commands

```js
/**
* Snowflake: ID
**/
!block <Snowflake> // Blocks a User ID. If the User sends a message to the guild, he'll get kicked.
!removeBlock <Snowflake> // Removes a User ID from the blacklist. User can write again without getting kicked.
!clear <Amount of messages> // Clears an amount of messages, up to 100
!version // The current version and the latest version
!create-role // Creates the verification role
```

## Adding captchas
You can add as many captchas as you want into the `~/captchas/` directory, but please keep in mind that:
- Extension has to be .png
- Filename **has** to be the same as the captcha.

**Deprecation warning:** Custom captchas are **deprecated**, means that it will be removed in 3.0.0. 


## API related commands

```js
!api queries // Current query
!api querydelete // Deletes the query (should be executed every 2 or 3 weeks)
!api purgelogs // Purges the logs
!api logs // Get logs
!api captchas // All captchas (limited to 2000 chars)
```
<b>Note: </b>If you want to use these commands, you have to put your tag into the `contributors` array.<br/>
<img src="https://i.imgur.com/Pw4MnB0.png"></img>

## Dealing with SQL(ite)
Blocked users, logs and queries are stored in a database which is located in `~/src/db.sqlite`. If you want to read data from it, i recommend <a href="http://sqlitebrowser.org/">SQLite DB Browser</a> (<a href="https://nightlies.sqlitebrowser.org/latest/">Nightly</a>).
After the installation, you're able to open the database by clicking 'open database' in the program.

## Tips

• Look at the wiki for some fixes.<br/>
• Contact me via discord. (y21#0909 | ID: 312715611413413889)<br/>
• Open a pull request/issue
