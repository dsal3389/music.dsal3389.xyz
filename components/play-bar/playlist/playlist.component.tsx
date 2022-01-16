/**
 * the Playlist component is used by the playBarComponent to display the user
 * the current playing list / song, it provides call out prop "onChange" which
 * tells the playBarComponent to which song the user want to listen
 * by providing the index of the song with respect to the given playlist
 * 
 * sometimes the playlist be heavy to render if a lot of songs are passed,
 * so for that, the playlist only render some of the songs
 * with 'react-virtualized' to reduce the overhead
 */
import React from 'react';
import { List } from 'react-virtualized';
import CardComponent from "../../cards/card/card.component";
import PlaceholderComponent from '../../placeholder/placeholder.component';
import css  from "./playlist.style.module.scss";
import Song from "../../../config/models/song.model";

interface PlaylistProps{
    songs: Song[],
    current: number,
    onChange: (i:number) => void,
    height: number,
}

function PlaylistComponent({ songs, current, onChange, height }:PlaylistProps){
    const songsRender = ({
        index, 
        isScrolling,
        isVisible,
        key,
        style,
    }:any):any => {
        let content: JSX.Element = <PlaceholderComponent height='100%' />;

        if(!isScrolling || isVisible){
            const song = songs[index];
            const classNames = (index === current ? css.activeSong : '') +' ' + css.songCard;

            content = <CardComponent 
                    title={ song.name } 
                    description={ 'source: ' + song.platform }
                    className={ classNames }
                    onClick={ () => (current !== index ? onChange(index) : null) }
                />
        }

        return (
            <div key={ key } style={ style }>
                { content }
            </div>
        );
    }

    return (
        <div className={ css.playlist }>
            <List
                width={ 1000 }
                height={ height }
                overscanRowCount={ 5 }
                rowCount={ songs.length }
                rowHeight={ 70 }
                rowRenderer={ songsRender }
                autoWidth={ true }
                autoContainerWidth={ true }
                style={{
                    maxWidth: '100%'
                }}
            />
        </div>
    );
}

export default React.memo(PlaylistComponent);
