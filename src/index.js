const { config } = require("dotenv");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const configs = require('./config.json')
config();

const client = new Client({ 
  intents: [
     GatewayIntentBits.Guilds, 
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent,
     GatewayIntentBits.GuildMembers,
    ]});


module.exports = client;

client.commands = new Collection();
client.simplecommands = new Collection();
client.aliases = new Collection();
client.prefix = configs.prefix;
client.commandArray = [];


const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for(const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.categories = fs.readdirSync("./src/commands/simple/");

client.handleEvents();
client.handleCommands();
client.simpleCommands();


client.login(process.env.TOKEN);
