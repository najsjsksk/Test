require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === "!panel") {
    const embed = new EmbedBuilder()
      .setTitle("ASTD X  KAITUN")
      .setDescription("This control panel is for the project: **ASTD X Kaitun**")
      .setColor("#2b2d31")
      .setFooter({ text: `Sent by ${message.author.tag} | ${new Date().toLocaleString("en-GB")}` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('redeem').setLabel('Redeem Key').setStyle(ButtonStyle.Success).setEmoji('🔑'),
      new ButtonBuilder().setCustomId('getscript').setLabel('Get Script').setStyle(ButtonStyle.Primary).setEmoji('📜')
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('getrole').setLabel('Get Role').setStyle(ButtonStyle.Primary).setEmoji('🧑‍🎓'),
      new ButtonBuilder().setCustomId('resethwid').setLabel('Reset HWID').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
      new ButtonBuilder().setCustomId('getstats').setLabel('Get Stats').setStyle(ButtonStyle.Secondary).setEmoji('📊')
    );

    await message.channel.send({ embeds: [embed], components: [row, row2] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const userId = interaction.user.id;

  switch (interaction.customId) {
    case "redeem":
      await interaction.reply({ content: "🔑 Vui lòng gửi key để redeem!", ephemeral: true });
      break;

    case "getscript":
      const script = `loadstring(game:HttpGet("https://raw.githubusercontent.com/yourrepo/script.lua"))()\ngetgenv().Key = "your_key_here"\ngetgenv().ID = "${userId}"`;
      await interaction.reply({ content: `📜 Đây là script của bạn:\n\`\`\`lua\n${script}\n\`\`\``, ephemeral: true });
      break;

    case "getrole":
      await interaction.reply({ content: "✅ Đã cấp role!", ephemeral: true });
      break;

    case "resethwid":
      await interaction.reply({ content: "⚙️ Đã reset HWID thành công!", ephemeral: true });
      break;

    case "getstats":
      await interaction.reply({ content: "📊 Stats: 1000 users, 500 script runs, 100 resets", ephemeral: true });
      break;
  }
});

client.login(process.env.TOKEN);
