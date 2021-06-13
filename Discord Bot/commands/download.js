const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    if (message.channel.type !== 'text') return message.channel.send("**This Command is only avalable on the server**");
    let role = message.guild.roles.cache.find(x => x.id === "806344622200193054");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    /*if(!role) {
        let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Errror: **Integer Access role not found**")
        .setDescription("usege: `;download`" + "\n" + "Please create role Call `Integer Access`.")
        .setColor("#ff0000");
    
        message.channel.send(errorEmbed);    
        return;
    }

    if(message.member.roles.cache.has(role.id)){
        try{
            let downloadEmbed = new Discord.MessageEmbed()
            .setTitle("Download")
            .setDescription("Link Soon")
            .setColor("#00dded");
        
            message.member.send(downloadEmbed);
            //message.member.send("please follow this tutorial: https://www.youtube.com/watch?v=Oq2J2_wjzSY");
            //message.member.send("for first time user or client have update: **if your client is stuck on HWID Screen press ESCAPE(ESC) on your keybord and it should work and go to auto update screen** and send your hwid to **NotThatUwU or LX (Create Ticket)**");

            let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Compleated!")
            .setDescription("Sent download link in your direct messages.")
            .setColor("#00ff0d");
        
            message.channel.send(errorEmbed);
        }catch{
            let errorEmbed = new Discord.MessageEmbed()
            .setTitle("Errror: Sorry but you dont open your direct message.")
            .setDescription("usege: `;download`.")
            .setColor("#ff0000");
        
            message.channel.send(errorEmbed);
        }
    }else{
        let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Errror: Sorry but you dont have Integer Access role")
        .setDescription("usege: `;download`.")
        .setColor("#ff0000");
    
        message.channel.send(errorEmbed);    
    }*/
    let errorEmbed = new Discord.MessageEmbed()
        .setTitle("This command is disabled ")
        .setDescription("Client is coming soon please be be patient")
        .setColor("#ff0000");

    message.channel.send(errorEmbed);

};

exports.help = {
    name: 'download'
};