const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const ytdl = require("ytdl-core");
const fs = require("fs");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("messages.upsert", async (m) => {
        const message = m.messages[0];
        if (!message.message || message.key.fromMe) return;

        const chatId = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;

        if (text && (text.includes("youtube.com") || text.includes("youtu.be"))) {
            sock.sendMessage(chatId, { text: "Downloading video, please wait..." });

            const videoInfo = await ytdl.getInfo(text);
            const format = ytdl.chooseFormat(videoInfo.formats, { quality: "highest" });

            const filePath = `./downloads/video.mp4`;
            ytdl(text, { format: format }).pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                await sock.sendMessage(chatId, { document: fs.readFileSync(filePath), mimetype: "video/mp4", fileName: "video.mp4" });
                fs.unlinkSync(filePath);
                const express = require("express");
const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
const PORT = process.env.PORT || 3000;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);

    console.log("Bot started successfully!");
}

startBot();

// Koyeb Health Check ke liye server
app.get("/", (req, res) => {
    res.send("Bot is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
            });
        }
    });
}

startBot();
