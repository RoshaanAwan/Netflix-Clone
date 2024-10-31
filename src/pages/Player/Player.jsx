import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'



const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setapiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    })

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjkwYzY3ZWNiYmI0NjhlZThmZWU1MjZmNjBjNTFhOSIsIm5iZiI6MTczMDA0MzUxMy41NTY2MzYsInN1YiI6IjY3MWU1ZDhiZTgzM2Q5MmVmMDYwN2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zT5eQlUEOlH_WGQNokxzIuiROoLg6_8j5Wk8a6f_OAs'
        }
    };
    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setapiData(res.results[0]))
            .catch(err => console.error(err));
    }, [])
    return (
        <div className='player'>
            <img src={back_arrow_icon} onClick={() => { navigate(-2) }} alt="" />
            <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width="90%" height="90%" title='trailer' frameBorder='0' allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player
