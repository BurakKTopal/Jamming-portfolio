const redirectToSpotifyAuth = (clientId, redirectUri) => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const responseType = "token"; // Implicit grant flow
    const scopes = "user-read-private user-read-email user-read-private playlist-modify-public playlist-modify-private";
    var state = generateRandomString(16);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", responseType);
    params.append("redirect_uri", redirectUri);
    params.append("scope", scopes);

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);
    window.location.href = url;
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
export default redirectToSpotifyAuth;