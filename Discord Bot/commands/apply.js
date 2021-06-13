const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    if (message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    let role = message.guild.roles.cache.find(x => x.id === "806344622200193054");
    let inTicket = message.channel.name.toLowerCase().includes("ticket");
    //console.log(inTicket);

    if (!inTicket) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Please run this command in ticket")
            .setDescription("Please create ticket at #get-client")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }
    if (message.member.roles.cache.has(role.id)) {
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle("You alrady have Role")
            .setColor("#ff0000");

        message.channel.send(errorEmbed);
        return;
    }

    let applyEmbed = new Discord.MessageEmbed()
        .setTitle("Integer Client Applications")
        .setDescription("Applications is currently closed")
        //.setDescription("`What is your age: \nWhere are you from: \nWhy do you want Integer: \nHow long have you used hacked clients in minecraft: \nWhat other clients do you have/currently use: \nWhy do you think we should pick you to receive Integer: \nTell us about yourself: \nDo you understand that Integer is free and if you leak it you will lost your access (Y/N): `")
        .setColor("#ff0000");

    message.channel.send(applyEmbed);

};

exports.help = {
    name: 'apply'
};