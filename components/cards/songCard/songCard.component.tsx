import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Song from "../../../config/models/song.model";
import css from "./songCard.style.module.scss";

interface SongCardComponent extends Song{
    addSongToPlaylist: (song:Song) => void;
}

function SongCardComponent({ name, song_id, artists, platform, addSongToPlaylist ,genre=[] }: SongCardComponent){
    const onAddSongToPlaylist = () => addSongToPlaylist({name, song_id, artists, platform, genre});

    return (
        <div className={ css.songCard }>
            <div className={ css.songCardContent }>
                <h4 className="text-overflow">{ name }</h4>
                
                <div className={ css.songDescription }>
                    <p className="text-overflow">artist: { artists }</p>
                </div>    
            </div>
            <button onClick={ onAddSongToPlaylist }>
                <FontAwesomeIcon icon='plus'/>
            </button>
        </div>
    );
}

export default SongCardComponent;
