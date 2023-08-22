import { Command } from "@/discord/base"
import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from "discord.js";

export default new Command({
    name: "limpar",
    description: "Apague todas as mensagens recentes do chat.",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantidade",
            description: "O total de mensagens a serem excluídas.",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: "autor",
            description: "Mencione o autor das mensagens a serem excluídas",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    async run({ interaction, client}) {
        if(!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;
        const { channel } = interaction;

        const { options } = interaction;

        await interaction.deferReply({ephemeral: true})

        const amount = Math.min((options.getInteger("quantidade", true), 100));
        const mention = options.getMember("autor") as GuildMember | null;;

        if (!channel){
            interaction.editReply({content: "Não é possível limpar mensagens!"});
            return;
        }

        const messages = await channel.messages.fetch();

        if (mention){
            const messages = channel.messages.cache.filter(m => m.author.id == mention.id).first(amount);
            if(messages.length < 1){
                interaction.editReply({content: `Não foi encontrado nenhuma mensagem recente de ${mention}.`})
                return;
            }

            channel.bulkDelete(messages, true)
        .then(cleared => interaction.editReply({
            content: `Foram limpas ${cleared.size} mensagens em ${mention}!`
        }))
        .catch(() => interaction.editReply({
            content: `Ocorreu um erro ao tentar limpar mensagens em ${mention}!`
        }))

            return;
        }

        channel.bulkDelete(messages.first(amount), true)
        .then(cleared => interaction.editReply({
            content: `Foram limpas ${cleared.size} mensagens em ${channel}!`
        }))
        .catch(() => interaction.editReply({
            content: `Ocorreu um erro ao tentar limpar mensagens em ${channel}!`
        }))
    },
});