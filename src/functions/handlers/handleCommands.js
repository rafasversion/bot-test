const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {

    client.handleCommands = async () => {
        
    const commandFolders = fs.readdirSync("./src/commands/slash");
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/slash/${folder}`).filter((file) => file.endsWith('.js'));

        const { commands, commandArray } = client;
        for (const file of commandFiles) {

        const command = require(`../../commands/slash/${folder}/${file}`);
        
        commands.set(command.data.name, command)
        commandArray.push(command.data.toJSON())
        console.log(`Commands: ${command.data.name} foi criado.`)
        }

    }

    const clientId = '1057326147647569930';
    const guildId = '887769068977918002';
    const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);

    try {
        console.log(`Comandos de barra (/) carregados`);
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { 
            body: client.commandArray
        });

        console.log(`Comandos de barra (/) recarregados`)

    } catch (error) {
        console.error(error)
    }
 }
   
}