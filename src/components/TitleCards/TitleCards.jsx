import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {


  const cardsRef = useRef();
  // Api


  const [apiData, setapiData] = useState([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjkwYzY3ZWNiYmI0NjhlZThmZWU1MjZmNjBjNTFhOSIsIm5iZiI6MTczMDA0MzUxMy41NTY2MzYsInN1YiI6IjY3MWU1ZDhiZTgzM2Q5MmVmMDYwN2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zT5eQlUEOlH_WGQNokxzIuiROoLg6_8j5Wk8a6f_OAs'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setapiData(res.results))
      .catch(err => console.error(err));
  }, [])

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY

  }

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel)

  }, [])

  return (
    <div>
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="cards-list" ref={cardsRef}>
          {apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/original` + card.poster_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
      </div>

    </div>
  )
}

export default TitleCards
