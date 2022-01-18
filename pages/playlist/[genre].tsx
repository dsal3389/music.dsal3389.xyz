import { Fragment, useEffect, useState }  from 'react';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WindowScroller, List } from 'react-virtualized';

import SongCardComponent from '../../components/cards/songCard/songCard.component';
import ButtonComponent   from '../../components/button/button.component';
import { getPlayBar }    from '../../components/play-bar/play-bar.component';
import mongodb from '../../mongodb';
import Song    from '../../config/models/song.model';

interface PlaylistsProps {
    songs: Song[]
}

const Playlists = ({ songs }:PlaylistsProps) => {
    const [onClient, setOnClient] = useState(false);
    const router = useRouter();

    const playPlaylist = () => getPlayBar().setPlaylist(router.query.genre as string, songs);
    const playSongNow  = (song:Song) => getPlayBar().unshiftToPlaylist(song);
    const addSongToPlaylist = (song:Song) => getPlayBar().addToPlaylist(song);
    
    const renderSongCard = ({ index, isScrolling, isVisible, key, style }:any) => {
        let content = <p>...</p>

        if(!isScrolling || isVisible){
            const song = songs[index];
            content = <SongCardComponent {...song} addSongToPlaylist={ addSongToPlaylist } playSongNow={ playSongNow } />
        }

        return (
            <div className="songCardContainer" key={ key } style={ style }>
                { content }
            </div>
        );
    }

    useEffect(() => { // for react hydration, allow code only on client side to run
        setOnClient(true);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>music | { router.query.genre }</title>
            </Head>

            { onClient && <WindowScroller>
                    { ({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <div id="genre-page">
                            <div id="btnsContainer">
                                <ButtonComponent className='playlistBtn' onClick={ playPlaylist }>
                                    <FontAwesomeIcon icon='music'/>
                                    <p>play playlist</p>
                                </ButtonComponent>
                            </div>

                            <List 
                                overscanRowCount={ 6 }
                                autoHeight={ true }
                                height={ height }
                                isScrolling={ isScrolling }
                                onScroll={ onChildScroll }
                                scrollTop={ scrollTop }
                                rowCount={ songs.length }
                                rowRenderer={ renderSongCard }
                                rowHeight={ 65 }
                                width={ 2000 }
                                autoContainerWidth={ true }
                                style={{
                                    maxWidth: '100%'
                                }}
                            />
                        </div>    
                    ) }
                </WindowScroller> }
        </Fragment>    
    );
}

export function getStaticPaths(){
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(context:GetStaticPropsContext){
    const genre = context.params!.genre;
    const mong = (await mongodb).db();
    const songs = await mong.collection('songs')
        .find({ genre: genre }, { projection: { '_id': 0 } }).toArray();

    return {
        props: { songs },
        revalidate: 3600
    }
}

export default Playlists;
