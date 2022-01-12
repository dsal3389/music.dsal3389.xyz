import React from "react";
import css from './placeholder.style.module.scss';

interface PlaceholderProps {
    height?: number | string;
}

function PlaceholderComponent({ height='18px' }:PlaceholderProps) {
    return (
        <div className={ css.placeholderBar } style={{ height: height }}>
            <span></span>
        </div>
    );
}

export default React.memo(PlaceholderComponent);
