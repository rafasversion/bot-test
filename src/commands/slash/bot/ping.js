const { SlashCommandBuilder, DiscordAPIError } = require('discord.js')
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Retorna o ping de Bookstand"),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });


        const newMessage = new Discord.EmbedBuilder()
        .setTitle("Ping!")
        .setDescription(`Latência da API: \`${client.ws.ping}ms\`\nPing: \`${message.createdTimestamp - interaction.createdTimestamp}ms\``)
        .setColor('#ffe900')
        await interaction.editReply({
            embeds: [newMessage]
        })
    }
}