/**
 * this component is only used by the playbar once, and it should render only once,
 * it have no changes after its first render, React.memo will always return true
 * beacause there is no need to check the props or rerender
 */
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "./controls.style.module.scss";

type controllerEvent = "play" | "back" | "next" | "volumeChange";

interface ControlsProps {
    events:{
        play: () => void,
        back: () => void,
        next: () => void,
        volumeChange?: (n: number) => void,
    }
}

function ControlsComponent({ events }: ControlsProps) {

    return (
        <div className={ css.controller }>
            <div className={ css.songController }>
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

            
            { events.volumeChange ? 
                // render volume controller only if "volumeChange" event passed
                <div className={ css.volumeController }>
                    <span>
                        <FontAwesomeIcon icon='volume-up' />
                    </span>    
                    <input type='range' min='0' max='100' 
                        onChange={ (e:any) => events.volumeChange!(e.target.value) } />
                </div> : null
            }
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
