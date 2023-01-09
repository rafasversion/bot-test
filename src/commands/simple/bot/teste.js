const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {

    name: 'teste',
    aliases: ['test'],
    description: "teste",
    usage: '!teste',
    category: 'test',
    cooldown: 5000,
	

	run: async (client, message, args) => {

        
     const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`)
     
     function handleReponse(response) {
        return response.items
        }

        console.log(handleReponse(response.data.items.map(book => book.volumeInfo.title)))
        
        message.channel.send(`teste`)
	}
};
