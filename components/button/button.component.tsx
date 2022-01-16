import { PropsWithChildren } from "react";
import css from './button.style.module.scss';

type ButtonStyle = 'round' | 'block';

interface ButtonProps{
    onClick?: () => void,
    bstyle?: ButtonStyle,
    className?: string
}

function ButtonComponent({ onClick, bstyle='block', children, className='' }: PropsWithChildren<ButtonProps>){
    const styles = {
        'block': css.blockStyle,
        'round': css.roundStyle
    };

    return (
        <div onClick={ onClick } className={ css.btn + ' ' + styles[bstyle] + ' ' + className }>
            { children }
        </div>
    );
}

export default ButtonComponent;
