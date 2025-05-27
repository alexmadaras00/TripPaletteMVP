import React, {useState} from 'react';
import search from '../assets/search.png'

function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px'
        }}>
            <span role="img" aria-label="search"><img src={search} alt="search"/></span>
            <input
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{border: 'none', outline: 'none', marginLeft: '5px'}}
            />
        </div>
    );
}

export default SearchBar;