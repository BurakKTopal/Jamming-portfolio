import './App.css';
import React, { useState, useEffect } from 'react';
import Searchbar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName ] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])

  const addTrack = (track) => {
    if (playlistTracks.filter(t => t.id === track.id).length === 0){
      console.log(`TRACK HAS COME THROUGH: ${track.id}, ${track.name}`)
      setPlaylistTracks(prev => [...prev, track])
      console.log(`The playlistTracks is now: ${playlistTracks}`)
    }
  }

  const removeTrack = (track) => {
    const newPlaylistTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(newPlaylistTracks);
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist  = async () => {
    const trackURIs = playlistTracks.map(track => track.uri)
    await Spotify.savePlaylist(playlistName, trackURIs);
    // Resetting states
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  }

  const search = async (searchTerm) =>{
    setSearchResults(await Spotify.search(searchTerm));
  }

  return (
    <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <Searchbar onSearch ={search}/>
          <div class="App-playlist">
            <SearchResults 
              searchResults={searchResults} 
              onAdd={addTrack}
            />
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
