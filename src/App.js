import React from 'react'
import List from './List';
import Main from './Main';
import Header from './Header';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './common.scss';
import Glist from './Glist';
import All from './All';


const App = () => {
  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Fantasy",
    "Horror",
    "Mystery",
    "Sci - Fi	",
    "Superhero",
    "Thriller"
  ]

  return (
    < div >

      <Header>
        <ul className="flex">
          {
            genreList.map(it => {
              return (
                <li>
                  <Link to={it}>{it}</Link>
                </li>
              )
            })
          }
        </ul>
      </Header>
      <Routes>
        <Route path="/" element={<Main genre='Adventure' limit={50} />} />
        {
          genreList.map(it => {
            return (
              <Route path={it} element={<Glist genre={it} limit={20} />} />
            )
          })
        }
      </Routes>

      <All />

      <List genre='Sci-fi' limit={20} />
      {/* 장르 - 드라마 뿌려줌 */}
      <List genre='Action' limit={20} />
      <List genre='Horror' limit={20} />
    </ div>
  )
}


export default App;