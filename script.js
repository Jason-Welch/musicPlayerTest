const playlistContainer = document.getElementsByClassName("playlistContainer")[0];
const audioTag = document.getElementsByClassName("audio")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgressBar");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const nowPlayingTag = document.getElementsByClassName("nowPlaying")[0];

const tracks = [
    {trackId: "Music/Nightcore___Sweet_Little_Bumblebee__lyric_video_(256k).mp3", title: "Nightcore___Sweet_Little_Bumblebee"},
    {trackId: "Music/[MMSUB]_To_The_Bone_-_Pamungkas(256k).mp3", title: "Pamungkas___To_The_Bone"},
    {trackId: "Music/Charlie_Puth_-_Cheating_on_You_[Official_Video](256k).mp3", title: "Charlie_Puth_-_Cheating_on_You"},
    {trackId: "Music/Moves_Like_Jagger_-_Maroon_5_(Feat._Christina_Aguilera)_(Lyrics)_🎵(256k).mp3", title: "Maroon_5___Moves_Like_Jagger"}
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        playSong();
    })
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playlistContainer.append(trackTag);
};

let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration); // change 201.48 to 201
    durationText = createMinuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime); // change 201.48 to 201
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeAndDuration = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeAndDuration;
    updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500 / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const minuteTest = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondTest = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteTest + ":" + secondTest;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0){
        playSong();
    } else {
        audioTag.play();
        updatePlayAndPauseButton();
    }
});

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    }
    currentPlayingIndex -= 1;
    playSong();
});

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === tracks.length - 1) {
        return;
    }
    currentPlayingIndex += 1;
    playSong();
});

const playSong = () => {
    const songId = tracks[currentPlayingIndex].trackId;
    audioTag.src = songId;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
    const playingId = tracks[currentPlayingIndex].title;
    nowPlayingTag.textContent ="Now Playing : " + playingId;
};

const updatePlayAndPauseButton = () => {
    if (isPlaying){
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
};