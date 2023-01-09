const fs = require("fs");
var AsciiTable = require("ascii-table");
var table = new AsciiTable();

table.setHeading('Comandos Simples', 'Status')

module.exports = (client) => {

    client.simpleCommands = async () => {
      fs.readdirSync('./src/commands/simple').forEach(dir => {
        const files = fs.readdirSync(`./src/commands/simple/${dir}/`).filter(file => file.endsWith('.js'));

        if(!files || files.length <= 0) console.log("0 comandos encontrados")

        files.forEach((file) => {
            let command = require(`../../commands/simple/${dir}/${file}`)

            if(command) {
                client.simplecommands.set(command.name, command)

                if(command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name)
                    })
                }

                table.addRow(command.name, '+')
            } else {
                table.addRow(file, 'x')
            }
        })
      })

      console.log(table.toString());
 }
   
}