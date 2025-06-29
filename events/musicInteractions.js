const convert = require("convert-seconds");
const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    try {
      if (
        !interaction.isButton() ||
        !["skpbtn", "pausebtn", "stopbtn"].includes(interaction.customId)
      )
        return;
      await interaction.deferReply({ ephemeral: true });

      let id = interaction.customId;
      let player = interaction.client.moonlinkManager.players.get(
        interaction.guild.id
      );
      if (!player) {
        return interaction.editReply({
          content: "There is no music playing in this server.",
          ephemeral: true,
        });
      }
      if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
        return interaction.editReply({
          content:
            "You need to be in the same voice channel as the bot to use this command!",
          ephemeral: true,
        });
      }
      const track = player.current;
      const requestor = interaction.client.users.cache.get(track.requestedBy.id)
        .username || {
        username: "Unknown",
      };

      const playEmbed = new Discord.EmbedBuilder()
        .setTitle(`Now Playing ${track.title} 🎶`)
        .setDescription(
          `⌚ Song Duration: \`${
            convert(Math.floor(track.duration / 1000)).minutes
          }:${convert(Math.floor(track.duration / 1000)).seconds}\``
        )
        .setImage(track.artworkUrl)
        .setTimestamp()
        .setFooter({ text: `Requested by: ${requestor}` });
      const mesgRow = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("stopbtn")
          .setLabel("⏹️")
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId("pausebtn")
          .setLabel(player.paused ? "▶️" : "⏸️")
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId("skpbtn")
          .setLabel("⏩")
          .setStyle(Discord.ButtonStyle.Primary)
      );

      if (id === "stopbtn") {
        player.destroy();
        let channel = interaction.guild.channels.cache.get(
          player.textChannelId
        );
        if (channel) {
          channel.send({
            content: `${interaction.user} stopped the music.`,
          });
        }
        return interaction.editReply({
          content: `Stopped`,
        });
      }

      if (id === "pausebtn") {
        if (player.paused) {
          player.resume();
          mesgRow.components[1].setLabel("⏸️");
          interaction.message.edit({
            embeds: [playEmbed],
            components: [mesgRow],
          });
          return interaction.editReply({
            content: `Resumed`,
            ephemeral: true,
          });
        } else {
          player.pause();
          mesgRow.components[1].setLabel("▶️");
          interaction.message.edit({
            embeds: [playEmbed],
            components: [mesgRow],
          });
          return interaction.editReply({
            content: `Paused`,
            ephemeral: true,
          });
        }
      }
      let channel = interaction.guild.channels.cache.get(player.textChannelId);
      let imsg;
      if (id === "skpbtn") {
        let vc = interaction.member.voice.channel;
        let votes = 0;
        if (
          vc.members.size <= 2 ||
          interaction.member.id === player.current.requestedBy.id
        ) {
          const currentTrack = player.current;
          if (player.queue.size === 0) {
            player.destroy();
            interaction.editReply(`Skipped`);
            let channel = interaction.guild.channels.cache.get(
              player.textChannelId
            );
            if (channel) {
              channel.send({
                content: `${interaction.user} skipped **${currentTrack.title}**.`,
              });
            }
          } else {
            player.skip();
            interaction.editReply(`Skipped`);
            if (channel) {
              channel.send({
                content: `${interaction.user} skipped **${currentTrack.title}**.`,
              });
            }
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
            content: `Started voteskip.`,
          });
          if (channel) {
            channel.send({
              embeds: [skipEmbed],
              components: [row],
            }).then((msg) => {
              imsg = msg;
            });
          }
          const collector = interaction.channel.createMessageComponentCollector(
            {
              componentType: Discord.ComponentType.Button,
              time: 15_000,
            }
          );
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
            let channel = interaction.guild.channels.cache.get(
              player.textChannelId
            );
            imsg.edit({
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
      }
    } catch (error) {
      console.error("Error in interactionCreate:", error);
    }
  },
};
