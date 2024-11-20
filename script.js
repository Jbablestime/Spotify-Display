// CHANGE THE URL BELOW TO HAVE YOUR DISCORD ID
const url = "https://api.lanyard.rest/v1/users/750454372650975232"

document.addEventListener("DOMContentLoaded", function(){
    const coverImage = document.getElementById('cover');
    const songName = document.getElementById('songName');
    const songInfo = document.getElementById('songInfo');
  
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
  
      if (lanyard.data.spotify) {
        const spotify = lanyard.data.spotify;
        
        coverImage.style.display = "block"
        coverImage.src = spotify.album_art_url;
        songInfo.style.display = "block"
        songName.textContent = spotify.song;
        songInfo.textContent = `By ${spotify.artist} on ${spotify.album}`;
      } else {
        coverImage.style.display = "none"
        songName.textContent = `${discordUsername}'s not currently listening to Spotify`
        songInfo.style.display = "none"
      }
    }
  
    updateLanyardData(); 
    setInterval(updateLanyardData, 15000); 
  });