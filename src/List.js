import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Load from './Load';

const List = ({ genre, limit }) => {
    // 데이터 가져오기
    const [movie, getMovie] = useState([]); //map을 돌릴 수 없다고 뜨기 때문에 초기값을 []배열로 해줌
    const [load, setLoad] = useState(true); // load를 만들어줌...
    console.log(genre, limit);
    const movieData = async () => {
        setLoad(true);
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&genre=${genre}`);
        // api 주소 넣어주기
        console.log(movie.data.data.movies); // api 주소 안에서 내가 필요한 데이터를 찾아서 배열로 만들어야함
        getMovie(movie.data.data.movies); //getMovie안에 movie.data.data.movies를 넣어서 movie에 나오게 함
        setLoad(false);
    }
    useEffect(() => {
        movieData()
    }, [genre]); //genre가 바뀔 때마다..감지


    return (
        <div>
            {
                load
                    ? <Load />
                    :
                    <ul className='List'>
                        {
                            movie.map(it => {
                                return (
                                    <li key={it.id}>
                                        <figure>
                                            <img src={it.medium_cover_image} alt={it.title} />
                                        </figure>
                                        <div>{it.title}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
            }
        </div>
    )
}

export default List;