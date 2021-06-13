const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    if (message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    if (message.member.roles.cache.has('807132159814533132') || message.member.roles.cache.has('835839440780787722') || message.member.roles.cache.has('806344594026659881') || message.member.roles.cache.has('806344599928438784') || message.member.roles.cache.has('807134997651259433')) {
        let channel = bot.channels.cache.get(message.channel.id);
        let posisi = channel.position;

        channel.clone().then((channel2) => {
            channel2.setPosition(posisi);
            channel.delete();
            channel2.send("https://cdn.discordapp.com/attachments/809654595512696862/839806759753482270/LeafyRashAmethystgemclam.mp4\n**Click on the video haha yes !!!!**");
        });
    } else {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Error: You don't have permision to do this.")
            .setColor("#ff0000")
            .setDescription("`usage: ;nuke`");

        message.channel.send(errorEmbed);
        return;
    }
};

exports.help = {
    name: 'nuke'
};