import { settings } from "@/settings";
import { Command } from "@discord/base";
import { ApplicationCommandType, ColorResolvable, EmbedBuilder } from "discord.js";

export default new Command({
    name: "ping",
    description: "Veja o ping do bot.",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run({interaction, client}){
        let user = interaction.user.username;
        let ping = client.ws.ping;

        let embed1 = new EmbedBuilder({
            title: "Pong",
            description: `Olá ${user}, O ping do bot é **\`Calculando\`**`
        }).setColor(settings.colors.msg.Magenta as ColorResolvable);

        let embed2 = new EmbedBuilder({
            title: "pong",
            description: `Olá ${user}, O ping do bot é: **\`${ping}ms\`**`
        }).setColor(settings.colors.msg.Magenta as ColorResolvable)

        interaction.reply({ephemeral: true, embeds: [embed1]}).then( () => {
            setTimeout( () => {
                interaction.editReply({ embeds: [embed2]})
            }, 2000)
        })

    }
});