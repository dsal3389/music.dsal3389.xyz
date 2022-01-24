import React, { useEffect }  from 'react';
import Image  from 'next/image';
import Link   from 'next/link';
import css    from './header.style.module.scss';
import routes from '../../config/routes/routes';
import Song from '../../config/models/song.model';

/**
 * future note, display the current song information up top
 */
function HeaderComponent(){

    useEffect(() => {
        const onSongChange = (e:any) => {
            console.log(e.detail);
        }

        document.addEventListener("onSongChange", onSongChange);
        () => { document.removeEventListener("onSongChange", onSongChange); }
    }, []);

    return (
        <header className={ css.mainHeader }>
            <Link href={ routes.home }>
                <div className={ css.logo }>
                    <Image src='/music.png' alt='music.dsal3389 img' layout='fill' />
                </div>
            </Link>   
        </header>
    );
}

export default React.memo(HeaderComponent);
