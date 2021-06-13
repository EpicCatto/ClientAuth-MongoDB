const Discord = require("discord.js");
const loginDatabaseManager = require('../database/impl/loginDatabaseManager');

exports.run = async (bot, message, args) => {
    if (message.channel.type !== 'dm') return message.channel.send("**This Command is only avalable on the direct message**");
    //if (!message.member.roles.has("806343276168085514")) return message.channel.send("**e**");
    //if(message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    if (!args[1]) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Wrong usage")
            .setDescription("`usage: ;register <name> <hwid>`")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
    //if (message.member.roles.cache.has('806344622200193054')) {

        let alradyRegister = await loginDatabaseManager.findOne({
            DiscordID: message.author.id
        });
        let alradyHaveName = await loginDatabaseManager.findOne({
            Username: args[0]
        });
        let alradyHaveHwid = await loginDatabaseManager.findOne({
            HWID: args[1]
        });

        if(alradyRegister){
            let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: You alrady registered.")
            .setColor("#ff0000")
            message.channel.send(errorEmbed);
            return;
        }

        if(alradyHaveName){
            let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: That Name is alrady used.")
            .setColor("#ff0000")
            message.channel.send(errorEmbed);
            return;
        }

        if(alradyHaveHwid){
            let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: That HWID is alrady used.")
            .setColor("#ff0000")
            message.channel.send(errorEmbed);
            return;
        }

        try {
            addCodeToDatabase = await new loginDatabaseManager({
                Username: args[0],
                UID: await getUID(),
                HWID: args[1],
                DiscordID: message.author.id
            });
            await addCodeToDatabase.save();

            let sendEmbed = new Discord.MessageEmbed()
                .setTitle("Register compleate!")
                .addField("Username", args[0], true)
                .addField("HWID", args[1], true)
                .addField("UID", addCodeToDatabase.UID, true)
                .setDescription("If you have any problems please contact admin developer or owner.")
                .setColor("#4bff14")
            message.channel.send(sendEmbed);
        } catch (err) {
            message.channel.send("ERROR: " + err);
        }
    /*} else {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: You don't have permision to do this.")
            .setColor("#ff0000")
            .setDescription("`usage: ;register <name> <hwid>`");

        message.channel.send(errorEmbed);
        return;
    }*/
};

async function getUID() {
    const j = await loginDatabaseManager.find({});
    return j.length + 1;
 }

exports.help = {
    name: 'register'
};