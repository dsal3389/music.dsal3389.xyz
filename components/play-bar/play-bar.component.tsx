/**
 * this component is th hart of the site, it is responsible 
 * to play the song, display other components, provide "connection" between
 * component like the controles and the song player, 
 * not play the same songs over and over, bring heigh level
 * api to other components like songPlayers, pause, play, setVolume etc...
 * 
 * this component is called only once accross the website, if another page
 * want to do some actions with it, it should call the getPlayBar function
 */
import React, { createRef  } from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';

import YouTubePlayerComponent    from './players/youtube/youtube.component';
import SoundcloudPlayerComponent from './players/soundcloud/soundcloud.component';
import ControlsComponent from './controls/contorls.component';
import PlaylistComponent from './playlist/playlist.component';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import Song from '../../config/models/song.model';
import css  from './play-bar.style.module.scss';

type BuiltinPlayer = SoundcloudPlayerComponent | YouTubePlayerComponent;

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
    playlistId: string,
    serializedPlaylist: SerializedSong[],
    playlist: Song[],
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
export default class PlayBar extends React.PureComponent{
    state:PlayBarState = {
        playlistId: '',
        serializedPlaylist: [],
        playlist: [],
        playing: false,
        height: 0,
        currentSong: 0 // song index
    };
    players: PlayBarPlayers = {
        youtube: YouTubePlayerComponent,
        soundcloud: SoundcloudPlayerComponent,
    }
    player: BuiltinPlayer | null = null;
    private playerRef;
    private dragBar;
    private playlistContainerRef;

    constructor(props: any){
        super(props);
        
        this.playerRef = createRef<HTMLDivElement>();
        this.dragBar   = createRef<HTMLDivElement>();
        this.playlistContainerRef = createRef<HTMLDivElement>();

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

    getCurrent = () => {
        return this.state.playlist[this.state.currentSong];
    }

    /* 
    insert a list of songs to start play
    the id allows the component to identify if the playlist is already playing,
    the return is a boolean value which indecate if the playlist changed
    */
    setPlaylist = (id: string, playlist: Song[]):boolean => {
        const replace = id !== this.state.playlistId;

        if(replace){
            const serialized = playlist.map(this._serializeSong);
            this.setState({ 
                playlistId: id,
                playlist: playlist,
                serializedPlaylist: serialized, 
                currentSong: 0 
            });
        }

        return replace;
    }

    /* insert a song to the list */
    addToPlaylist = (song: Song) => {
        // dont add if song already in the playlist
        if(this.state.playlist.some(s => s.song_id === song.song_id)){
            return;
        }

        const serialized = this._serializeSong(song);
        this.setState({ 
            playlistId: '',
            playlist: [...this.state.playlist, song],
            serializedPlaylist: [...this.state.serializedPlaylist, serialized],
        });
    }

    togglePausePlay = () => {
        this.player?.isPaused().then((paused:boolean) => {
            if(paused){ this.player!.play(); }
            else { this.player!.pause(); }
        });
    }

    playPrev = () => {
        this.playSong(this.state.currentSong - 1);
    }

    playNext = () => {
        this.playSong(this.state.currentSong + 1);
    }

    /**
     * the playSong function takes an index of the song relative to the playlist,
     * it does not need to check if the song acully exists or not
     * because the render component checks it before rendering 
     * @param index 
     */
    playSong = (index: number) => {
        if(
            index !== this.state.currentSong &&
            index < this.state.serializedPlaylist.length && 
            index >= 0
        ){ this.setState({ currentSong: index }); }
    }

    render(): React.ReactNode{
        const song = this.state.serializedPlaylist[this.state.currentSong];
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
                <div className={ css.playbarContent }>
                    <div className={ css.playerWindow }>
                        { song ? <song.player id={ song.id } events={ song.events } /> : null }
                    </div>

                    <div className={ css.side }>
                        <div className={ css.playlistWindow } ref={ this.playlistContainerRef }>
                            <PlaylistComponent 
                                songs={ this.state.playlist } 
                                current={ this.state.currentSong } 
                                onChange={ this.playSong }
                                height={ this.playlistContainerRef.current?.offsetHeight || 0 }
                            />
                        </div>
                        <div className={ css.controllerBar }>
                            <ControlsComponent 
                                events={{
                                    back: this.playPrev,
                                    play: this.togglePausePlay,
                                    next: this.playNext
                                }}
                            />
                        </div>
                    </div>
                </div>    
            </div>
        );
    }

    onSongReady = (player:BuiltinPlayer) => {
        this.player = player;
        this.player.setVolume(20);
    }

    onSongError = (player:BuiltinPlayer, event:any) => {
    }

    onStateChange = (player:BuiltinPlayer, event:any) => {
        switch(event.data){
            case PlayerStates.ENDED:
                this.player = null;
                return this.playNext();
        }
    }

    private _serializeSong = (song: Song): SerializedSong => {
        const events:any = {
            ready: this.onSongReady,
            stateChange: this.onStateChange,
            error: this.onSongError
        }

        return { 
            id: song.song_id,
            name: song.name,
            player: this.players[song.platform],
            events: events
        };
    }
}
