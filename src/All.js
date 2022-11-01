import axios from 'axios'
import React, { useEffect, useState } from 'react'

const All = () => {
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [snum, setSnum] = useState(1);

    const allMovie = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${page}&limit=50`);
        console.log(res.data, res.data.data.movie_count);
        setMovie(res.data.data.movies);
        setTotal(res.data.data.movie_count);
    }

    useEffect(() => {
        allMovie()
    }, [page]);

    const cnum = 50;
    const pnum = 50;

    const listNUm = Array.from({ length: total / 50 });
    console.log(listNUm);


    return (
        <>
            <button onClick={() => setSnum(snum - cnum)}>PREV</button>
            <ul>
                {
                    listNUm.slice(snum, snum + cnum).map((it, idx) => <button onClick={() => setPage(idx + snum + 1)}>{idx + snum + 1}</button>)
                }
            </ul>
            {
                snum > total / pnum - cnum ? null : <button onClick={() => setSnum(snum = cnum)}>NEXT</button>
            }
            <div>
                {
                    movie.map(it =>
                        <li>{it.title}</li>)
                }
            </div>
        </>
    )
}

export default All;