const Discord = require("discord.js");
const loginDatabaseManager = require('../database/impl/loginDatabaseManager');

exports.run = async (bot, message, args) => {
    //if (message.channel.type !== 'dm') return message.channel.send("**This Command is only avalable on the direct message**");
    //if (!message.member.roles.has("806343276168085514")) return message.channel.send("**e**");
    if (message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    if (!(message.member.roles.cache.has('807132159814533132') || message.member.roles.cache.has('835839440780787722') || message.member.roles.cache.has('806344594026659881') || message.member.roles.cache.has('807134997651259433') || message.member.roles.cache.has('851319622941671434') || message.member.roles.cache.has('849269934014070784'))) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: You don't have permision to do this.")
            .setColor("#ff0000")
            .setDescription("`;management <setusername/sethwid/setuid/remove/info> <discordid> <value>`");

        message.channel.send(errorEmbed);
        return;
    }
    if (!args[0]) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Wrong usage")
            .setDescription("`usage: ;management <setusername/sethwid/setuid/remove/info> <discordid> <value>`")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
    if (args[0].toString().toLowerCase() == "setusername") {
        if (!args[2]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;management setusername <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let targetDiscordID = await loginDatabaseManager.findOne({
            DiscordID: args[1]
        });

        if (!targetDiscordID) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("User Not Found")
                .setDescription("`usage: ;management setusername <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (targetDiscordID) {
            try {
                targetDiscordID.overwrite({
                    Username: args[2],
                    UID: targetDiscordID.UID,
                    HWID: targetDiscordID.HWID,
                    DiscordID: targetDiscordID.DiscordID
                })
                targetDiscordID.save();
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle("Successfully change username.")
                    .addField("New Username", targetDiscordID.Username)
                    .setColor("#4bff14");
                message.channel.send(successEmbed);
            } catch (error) {
                message.channel.send("ERROR: " + error)
            }
        }
    } else if (args[0].toString().toLowerCase() == "sethwid") {
        if (!args[2]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;management sethwid <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let targetDiscordID = await loginDatabaseManager.findOne({
            DiscordID: args[1]
        });

        if (!targetDiscordID) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("User Not Found")
                .setDescription("`usage: ;management sethwid <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (targetDiscordID) {
            try {
                targetDiscordID.overwrite({
                    Username: targetDiscordID.Username,
                    UID: targetDiscordID.UID,
                    HWID: args[2],
                    DiscordID: targetDiscordID.DiscordID
                })
                targetDiscordID.save();
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle("Successfully change hwid.")
                    .addField("Username", targetDiscordID.Username)
                    .addField("New HWID", targetDiscordID.HWID)
                    .setColor("#4bff14");
                message.channel.send(successEmbed);
            } catch (error) {
                message.channel.send("ERROR: " + error)
            }
        }
    } else if (args[0].toString().toLowerCase() == "setuid") {
        if (!args[2]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;management setuid <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let targetDiscordID = await loginDatabaseManager.findOne({
            DiscordID: args[1]
        });

        if (!targetDiscordID) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("User Not Found")
                .setDescription("`usage: ;management setuid <discordid> <value>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (targetDiscordID) {
            try {
                targetDiscordID.overwrite({
                    Username: targetDiscordID.Username,
                    UID: args[2],
                    HWID: targetDiscordID.HWID,
                    DiscordID: targetDiscordID.DiscordID
                })
                targetDiscordID.save();
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle("Successfully change uid.")
                    .addField("Username", targetDiscordID.Username)
                    .addField("New UID", targetDiscordID.UID)
                    .setColor("#4bff14");
                message.channel.send(successEmbed);
            } catch (error) {
                message.channel.send("ERROR: " + error)
            }
        }
    }
    else if (args[0].toString().toLowerCase() == "info") {
        if (!args[1]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;management info <discordid>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let targetDiscordID = await loginDatabaseManager.findOne({
            DiscordID: args[1]
        });

        if (!targetDiscordID) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("DiscordID not found.")
                .setDescription("`usage: ;management info <discordid>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (targetDiscordID) {
            try {

                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle("Info for **" + args[1] + "** DiscordID")
                    .addField("Username", targetDiscordID.Username, true)
                    .addField("UID", targetDiscordID.UID, true)
                    .addField("HWID", targetDiscordID.HWID, true)
                    .addField("Discord",  "<@" + targetDiscordID.DiscordID + ">")
                    .setColor("#4bff14");

                message.channel.send(sendEmbed);
            } catch (err) {
                message.channel.send('ERROR: ' + err);
            }

        }
    }else if (args[0].toString().toLowerCase() == "remove") {
        if (!args[1]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;management remove <discordid>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let targetDiscordID = await loginDatabaseManager.findOne({
            DiscordID: args[1]
        });

        if (!targetDiscordID) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("User Not Found")
                .setDescription("`usage: ;management remove <discordid>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (targetDiscordID) {
            try {
                await targetDiscordID.deleteOne();
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle("Successfully Remove User.")
                    .setColor("#4bff14");
                message.channel.send(successEmbed);
            } catch (error) {
                message.channel.send("ERROR: " + error)
            }
        }
    } else {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Wrong usage")
            .setDescription("`usage: ;management <setusername/sethwid/setuid/remove/info> <discordid> <value>`")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
};

exports.help = {
    name: 'usermanagement'
};