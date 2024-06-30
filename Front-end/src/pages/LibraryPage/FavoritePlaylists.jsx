import React from 'react';

const FavoritePlaylists = ({ playlists }) => {
    return (
        <div>
            <h2>Favorite Playlists</h2>
            <ul>
                {playlists?.map(playlist => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritePlaylists;
