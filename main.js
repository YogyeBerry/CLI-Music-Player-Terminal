const fs = require("fs");
const path = require("path");
function showsongs() {
    const songsFolder = path.join(__dirname, "songs");
    const files = fs.readdirSync(songsFolder);
    const songs = []
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith(".mp3") || files[i].endsWith(".wav") || files[i].endsWith(".flac")) {
            const fullPath = path.join(songsFolder, files[i]);
            songs.push({
                title: files[i],
                path: fullPath,
                duration: null,
            });
        }
    }
    return songs;
}
const songs = showsongs();
if (songs.length === 0) {
    console.log("No supported audio files found.");
} else {
    console.log("Available songs:");
    for (let i = 0; i < songs.length; i++) {
        console.log(i + 1, songs[i].title);
    }
}
