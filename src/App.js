import React, { useState } from 'react'
import List from './List';
import './common.scss'
import { Link, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Glist from './Glist';
import All from './All';
import Detail from './Detail';
import SearchResult from './SearchResult';

const App = () => {
  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Romance",
    "Thriller",
    "Western"
  ];
  const [movie, setMovie] = useState([]);
  return (
    <div>

      <Header>
        <ul className='flex'>
          {
            genreList.map((it, idx) => {
              return (
                <li key={idx}>
                  <Link to={it}>{it}</Link>
                </li>
              )
            })
          }
        </ul>
      </Header>
      <Routes>
        <Route path="/" element={<Main limit={50} />}>
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        {
          genreList.map((it, idx) => {
            return (
              <Route path={it} element={<Glist genre={it} limit={20} />} key={idx}>
                <Route path={`/${it}/:id`} element={<Detail limit={50} />} />
              </Route>
            )
          })
        }

        <Route path="/search" element={<SearchResult limit={50} />}>
          <Route path="/search/:id" element={<Detail />} />
        </Route>

      </Routes>
      {/* <SearchResult /> */}

      {/* <All /> */}


    </div>
  )
}

export default App
