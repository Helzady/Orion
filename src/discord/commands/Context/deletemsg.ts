import { Command } from "@/discord/base";
import { settings } from "@/settings";
import { ApplicationCommandType, Collection, ColorResolvable, EmbedBuilder, Guild, GuildMember } from "discord.js";

export default new Command({
    name: "apagar mensagem",
    type: ApplicationCommandType.Message,
    dmPermission: false,
    async run({ interaction, client }) {
        if (!interaction.isMessageContextMenuCommand()) return;

        const member = interaction.member as GuildMember;
        const guild = interaction.guild as Guild;
        const { targetMessage } = interaction;

        await targetMessage.delete().catch((reason) => console.log(reason));

        const { author, channel } = targetMessage

        interaction.reply({ ephemeral: true, content: "A mensagem foi deletada!" })


        const clogs = guild.channels.cache.find(c => c.name == "logs");

        if (clogs && clogs.isTextBased()) {
            clogs.send({ embeds: [
                new EmbedBuilder({
                    title: "Mensagem Apagada",
                    description: `> **Canal:** ${channel}\n> **Author:** ${author.tag}\n> **Deletada por:** ${member}\n> **Conteúdo da mensagem:**\n \`${targetMessage}\``,
                    
                }).setColor(settings.colors.msg.DarkPurple as ColorResolvable)
            ] })
        }


    },
});