import React, { Fragment, useEffect, useState }  from 'react';
import Image  from 'next/image';
import Link   from 'next/link';
import css    from './header.style.module.scss';
import routes from '../../config/routes/routes';

function HeaderComponent(){
    const [song, setSong] = useState<any>(null);

    useEffect(() => {
        const onSongChange = (e:any) => { 
            const newSong = e.detail;
            setSong({ ...newSong });
        }

        document.addEventListener("onSongChange", onSongChange);
        () => { document.removeEventListener("onSongChange", onSongChange); }
    }, []);

    return (
        <header className={ css.mainHeader }>
            <div className={ css.headerContent }>
                <Link href={ routes.home }>
                    <div className={ css.logo }>
                        <Image src='/music.png' alt='music.dsal3389 img' layout='fill' />
                    </div>
                </Link>
                { song ? 
                    <div className={ css.songInfo }>
                        <p className='text-overflow'>{ song.name }</p>
                        <small className='text-overflow'>by: { song.artists } | platform: { song.platform }</small>
                    </div>
                : null}
            </div>    
        </header>
    );
}

export default React.memo(HeaderComponent);
