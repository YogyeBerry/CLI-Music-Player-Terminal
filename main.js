const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
function showsongs() {
    const songsFolder = path.join(__dirname, "songs");
    const files = fs.readdirSync(songsFolder);
    const songs = [];
    for (let i = 0; i < files.length; i++) {
        if (
            files[i].endsWith(".mp3") ||
            files[i].endsWith(".wav") ||
            files[i].endsWith(".flac") ||
            files[i].endsWith(".m4a")
        ) {
            const fullPath = path.join(songsFolder, files[i]);
            songs.push({
                title: files[i],
                path: fullPath,
                duration: null
            });
        }
    }
    return songs;
}
const songs = showsongs();
let selectedIndex = 0;
let playerProcess = null;
let isPaused = false;
function render() {
    console.clear();
    process.stdout.write("\x1b[H");
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
function playSong(index) {
    const selectedSong = songs[index];
    if (playerProcess) {
        playerProcess.kill();
    }
    isPaused = false
    playerProcess = spawn("afplay", [selectedSong.path]);
    playerProcess.on("close", function () {
        if (!isPaused) {
            if (selectedIndex < songs.length - 1) {
                selectedIndex++;
                render();
                playSong(selectedIndex);
            } else {
                playerProcess = null;
            }
        }
    });
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
        if (playerProcess) {
            playerProcess.kill();
        }
        isPaused = false;
        process.exit();
    }
    if (key === "\u001b[B") {
        if (selectedIndex < songs.length - 1) {
            selectedIndex++;
            render();
        }
    }
    if (key === "\u001b[A") {
        if (selectedIndex > 0) {
            selectedIndex--;
            render();
        }
    }
    if (key === "\r") {
        playSong(selectedIndex);
    }
    if (key === " ") {
        if (playerProcess) {
            if (!isPaused) {
                process.kill(playerProcess.pid, "SIGSTOP");
                isPaused = true;
            } else {
                process.kill(playerProcess.pid, "SIGCONT");
                isPaused = false;
            }
        }
    }
});