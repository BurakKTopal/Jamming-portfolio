import redirectToSpotifyAuth from "./redirectToSpotifyAuth";

const clientId = ""; // Place here your clientId on the developer Spotify portal: https://developer.spotify.com/
const redirectUri = "http://localhost:3000"
var accessToken = ''


const Spotify = {
    getAccessToken: () => {
        const hash = window.location.hash;
            if (hash) {
                const params = new URLSearchParams(hash.substring(1));
                const token = params.get("access_token");
                const expiresIn = parseInt(params.get("expires_in"), 10);
                if (token && !isNaN(expiresIn)) {
                    const expirationDate = new Date();
                    expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
                    accessToken = token;
                    localStorage.setItem("access_token", token);
                    localStorage.setItem("expiration_date", expirationDate.toString());
                    
                    window.history.pushState('', document.title, window.location.pathname);
                }
            } else {
                const storedToken = localStorage.getItem("access_token");
                const storedExpiration = localStorage.getItem("expiration_date");
                if (storedToken && storedExpiration && new Date(storedExpiration) > new Date()) {
                    accessToken = storedToken;
                } else {
                    redirectToSpotifyAuth(clientId, redirectUri);
                }
            }
        },

    search: async (searchQuery) => {
            if (accessToken === '') {
                Spotify.getAccessToken();
            }
            const searchUrl = `https://api.spotify.com/v1/search?type=track&q=q=${encodeURIComponent(searchQuery)}`;
            const result = await fetch(searchUrl, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
        
            console.log(result)
    
            const json_response = await result.json();
            return json_response.tracks.items.map((track) => {
                return( {
                    id:track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri:track.uri 
                });
            })
                
                
        },

    savePlaylist: async (playlistName, trackURIs) => {
        if (!playlistName || trackURIs.length === 0) {
            return;
        }
        console.log(`The current access TOKEN is: ${accessToken};`)
        var userID = ''
        // Fetching the user id of the person
        const baseUrl = "https://api.spotify.com/v1"
        const endpointForUserProfile = "/me";
        const headersForUserProfile = { 
            headers: {
            'Authorization': `Bearer ${accessToken}`}
         }
        var result = await fetch(`${baseUrl}${endpointForUserProfile}`, headersForUserProfile);
        var json_response = await result.json();
        userID = json_response.id;
        console.log(`The user id is: ${userID}`);

        // Creating new playlist
        const endpointToCreatePlaylist = `/users/${userID}/playlists`;
        const headersToCreatePlaylist = { 
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json' },
            body: JSON.stringify({ // Use body instead of data
                name: playlistName,
                public: false
            })
         }
        result = await fetch(`${baseUrl}${endpointToCreatePlaylist}`, headersToCreatePlaylist);
        json_response = await result.json();
        const playlistID = json_response.id;

        // Adding items to the playlist
        const endpointToAddItemsToPlaylist = `/playlists/${playlistID}/tracks`;
        const headersToAddItemsToPlaylist = { 
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json' },
            body: JSON.stringify({ // Use body instead of data
                uris: trackURIs
            })
         }
        result = await fetch(`${baseUrl}${endpointToAddItemsToPlaylist}`, headersToAddItemsToPlaylist);
        json_response = await result.json();
        console.log(json_response);
    }

}

export default Spotify;