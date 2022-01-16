/**
 * this is a simple placeholder component, that is not changing any state or prop,
 * to make sure its not rerendered when parent component change
 * and skip the React.memo checks, it will always return true to React.memo
 */
import React from "react";
import css   from './placeholder.style.module.scss';

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

export default React.memo(PlaceholderComponent, () => true);
