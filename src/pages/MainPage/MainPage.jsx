import React, {useState} from "react"
import tracksList from '../../assets/tracksList'
import style from './mainPage.module.scss'
import Track from '../../components//Track/Track.jsx'
import { Input } from "@mui/material"

const runSearch = (query) => {
    if (!query) {
        return tracksList;
    }

    const lwCaseQuery = query.toLowerCase();

    return tracksList.filter((track) => track.title.toLowerCase().includes(lwCaseQuery) || track.artists.toLowerCase().includes(lwCaseQuery))
}

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList);
    const handleChange = (e) => {
        const foundsTracks = runSearch(e.target.value)
        setTracks(foundsTracks);
    }

    return (
        <div className={style.search}>
            <Input className={style.input} placeholder="Поиск треков" onChange={handleChange}></Input>
            <div className={style.list}>
                {tracks.map((track) => (
                    <Track key={track.id} {...track}/>
                ))}
            </div>
        </div>
    )
}

export default MainPage