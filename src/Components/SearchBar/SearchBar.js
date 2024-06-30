import React, { useState } from "react";
import './SearchBar.css'


function SearchBar( {onSearch} ) {
    const [searchTerm, setSearchTerm] = useState('')
    const search = () =>{
        onSearch(searchTerm)
    }
    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" value={searchTerm} onChange={(({target}) => setSearchTerm(target.value))}/> 
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}
export default SearchBar;
