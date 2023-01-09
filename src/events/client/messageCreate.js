const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms')
const client = require('../..');
const settings = require('../../config.json')
const prefix = client.prefix;
const cooldown = new Collection();

module.exports = {
    name: 'messageCreate',
    async execute (message) {

        if(message.author.bot) return;
        if(message.channel.type !== 0) return;
        if(!message.content.startsWith(prefix)) return; 
        const args = message.content.slice(prefix.length).trim().split(/ +/g); 
        const cmd = args.shift().toLowerCase();
        if(cmd.length == 0 ) return;
        let command = client.simplecommands.get(cmd)
        if(!command) command = client.simplecommands.get(client.aliases.get(cmd));
    
        if(command) {
            if(command.cooldown) {
                if(cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: settings.cooldown_msg.replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now()) ) });
    
                if(command.userPerms || command.botPerms) {
                    if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                        const userPerms = new EmbedBuilder()
                        .setTitle(`${settings.erromsg.titulo}`)
                        .setDescription(`${message.author}, Você não possui a permissão: \`${command.userPerms}\` para executar este comando!`)
                        .setColor(`${settings.color}`)
                        .setTimestamp()
                        return message.reply({ embeds: [userPerms]})
                    }
                    if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                        const botPerms = new EmbedBuilder()
                        .setTitle(`Ocorreu um Erro!`)
                        .setDescription(`${message.author}, Eu não possuo a permissão: \`${command.userPerms}\` para executar este comando!`)
                        .setColor(`${settings.color}`)
                        .setTimestamp()
                        return message.reply({ embeds: [botPerms]})
                    }
                }
    
                command.run(client, message, args)
                cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown);
            } else {
                if(command.userPerms || command.botPerms) {
                    if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                        const userPerms = new EmbedBuilder()
                        .setTitle(`⚠ Ocorreu um Erro! ⚠`)
                        .setDescription(`${message.author}, Você não possui a permissão: \`${command.userPerms}\` para executar este comando!`)
                        .setColor(`${settings.color}`)
                        .setTimestamp()
                        return message.reply({ embeds: [userPerms]})
                    }
                    if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                        const botPerms = new EmbedBuilder()
                        .setTitle(`⚠ Ocorreu um Erro! ⚠`)
                        .setDescription(`${message.author}, Eu não possuo a permissão: \`${command.userPerms}\` para executar este comando!`)
                        .setColor(`${settings.color}`)
                        .setTimestamp()
                        return message.reply({ embeds: [botPerms]})
                    }
                }
                command.run(client, message, args)
            }
        }
    
}
}