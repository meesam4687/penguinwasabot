// predeploy.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "node_modules/@distube/youtube/dist/index.js");

// Read the file into an array of lines
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        process.exit(1);
    }

    const lines = data.split("\n");

    // Modify lines 118 and 119 explicitly
    lines[117] = 'let info = await import_ytdl_core.default.getInfo(song.url, this.ytdlOptions);'; // line 118
    lines[118] = 'info.formats = info.formats.filter((f) => f.hasAudio && f.url.includes("c=IOS"));'; // line 119

    // Join the lines back into a single string
    const modifiedData = lines.join("\n");

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedData, "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
            process.exit(1);
        }
        console.log("Lines 118 and 119 modified successfully.");
    });
});
