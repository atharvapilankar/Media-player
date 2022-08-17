console.log("Welcome to Spotify");
// Initialize the variables
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let fwd = document.getElementById('forward');
let bwd = document.getElementById('backward');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songname: "Let Me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songname: "Sod Rahu de", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songname: "Cielo Huma-Huma", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songname: "Mahit-Nahi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songname: "He-pan-Mahit-Nhi", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songname: "Janji Heroes Tonight", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songname: "Janji Heroes tonight-2", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songname: "Evdha vel nhi majhyakade", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songname: "Bagh mahit nhi mala", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songname: "Sod asel kahi tari", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]
songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})
//Handle play/pause clicks 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Add Event Listener
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${(songindex+1)}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('forward').addEventListener('click', () => {
    if (songindex >= 10) {
        songindex = 0;
    }
    else {
        songindex++;
        audioElement.src = `songs/${(songindex)}.mp3`;
        mastersongname.innerText = songs[songindex-1].songname;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        console.log(parseInt(songindex));
    }
})
document.getElementById('backward').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
        console.log(parseInt(songindex));
    }
    else {
        songindex--;
        audioElement.src = `songs/${(songindex)}.mp3`;
        mastersongname.innerText = songs[songindex-1].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        console.log(parseInt(songindex));
    }
})