import React, { createRef  } from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import memoize from "memoize-one";

import YouTubePlayerComponent, { YouTubeUpdateStates } from './players/youtube/youtube.component';
import Song from '../../config/models/song.model';
import css  from './play-bar.style.module.scss';
import SoundcloudPlayerComponent from './players/soundcloud/soundcloud.component';

interface SerializedSong {
    name: string;
    id: string;
    player: (({}:any) => any) | React.ComponentClass<any>;
    events?: object;
}

interface PlayBarPlayers { 
    youtube: (({}:any) => any) | React.ComponentClass<any>, 
    soundcloud: (({}:any) => any) | React.ComponentClass<any>,
}

interface PlayBarState {
    playlist: SerializedSong[],
    playing: boolean,
    height: number,
    currentSong: number,
}

let __getPlayBar:PlayBar;

/**
 * returns the current running playBar if there is any
 * 
 * @returns 
 */
export function getPlayBar(): PlayBar{
    return __getPlayBar;
}


/**
 * this component can be places anywhere when the component renders,
 * it uses absolute value and always be on the bottom of the site
 */
export default class PlayBar extends React.Component{
    state:PlayBarState = {
        playlist: [],
        playing: false,
        height: 0,
        currentSong: 0 // song index
    };
    players: PlayBarPlayers = {
        youtube: YouTubePlayerComponent,
        soundcloud: SoundcloudPlayerComponent,
    }
    playerRef;
    dragBar;
    currentInterval: any;

    constructor(props: any){
        super(props);
        
        this.playerRef = createRef<HTMLDivElement>();
        this.dragBar   = createRef<HTMLDivElement>();

        __getPlayBar = this;
    }

    componentDidMount(){
        const playbarRef = this.playerRef.current!;

        this.dragBar.current!.onmousedown = (e) => {
            const height = playbarRef.offsetHeight;
            const startDrag = e.pageY;

            document.onmousemove = (e) => {
                e.preventDefault();
                this.setState({ height: (startDrag - e.pageY) + height })
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }

    /* insert a list of songs to start play */
    setPlaylist = (playlist: Song[]) => {
        const serialized = playlist.map(this._serializeSong); // note: use memorize-one
        this.setState({ playlist: serialized, currentSong: 0 });
    }

    /* insert a song to the list */
    addToPlaylist = (song: Song) => {
        const serialized = this._serializeSong(song);
        this.setState({ playlist: this.state.playlist.push(serialized) });
    }

    playNext = () => {
        this.playSong(this.state.currentSong + 1);
    }

    playSong = (index: number) => {
        this.setState({ currentSong: index });
    }

    test = () => {
        this.setPlaylist([
            {
                name: 'foo',
                ganer: [],
                song_id: 'H-0IVL2scXg',
                platform: 'youtube'
            },
            {
                name: 'foo',
                ganer: [],
                song_id: 'adDD43CvrUc',
                platform: 'youtube'
            }
        ]);
    }

    render(): React.ReactNode{
        const song = this.state.playlist[this.state.currentSong];
        const playBarStyle = {
            height: this.state.height
        };

        return (
            <div 
                className={ css.playbar }
                style={ playBarStyle }
                ref={ this.playerRef }
            >
                <div className={ css.expendBtn } ref={ this.dragBar }>
                    <FontAwesomeIcon icon='grip-lines'/>
                </div>

                <button onClick={ this.test }>test</button>
                <div className={ css.playerWindow }>
                    { song ? <song.player id={ song.id } events={ song.events } /> : null }
                </div>
            </div>
        );
    }

    /* Events and private functions */

    onSongReady = (event:any) => {
    }

    onSongError = (event:any) => {
    }

    onYouTubeStateChange = (event:any) => {
        switch(event.data){
            case YouTubeUpdateStates.ENDED:
                return this.playNext();
        }
    }

    private _serializeSong = (song: Song): SerializedSong => {
        const events:any = {
            ready: this.onSongReady,
            error: this.onSongError
        }

        if(song.platform === 'youtube'){
            events['stateChange'] = this.onYouTubeStateChange;
        }

        return { 
            id: song.song_id,
            name: song.name,
            player: this.players[song.platform],
            events: events
        };
    }
}
