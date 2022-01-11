import { useEffect, useRef } from 'react';
import Link from 'next/link';
import css  from './card.style.module.scss';

interface CardProps {
    title: string,
    description: string,
    color?: string | ((ref:HTMLDivElement) => void),
    link?: string,
};

const CardComponent = ({ title, description, color, link }: CardProps) => {
    const cardRef = useRef(null);
    
    useEffect(() => {
        const element:HTMLDivElement = cardRef.current!;

        if(typeof color == 'function'){
            color(element);
        } else {
            element.style.backgroundColor = color!;
        }
    }, []); // call useEffect only once

    return (
        <Link href={ link || './' }>
            <div className={ css.card } ref={ cardRef }>
                <h2>{ title }</h2>
                <p>{ description }</p>
            </div>
        </Link>    
    );
}

export default CardComponent;
