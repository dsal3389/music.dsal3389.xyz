/**
 * this component is only used by the playbar once, and it should render only once,
 * it have no changes after its first render, React.memo will always return true
 * beacause there is no need to check the props or rerender
 */
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "./controls.style.module.scss";

type controllerEvent = "play" | "back" | "next";

interface ControlsProps {
    events:{
        [event in controllerEvent]: (e:any) => void
    }
}

function ControlsComponent({ events }: ControlsProps) {
    return (
        <div className={ css.controller }>
            <div>
                <button onClick={ events.back }>
                    <FontAwesomeIcon icon='step-backward'/>
                </button>
                <button onClick={ events.play }>
                    <FontAwesomeIcon icon='play'/>
                </button>
                <button onClick={ events.next }>
                    <FontAwesomeIcon icon='step-forward'/>
                </button>
            </div>
        </div>
    );
}


/**
 * always return true which tells react to not rerender this component
 */
export default React.memo(
    ControlsComponent, 
    () => true
);
