import React from 'react';
import SquareRender from '../components/SquareRender';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from "ionicons/icons";

const FavoriteTracks = ({ tracks }) => {
    return (
        <div class="topic-item album-hot">
        <div class="tittle">
          <span>Bài hát đã thích</span>
          <a href="">
            <span>Tất cả</span>
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </a>
        </div>

        <div id="all_item-albumHot" class="main_topic-item">
          {tracks
            .map((id) => <SquareRender id={id} />)
            .slice(0, 10)}
        </div>
      </div>
    );
};

export default FavoriteTracks;
