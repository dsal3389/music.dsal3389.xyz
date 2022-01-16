import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import css from './card.style.module.scss';

interface CardProps {
    title: string,
    description: string,
    color?: string | ((ref:HTMLDivElement) => void),
    link?: string,
    className?: string,
    onClick?: () => void,
};

const CardComponent = ({ title, description, color, link, className='', onClick }: CardProps) => {
    const cardRef = useRef(null);
    const router  = useRouter();
    const handleClick = (e:any) => {
        e.preventDefault();

        // call onClick before routing
        if(onClick){ onClick(); }
        if(link){ router.push(link); }
    }
    
    useEffect(() => {
        const element:HTMLDivElement = cardRef.current!;

        if(typeof color == 'function'){
            color(element);
        } else {
            element.style.backgroundColor = color!;
        }
    }, ['color']); // call useEffect only once

    return (
        <div onClick={ handleClick } className={ css.card + ' ' + className } ref={ cardRef }>
            <div>
                <h2 title={ title } >{ title }</h2>
            </div>    
            <p>{ description }</p>
        </div>
    );
}

export default React.memo(CardComponent);
