import React from "react";
import './TrackList.css'
import Track from "../Track/Track";

function TrackList({tracks, onAdd, isRemoval, onRemove}) {
    return (
        <div className="TrackList">
        {tracks?tracks.map(track => 
            <Track 
                key={track.id} 
                track={track} 
                onAdd={onAdd} 
                onRemove={onRemove} 
                isRemoval={isRemoval}
            />):<p>Nothing to display</p>}
        </div>
    );
}
export default TrackList;