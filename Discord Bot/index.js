require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    }
});
const fs = require("fs");
bot.commands = new Discord.Collection();
const mongoose = require('./database/mongoose');

mongoose.init();

bot.on('ready', () => {
    console.log('Integer Auth Bot online');
    try {
        bot.user.setPresence({
            status: 'online',
            activity: {
                name: 'Watching Login',
            }
        });
    } catch (error) {
        console.log("Failed to set status");
    }

    fs.readdir('./commands', (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');
        if (jsfile.length <= 0) return console.log("Could not find commands!");
        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
});

bot.on('message', (message) => {
    if (message.author.bot) return;
    let prefix = '!';
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length);
    let args = MessageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd);
    if (commandfile) {
        commandfile.run(bot, message, args);
    }
});

bot.login("put bot token here");