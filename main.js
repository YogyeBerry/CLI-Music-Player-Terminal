const fs = require("fs");
const path = require("path");
function showSongs() {
    const songsFolder = path.join(__dirname, "songs");
    const files = fs.readdirSync(songsFolder);
    console.log("Files in songs folder:",'\n');
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith(".mp3")) {
            console.log(i+1, files[i]);
        }
    }
}
showSongs();