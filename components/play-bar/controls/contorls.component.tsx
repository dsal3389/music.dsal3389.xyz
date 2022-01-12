import css from "./controls.style.module.scss";

type controllerEvent = "play" | "pause" | "back" | "next";

interface ControlsProps {
    events?:{
        [event in controllerEvent]: (e:any) => void
    }
}

function ControlsComponent({ events }: ControlsProps) {

    return (
        <div className={ css.controller }>

        </div>
    );
}


export default ControlsComponent;
