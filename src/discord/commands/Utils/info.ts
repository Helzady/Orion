import { Command } from "@/discord/base";
import { settings } from "@/settings";
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, Embed, EmbedBuilder } from "discord.js";

export default new Command({
    name: "info",
    description: "Mostra as informações sobre o bot, server e usuários.",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    options: [
        {
            name: "bot",
            description: "Mostra as informações do bot.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "server",
            description: "Mostra as informações do Server.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "user",
            description: "Mostra as informações do usuário.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Mencione um usuário.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
            ]
        },
    ],

    run({ interaction, client }) {

        const Subcommand = interaction.options.getSubcommand();
        const { user, users, guilds, channels, ws } = client;

        if (Subcommand === "bot") { // Subcommand bot

            let bot = user.tag;
            let botAvatar = user.displayAvatarURL();
            let dono = process.env.AUTHOR_ID;
            let membros = users.cache.size;
            let servidores = guilds.cache.size;
            let canais = channels.cache.size;
            let linguagem = "TypeScript";
            let livraria = "Discord.js";
            let ping = ws.ping;

            let embed = new EmbedBuilder({
                title: "Informações do bot",
                thumbnail: { url: botAvatar },
                footer: { text: bot, iconURL: botAvatar },
                timestamp: new Date(),
                description: `Olá ${interaction.user}, veja  minhas informações abaixo:\n
            \n> 🤖 Nome: \`${bot}\`.\n> 🤖 Dono: \`${users.cache.get(dono || 'Desconhecido')?.tag}\`.\n\n> ⚙️ Membros: \`${membros}\`.\n> ⚙️ Servidores: \`${servidores}\`.\n> ⚙️ Canais: \`${canais}\`.\n> ⚙️ Ping: \`${ping}\`.\n\n> 📚 Linguagem de programação: \`${linguagem}\`.\n> 📚 Livraria: \`${livraria}\`.`
            }).setColor(settings.colors.msg.DarkPurple as ColorResolvable)

            let row = new ActionRowBuilder<ButtonBuilder>({
                components: [
                    new ButtonBuilder({
                        url: "https://discord.gg/YEUXwjBusF",
                        label: "Suporte",
                        style: ButtonStyle.Link
                    }),
                    new ButtonBuilder({
                        url: "https://github.com/DevRosasNegras/Titania-BotTS",
                        label: "Documentação",
                        style: ButtonStyle.Link
                    }),
                    new ButtonBuilder({
                        url: "https://github.com/DevRosasNegras/Titania-BotTS",
                        label: "Diretrizes",
                        style: ButtonStyle.Link
                    })
                ]
            })

            interaction.reply({ ephemeral: true, embeds: [embed], components: [row] })

        }

        if (Subcommand === "server") { // Subcommand server

            let { guild } = interaction;
            let memberCount = guild.memberCount;
            let channelCounts = {
                text: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
                voice: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
                category: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size,
                news: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildNews).size,
                store: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStore).size,
                forum: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size,
                announcement: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size,
                stagevoice: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size,
                total: guild.channels.cache.size
            }
            let createdDate = guild.createdAt.toLocaleDateString();
            let guildAvatar = guild.iconURL();

            let embed = new EmbedBuilder({
                title: "Informações do Servidor",
                fields: [
                    {
                        name: "Nome do Servidor",
                        value: `\`${guild.name}\``,
                        inline: true
                    },
                    {
                        name: "Criado em",
                        value: `\`${createdDate}\``,
                        inline: true
                    },
                    {
                        name: "Membros",
                        value: `${memberCount}`,
                        inline: false
                    },
                    {
                        name: "Canais de texto",
                        value: `${channelCounts.text}`,
                        inline: false
                    },
                    {
                        name: "Canais de Voz",
                        value: `${channelCounts.voice}`,
                        inline: false
                    },
                    {
                        name: "Canais de Forum",
                        value: `${channelCounts.forum}`,
                        inline: false
                    },
                    {
                        name: "Canais de Noticias",
                        value: `${channelCounts.news}`,
                        inline: false
                    },
                    {
                        name: "Canais de Loja",
                        value: `${channelCounts.store}`,
                        inline: false
                    },
                    {
                        name: "Canais de Anúncios",
                        value: `${channelCounts.announcement}`,
                        inline: false
                    },
                    {
                        name: "Canais de palco",
                        value: `${channelCounts.stagevoice}`,
                        inline: false
                    },
                    {
                        name: "Categorias de Canais",
                        value: `${channelCounts.category}`,
                        inline: false
                    },
                    {
                        name: "Total de Canais",
                        value: `${channelCounts.total}`,
                        inline: false
                    },
                ],
                thumbnail: { url: `${guildAvatar || ''}` },
            }).setColor(settings.colors.msg.DarkPurple as ColorResolvable)

            interaction.reply({ ephemeral: true, embeds: [embed] })

        }

        if (Subcommand === "user") { // Subcommand user
            let user = interaction.options.getUser("user");
            let data_conta = user?.createdAt.toLocaleString();
            let id = user?.id;
            let tag = user?.tag;
            let is_bot = user?.bot;

            if (is_bot === true) is_bot = "Sim";
            if (is_bot === false) is_bot = "Não";

            let embed = new EmbedBuilder({
                title: "Informações do Usuário:",
                author: {
                    name: `${user?.username}`,
                    iconURL: `${user?.displayAvatarURL() || ''}`,
                },
                fields: [
                    {
                        name: "☀️ Tag:",
                        value: `\`${tag}\``,
                        inline: false
                    },
                    {
                        name: "🆔 ID:",
                        value: `\`${id}\``,
                        inline: false
                    },
                    {
                        name: "📆 Criação da conta:",
                        value: `\`${data_conta}\``,
                        inline: false
                    },
                    {
                        name: "🤖 É um bot?",
                        value: `\`${is_bot}\``,
                        inline: false
                    },
                ],
                thumbnail: { url: user?.displayAvatarURL() || '' }

            }).setColor(settings.colors.msg.DarkPurple as ColorResolvable)

            interaction.reply({ ephemeral: true, embeds: [embed] })

        }

    },
});