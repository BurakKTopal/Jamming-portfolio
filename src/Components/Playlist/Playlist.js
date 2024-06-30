import React from "react";
import './Playlist.css'
import TrackList from "../TrackList/TrackList";

function Playlist({playlistName, playlistTracks, onRemove, onNameChange, onSave}) {
    
    const handleNameChange = ({target}) => {
        onNameChange(target.value);
    }

    console.log(`The playlist tracks are: ${playlistTracks}`)
    return (
    <div className="Playlist">
        <input defaultValue={playlistName} onChange={handleNameChange}/>
        <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
    )
}

export default Playlist;