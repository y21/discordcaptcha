# DiscordCaptcha Linux-Stable
A linux-compatible captcha verification bot based on discord.js. <br/>
At least <a href="https://nodejs.org/en/download/package-manager/">Node.js 8.0</a> is required to make this work. 


## Setup procedure
The configuration file is located in `~/config.json.`  <br />
**Note: The prefix must not be longer than 1 character, otherwise some commands won't work!** <br />
You can add captcha images manually in the `~/captchas/` directory, but you have to add it to the `captchas` array in `~/config.json`.

## Additional commands
• !block &lt;<i>INT</i> UserID&gt; → Adds a user id to the blacklist. If the user sends a message, he'll get instantly kicked. <br />
• !pop → Removes the last blocked user <br />
• !clear &lt;<i>INT</i> amount of messages to delete&gt; → Deletes x messages.

## Tips

Look at the wiki for some fixes.

Make sure you've created a channel called verify and the bot role is higher than the verified role.
![verifychannel](https://i.imgur.com/Ws9HJql.png)
![roles](https://i.imgur.com/R7ugoYO.png)
