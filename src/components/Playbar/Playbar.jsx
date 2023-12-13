import { useContext, useState, useEffect } from 'react';
import { AudioContext } from '../../context/AudioContext';
import style from './playbar.module.scss';
import { Slider, IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';

const TimeControls = () => {
    const {audio, currentTrack} = useContext(AudioContext);
    const { duration } = currentTrack;
    const [currentTime, setCurrentTime] = useState(0);
    const sliderCurrentTime = Math.round(currentTime / duration * 100);
    const formattedCurrentTime = secondsToMMSS(currentTime);
    const handleChangeCurrentTime = (e, value) => {
        const time = Math.round((value / 100) * duration);
        setCurrentTime(time);
        audio.currentTime = time;
    }   
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000)

        return () => {
            clearInterval(timeInterval);
        }
    }, [])
    console.log('Time controls');
    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider onChange={handleChangeCurrentTime} step={1} min={0} max={100} value={sliderCurrentTime}/>
        </>
    )
}

const Playbar = () => {
    const {audio, currentTrack, handleToggleAudio, isPlaying} = useContext(AudioContext);
    const {title, artists, preview, duration } = currentTrack;
    const formattedDuration = secondsToMMSS(duration);

    console.log('Playbar');

    
    const handleChangeCurrentTime = (e, value) => {
        const time = Math.round((value / 100) * duration);
        setCurrentTime(time);
        audio.currentTime = time;
    }   

    return (
        <div className={style.playbar}>
            <img src={preview} alt="" className={style.preview}/>
            <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                {isPlaying ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <div className={style.credits}>
                <h4>{title}</h4>
                <p>{artists}</p>   
            </div>
            <div className={style.slider}>
                <TimeControls></TimeControls>
                <p>{formattedDuration}</p>
            </div>
        </div>
    )
}

export default Playbar;