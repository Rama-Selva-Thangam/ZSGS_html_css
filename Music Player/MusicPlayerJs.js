document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audioPlayer");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const favButton = document.getElementById("fav");
  const songBar = document.getElementById("song-bar");
  const songName = document.getElementById("song-name");

  const musicTracks = [
    {
      src: "Media/Celebration of Varisu.mp3",
      title: "Celebration Of Varisu",
      favorite: false,
    },
    { src: "Media/Jimikki Ponnu.mp3", title: "Jimikki Ponnu", favorite: false },
    { src: "Media/Naa Ready.mp3", title: "Naa Ready", favorite: false },
    { src: "Media/Ranjithame.mp3", title: "Ranjithame", favorite: false },
  ];

  let currentTrackIndex = 0;

  playButton.addEventListener("click", playMusic);
  pauseButton.addEventListener("click", pauseMusic);
  nextButton.addEventListener("click", nextTrack);
  prevButton.addEventListener("click", prevTrack);
  favButton.addEventListener("click", toggleFavorite);
  songBar.addEventListener("input", updateSongTime);

  function playMusic() {
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  }

  function pauseMusic() {
    audio.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    loadTrack();
  }

  function prevTrack() {
    currentTrackIndex =
      (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    loadTrack();
  }

  function updateSongTime() {
    const percentage = (songBar.value / 100) * audio.duration;
    audio.currentTime = percentage;
  }

  function toggleFavorite() {
    musicTracks[currentTrackIndex].favorite =
      !musicTracks[currentTrackIndex].favorite;
    updateFavoriteIcon();
  }

  function updateFavoriteIcon() {
    const isFavorite = musicTracks[currentTrackIndex].favorite;
    favButton.classList.toggle("favorite", isFavorite);
  }

  function loadTrack() {
    audio.src = musicTracks[currentTrackIndex].src;
    playMusic();
    updateSongTitle();
    updateFavoriteIcon();
  }

  function updateSongTitle() {
    songName.innerText = musicTracks[currentTrackIndex].title;
  }

  audio.addEventListener("timeupdate", updateSongProgress);
  function updateSongProgress() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    songBar.value = percentage;
  }

  loadTrack();
});
