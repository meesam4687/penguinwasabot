const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),
  async execute(interaction) {
    await interaction.deferReply();
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    if (!player) {
      return interaction.editReply("There is nothing playing in this server!");
    }
    if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
      return interaction.editReply(
        "You need to be in the same voice channel as the bot to use this command!"
      );
    }
    let vc = interaction.member.voice.channel;
    let votes = 0;
    if (
      vc.members.size <= 2 ||
      interaction.member.id === player.current.requestedBy.id
    ) {
      const currentTrack = player.current;
      if (player.queue.size === 0) {
        player.destroy();
        return interaction.editReply(`Skipped: **${currentTrack.title}**`);
      } else {
        player.skip();
        interaction.editReply(`Skipped: **${currentTrack.title}**`);
      }
    } else if (vc.members.size > 2) {
      let skipEmbed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("⏭️ Skip the Song?")
        .setDescription(`${votes}/${Math.ceil(vc.members.size / 2)} Votes`)
        .setTimestamp();
      let row = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("voteskip")
          .setLabel("Skip")
          .setStyle(Discord.ButtonStyle.Primary)
      );
      await interaction.editReply({
        embeds: [skipEmbed],
        components: [row],
      });
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: Discord.ComponentType.Button,
        time: 15_000,
      });
      collector.on("collect", (i) => {
        if (i.customId === "voteskip") {
          votes++;
          skipEmbed.setDescription(
            `${votes}/${Math.ceil(vc.members.size / 2)} Votes`
          );
          i.update({ embeds: [skipEmbed] });
          if (votes >= Math.ceil(vc.members.size / 2)) {
            if (player.queue.size === 0) {
              player.destroy();
            } else {
              player.skip();
            }
            collector.stop();
          }
        }
      });

      collector.on("end", () => {
        row.components[0].setDisabled(true);
        interaction.editReply({
          embeds: [skipEmbed],
          components: [row],
        });
        if (votes < Math.ceil(vc.members.size / 2)) {
          interaction.followUp("Not enough votes to skip the song.");
        } else {
          interaction.followUp(`Skipped: **${player.current.title}**`);
        }
      });
    }
  },
};
