// CHANGE THE URL BELOW TO HAVE YOUR DISCORD ID
const url = "https://api.lanyard.rest/v1/users/750454372650975232"

document.addEventListener("DOMContentLoaded", function(){
    const coverImage = document.getElementById('cover');
    const songName = document.getElementById('songName');
    const songInfo = document.getElementById('songInfo');
	const songDuration = document.getElementById("songDuration");
  
    async function fetchLanyard() { 
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error fetching data:', error);
        coverImage.style.display = "none"
        songName.textContent = `There was an error fetching data from Lanyard`
        songInfo.style.display = "none"
      }
    }
  
    async function updateLanyardData() {
      const lanyard = await fetchLanyard();
      const discordUsername = lanyard.data.discord_user.display_name
      const currentTime = new Date().getTime();
  
      if (lanyard.data.spotify) {
        const spotify = lanyard.data.spotify;

        const songLength = spotify.timestamps.end - spotify.timestamps.start;
        const timeElapsed = currentTime - spotify.timestamps.start;

		// Credit to https://github.com/dustinrouillard
        function msToMinSeconds(millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = Number(((millis % 60000) / 1000).toFixed(0));
          return seconds == 60
            ? minutes + 1 + ":00"
            : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }
        
        coverImage.style.display = "block"
        coverImage.src = spotify.album_art_url;
        songInfo.style.display = "block"
		songDuration.style.display = "block"
        songName.innerHTML = `<a target="_blank" href="https://open.spotify.com/track/${spotify.track_id}" style="text-decoration: none; color: white;">${spotify.song}</a>`;
        songInfo.innerHTML = `By <span style="color: #9A6CA7;">${spotify.artist}</span> on <span style="color: #9A6CA7;">${spotify.album}</span>`;
		songDuration.innerHTML = `<span style="color: #1ED760; background-color: #101010; padding-left: 1.5px; padding-right: 1.5px;">${msToMinSeconds(timeElapsed)}</span> - <span style="color: #1ED760; background-color: #101010; padding-left: 1.5px; padding-right: 1.5px;">${msToMinSeconds(songLength)}</span>`
	} else {
        coverImage.style.display = "none"
        songName.textContent = `${discordUsername}'s not currently listening to Spotify`
        songInfo.style.display = "none"
		songDuration.style.display = "none"
      }
    }
  
    updateLanyardData(); 
    setInterval(updateLanyardData, 5000); 
  });