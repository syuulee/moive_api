import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import Load from './Load';

const SearchResult = () => {
    const [query, setQuery] = useSearchParams();
    const searchItm = query.get('query_term');
    console.log(searchItm);
    const [movie, setMovie] = useState({});
    const [load, setLoad] = useState(true);
    const [page, setPage] = useState(1);
    const [snum, setSnum] = useState(1);
    const [total, setTotal] = useState(0);
    const getMovie = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchItm}&limit=50&page=${page}`);
        setMovie(res.data.data);
        setTotal(res.data.data.movie_count)
        console.log(res.data.data)
        setLoad(false)
    }
    useEffect(() => {
        setLoad(true)
        getMovie();
    }, [query, page]);

    const pnum = 50;

    const listNUm = Array.from({ length: total / pnum + 1 });


    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/cover.jpg";
    }

    return (

        <section className='Search sec'>
            <Outlet />
            <h3>{total}개의 영화가 있습니다.</h3>
            {
                load ? <Load />
                    : <div>
                        <ul className='grid'>
                            {/* <div>{total}</div> */}
                            {
                                movie ? movie.movies?.map(it => {
                                    return (
                                        <li className='itm'>
                                            <Link to={`/search/${it.id}?query_term=${searchItm}&limit=50&page=${page}`}>
                                                <figure>
                                                    <img src={it.medium_cover_image} alt={it.title} onError={handleImgError} />
                                                </figure>
                                                <div className="case">
                                                    <div className='desc'>{it.title}</div>
                                                </div>
                                            </Link>
                                        </li>

                                    )
                                }) : <>검색결과가 없습니다.</>
                            }
                        </ul>
                        <ul className='inner btn'>
                            <li>
                                {
                                    listNUm.map((it, idx) => <button onClick={() => setPage(idx + snum)}
                                        key={idx}>{idx + snum}</button>)
                                }
                            </li>

                        </ul>
                    </div>
            }
        </section>
    )
}

export default SearchResult