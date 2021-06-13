const Discord = require("discord.js");
const redeemDatabaseManager = require('../database/impl/redeemDatabaseManager');

exports.run = async (bot, message, args) => {
    if(message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    //;redeem <generate/remove/info/use> <code>
    var today = new Date();

    var date = '\nY: ' + today.getFullYear()+'\nM: '+(today.getMonth()+1)+'\nD: '+today.getDate() + '\n';

    if (!args[0]) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Wrong usage")
            .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
    if (args[0].toString().toLowerCase() == "generate") {
        if (message.member.roles.cache.has('807132159814533132') || message.member.roles.cache.has('806344594026659881')) {
            try {
                codeuwu = generateIDCardNumber(1, -1).toString();
                addCodeToDatabase = await new redeemDatabaseManager({
                    createBy: message.author,
                    code: codeuwu,
                    createAt: date
                });
                await addCodeToDatabase.save();

                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle("Generate code compleate!")
                    .setColor("#4bff14")
                    .setDescription("The code is: " + "||`" + codeuwu + "`||");

                message.channel.send(sendEmbed);
            } catch (err) {
                message.channel.send("ERROR: " + err);
            }
        } else {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error: You don't have permision to do this.")
                .setColor("#ff0000")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`");

            message.channel.send(errorEmbed);
            return;
        }

    } else if (args[0].toString().toLowerCase() == "remove") {
        if (!args[1]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let findKey = await redeemDatabaseManager.findOne({
            code: args[1]
        });

        if (!findKey) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Redeem code not found.")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (findKey) {
            try {
                await findKey.deleteOne();

                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle("Redeem code has been removed!")
                    .setColor("#4bff14");

                message.channel.send(sendEmbed);
            } catch (err) {
                message.channel.send('ERROR: ' + err);
            }

        }

    } else if (args[0].toString().toLowerCase() == "info") {
        if (!args[1]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let findKey = await redeemDatabaseManager.findOne({
            code: args[1]
        });

        if (!findKey) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Redeem code not found.")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (findKey) {
            try {

                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle("Info for **" + args[1] + "** Code")
                    .addField("Create by", findKey.createBy, true)
                    .addField("Create date", findKey.createAt, true)
                    .addField("Code", findKey.code, true)
                    .setColor("#4bff14");

                message.channel.send(sendEmbed);
            } catch (err) {
                message.channel.send('ERROR: ' + err);
            }

        }
    } else if (args[0].toString().toLowerCase() == "use") {
        if (!args[1]) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Wrong usage")
                .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        let findKey = await redeemDatabaseManager.findOne({
            code: args[1]
        });

        if (!findKey) {
            let errorEmbed = new Discord.MessageEmbed()
                .setTitle("Redeem code not found :sunglase:")
                .setDescription("Sad af loool :gatosexo:")
                .setColor("#ff0000");

            message.channel.send(errorEmbed);
            return;
        }

        if (findKey) {
            try {
                message.member.roles.add('806344622200193054');

                await findKey.deleteOne();

                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle("Successfully redeem your key!")
                    .setColor("#4bff14");

                message.channel.send(sendEmbed);
            } catch (err) {
                message.channel.send('ERROR: ' + err);
            }
        }
    } else {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Wrong usage")
            .setDescription("`usage: ;redeem <generate/remove/info/use> <code>`")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
};

function generateIDCardNumber(a, s) {
    ids = [];
    for (i = 0; i < a;) {
        t = 0;
        r = Math.floor(Math.random() * 8) + 1;
        t += r * 13;
        id = r.toString();
        for (n = 12; n >= 2; n--) {
            r = Math.floor(Math.random() * 10);
            t = t + r * n;
            id = id + r;

        }
        l = (11 - t % 11) % 10;
        id += l;
        if (t != s) {
            ids[i] = id;
            i++;
        }
    }
    return ids;
}

exports.help = {
    name: 'redeem'
};
