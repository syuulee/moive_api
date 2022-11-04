import { cleanup } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Load from './Load';


const Detail = () => {
    const { id } = useParams();
    const [detailMovie, setDetailMovie] = useState({});
    const [load, setLoad] = useState(true);
    const [on, setOn] = useState("");
    const cover = useRef(null);
    const getDetail = async () => {
        setLoad(true);
        const movie = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);

        const detail = movie.data.data.movie;
        setDetailMovie(detail);
        setLoad(false);
        console.log(detail);

        const handleImgError = (e) => {
            e.target.src = process.env.PUBLIC_URL + "/wathcha.png"
        }
    }

    const wheelStop = (e) => {
        e.preventDefault();
        // 마우스 이벤트 막는 거
    }
    useEffect(() => {
        getDetail();
        setOn('');
        cover.current.addEventListener('wheel', wheelStop);
        // return () => {
        //     cover.current.removeEventListener('wheel', wheelStop);
        //     // 리무브이벤트를 해줘야 클린업됨
        // }
    }, [id])
    return (
        <section className={`Detail ${on}`} onClick={() =>
            setOn("on")
        } ref={cover}>
            {
                load ? <Load /> :
                    <div className="inner flex">
                        <div className="img">
                            <figure>
                                <img src={detailMovie.large_cover_image} alt="" onError={handleImgError} />
                            </figure>
                        </div>
                        <div className="desc">
                            <h3>{detailMovie.title}</h3>
                            <p>{detailMovie.description_full.substr(0, 500)} ...</p>
                            <ul>
                                {
                                    detailMovie.genres.map((it, idx) =>
                                        <li key={idx}>{it}</li>
                                    )
                                }
                            </ul>

                            <strong>{detailMovie.year}</strong>
                        </div>
                        <button className='close'>
                            <i className="xi-close"></i>
                        </button>
                    </div>
            }
        </section>
    )
}

export default Detail;