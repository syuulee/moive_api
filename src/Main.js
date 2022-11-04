import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import All from './All';
import List from './List';
import Load from './Load';

const Main = ({ genre, limit }) => {
    // 데이터 가져오기
    const [movie, getMovie] = useState([]); //map을 돌릴 수 없다고 뜨기 때문에 초기값을 []배열로 해줌
    const [load, setLoad] = useState(true); // load를 만들어줌...
    const MS = useRef(null);
    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/wathcha.png"
    }
    const movieData = async () => {
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}`);
        // api 주소 넣어주기
        // console.log(movie.data.data.movies);  api 주소 안에서 내가 필요한 데이터를 찾아서 배열로 만들어야함
        getMovie(movie.data.data.movies); //getMovie안에 movie.data.data.movies를 넣어서 movie에 나오게 함
        console.log(movie.data.data.movies);
        setLoad(false);
    }
    useEffect(() => {
        movieData()
    }, []); //genre가 바뀔 때마다..감지


    return (
        <section className='Main'>
            <Outlet />
            {
                load
                    ? <Load />
                    :
                    <Slider
                        slidesToShow={5}
                        arrows={false}
                        ref={MS}
                        centerMode={true}
                        centerPadding={'100px'}
                    >
                        {
                            movie.map(it => {
                                return (
                                    <div key={it.id} className="itm">
                                        <Link to={`/detail/${it.id}`}>
                                            <figure>
                                                <img src={it.large_cover_image} alt={it.title} onError={handleImgError} />
                                            </figure>
                                            <div className="case">
                                                <div className='title'>{it.title_long}</div>
                                                <div className='desc'>{it.description_full.substr(0, 100)} ...</div>
                                                <ul className="genre">
                                                    {
                                                        it.genres.map((g, i) => <li ket={i}>{g}</li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Slider>
            }
            <div className="arrows">
                <i className="xi-arrow-left" onClick={() => MS.current.slickPrev()}></i>
                <i className="xi-arrow-right" onClick={() => MS.current.slickNext()}></i>
            </div>
            <All />
            <List genre='Sci-fi' limit={16} />
            {/* 장르 - 드라마 뿌려줌 */}
            <List genre='Action' limit={16} />
            <List genre='Horror' limit={16} />
        </section >
    )
}

export default Main;