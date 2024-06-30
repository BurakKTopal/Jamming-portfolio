import React from "react";
import './Track.css'

function Track({track, onAdd, onRemove, isRemoval}) {
    const {name, artist, album} = track
    const addTrack = () => {
        if (onAdd) {
        console.log(`From TRACK.js: the next track is added: ${track.id}, ${track.name}`)
        onAdd(track)
        }
    }

    const removeTrack = () => {
        if (onRemove) {
            onRemove(track)
        }
    }

    const renderAction = () => {
        if (isRemoval === true) {
            console.log(`The track in tracklist is: ${track} AND the isremoval is: ${isRemoval}`)

            return (
                <button className="Track-action" onClick={removeTrack}>-</button>
            )
        }
        if (isRemoval === false) {
            return (<button className="Track-action" onClick={addTrack}>+</button>)
        }
    }
    
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist}-{album}</p>
            </div>
           {renderAction()}
        </div>
    )
}

export default Track;