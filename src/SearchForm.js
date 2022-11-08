import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchForm = () => {
    const [search, setSearch] = useState('');
    const searchForm = e => {
        e.preventDefault();
        navigate(`/?query_term=${search}`)
    }
    return (
        <div>
            <form onSubmit={searchForm}>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                <button>SEARCH</button>
            </form>
        </div>
    )
}
//https://yts.mx/api/v2/list_movies.json?query_term=godfather
export default SearchForm