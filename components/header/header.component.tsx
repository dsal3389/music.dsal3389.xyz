import React  from 'react';
import Image  from 'next/image';
import Link   from 'next/link';
import css    from './header.style.module.scss';
import routes from '../../config/routes/routes';

/**
 * future note, display the current song information up top
 */
function HeaderComponent(){
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
