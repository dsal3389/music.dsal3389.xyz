import React from 'react';
import { List } from 'react-virtualized';
import Song from "../../../config/models/song.model";
import CardComponent from "../../cards/card/card.component";
import PlaceholderComponent from '../../placeholder/placeholder.component';
import css from "./playlist.style.module.scss";

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
        parent,
        style,
    }:any):any => {
        const song = songs[index];
        let content: JSX.Element = <PlaceholderComponent height='100%' />;

        if(!isScrolling || isVisible){
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
