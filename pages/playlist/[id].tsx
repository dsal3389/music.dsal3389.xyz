import type { NextPage } from 'next'
import { createNotification } from '../../components/notification/notification.component';
import { getPlayBar } from '../../components/play-bar/play-bar.component';
import Song from '../../config/models/song.model';


const Playlists:NextPage = () => {
    const setPlayList = () => {
        const songs:Song[] = [];

        for(let i=0; i < 200; i++){
            if(i % 2){
                songs.push({
                    name: 'youtube',
                    ganer: [],
                    song_id: 'rhTl_OyehF8',
                    platform: 'youtube'
                });
            } else {
                songs.push({
                    name: 'soundcloud',
                    ganer: [],
                    song_id: '388973781',
                    platform: 'soundcloud'
                });
            }
        }

        const added = getPlayBar().setPlaylist('foo', songs);
        if(!added){
            const x = createNotification();
            console.log(x);
        }
    }

    return <button onClick={ setPlayList }>click here</button>
}

export default Playlists;
