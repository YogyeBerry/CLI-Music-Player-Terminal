const fs = require("fs");
const path = require("path");
function showsongs() {
    const songsFolder = path.join(__dirname, "songs");
    const files = fs.readdirSync(songsFolder);
    const songs = [];
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
let selectedIndex = 0;
function render() {
    console.log("CLI Music Player");
    console.log("");
    for (let i = 0; i < songs.length; i++) {
        if (i === selectedIndex) {
            console.log("> " + (i + 1) + " " + songs[i].title);
        } else {
            console.log("  " + (i + 1) + " " + songs[i].title);
        }
    }
    console.log("");
    console.log("Navigate (Arrow Keys) | Enter Play | Space Pause/Resume | Q Quit");
}
if (songs.length === 0) {
    console.log("No supported audio files found.");
} else {
    render();
}
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (key) {
    key = key.toString();

    if (key === "q") {
        process.exit();
    }

    console.log(JSON.stringify(key));
});
