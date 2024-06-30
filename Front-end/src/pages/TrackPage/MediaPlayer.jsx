import React, { useRef, useState } from 'react';
import {
    shuffleOutline,
    playSkipBack,
    play,
    pause,
    playSkipForward,
    repeatOutline,
    micOutline,
    openOutline,
    volumeMediumOutline,
    volumeMuteOutline,
    listOutline,
    closeOutline,
  } from "ionicons/icons";
  import "../styles/main.css";
  import "../styles/play_navbar.css";
  import "../styles/mph.css";
import ReactPlayer from 'react-player';
import { IonIcon } from '@ionic/react';

const MediaPlayer = ({link, duration}) => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] =useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isLoop, setIsLoop] = useState(false);

    const handleProgress = (state) => {
        setPlayedSeconds(state.playedSeconds);
      };
    const playVideo = () => {
        setIsPlaying(!isPlaying)
    };
    const handleMute = () => {
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
        if (parseFloat(e.target.value) === 0) {
          setIsMuted(true);
        } else {
          setIsMuted(false);
        }
      };

      const handleSeek = (e) => {
        const timeline = e.target;
        const rect = timeline.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newPlayed = offsetX / rect.width;
        playerRef.current.seekTo(newPlayed * duration, 'seconds');
        setPlayedSeconds(newPlayed * duration);
      };

      const handleLoop= () => {
          setIsLoop(!isLoop);
      }

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

  return (
   <div id="play_navbar">
        <ReactPlayer 
        ref={playerRef}
        controls={true} 
        playing={isPlaying} 
        url={link} 
        muted={isMuted} 
        volume={volume}
        loop={isLoop}
        onProgress={handleProgress}
        hidden/>
      <div class="play_navbar--mid">
        <div class="audio_control">
          <button>
            <IonIcon icon={shuffleOutline}></IonIcon>
          </button>
          <button>
            <IonIcon icon={playSkipBack}></IonIcon>
          </button>
          <button onClick={playVideo}>
            <IonIcon icon={isPlaying ? (pause) : (play)}></IonIcon>
          </button>
          <button>
            <IonIcon icon={playSkipForward}></IonIcon>
          </button>
          <button>
            <IonIcon
              id="loop_music_items"
              class=""
              icon={repeatOutline}
              onClick={handleLoop}
              style={{ background: isLoop ?  'gray' : 'purple' }}
            ></IonIcon>
          </button>
          <div className="volume-container">
          <div class="btn_volume_icon" onClick={handleMute}>
            <IonIcon
              className="volume_medium_Icon"
              icon={isMuted ? volumeMuteOutline : volumeMediumOutline}
            ></IonIcon>
          </div>
          <div className="volume-slider">
          <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
          </div>
          </div>
          
        </div>

        <div class="audio-player">
          <div class="controls">
            <div class="time">
              <div class="current">{getTimeCodeFromNum(playedSeconds)}</div>
              <div class="timeline" onClick={handleSeek}>
                <div class="progress" style={{ width: `${(playedSeconds / duration) * 100}%` }}></div>
              </div>
              <div class="length">
                {getTimeCodeFromNum(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
