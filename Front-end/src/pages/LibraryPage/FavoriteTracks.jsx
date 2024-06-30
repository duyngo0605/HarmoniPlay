import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SquareRender from '../components/SquareRender';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from "ionicons/icons";

const FavoriteTracks = ({ tracks }) => {
    const [number,setNumber] = useState(5);
    const handleShowMore = ( ) => {
        setNumber(number+5);
      }

    const navigate =useNavigate();

    const handleDetailTrack = (id) => {
        navigate(`/track/${id}`)
    }
    return (
        <div class="topic-item album-hot">
        <div class="tittle">
          <span>Bài hát đã thích</span>
          <a onClick={handleShowMore}>
            <span>Thêm</span>
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </a>
        </div>

        <div id="all_item-albumHot" class="main_topic-item">
        {tracks
            .map((id) => <div onClick={() => {handleDetailTrack(id)}}><SquareRender id={id} /></div> )
            .slice(0, number)}
        </div>
      </div>
    );
};

export default FavoriteTracks;
