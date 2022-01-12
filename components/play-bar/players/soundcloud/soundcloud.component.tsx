import Script from 'next/script';
import React, { createRef, Fragment } from "react";
import { runInThisContext } from 'vm';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
import css from './soundcloud.style.module.scss';


declare global {
    interface Window { SC: any }
}

type SoundcloudEventTypes = 'ready' | 'stateChange';

interface SoundCloudProps { 
    id: string;
    events: {
        [Event in SoundcloudEventTypes]: (player?:any, event?:any)=> void
    };
}

class SoundcloudPlayerComponent extends React.PureComponent<SoundCloudProps>{
    player:any;
    private iframe;
    
    constructor(props: SoundCloudProps) {
        super(props);
        this.iframe = createRef<HTMLIFrameElement>();
    }

    componentDidMount(){
        this.createPlayer(window.SC);
    }
    
    render(): React.ReactNode {
        return (
            <Fragment>
                <iframe 
                    id='soundcloudPlayerFrame'
                    ref={ this.iframe }
                    className={ css.soundcloudPlayer }
                    width="100%" 
                    height="100%" 
                    scrolling="no"
                    allow="autoplay" 
                    src={ `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.props.id}&color=%23000000&auto_play=true&show_comments=false&show_reposts=false&visual=true` }>
                </iframe>
                <Script 
                    strategy='afterInteractive'
                    src='https://w.soundcloud.com/player/api.js' 
                    onLoad={ () => this.createPlayer(window.SC) }
                />
            </Fragment>    
        );
    }
    
    pause = () => this.player.pause();
    setVolume = (n:number) => this.player.setVolume(n)

    private createPlayer = (player:any) => {
        if(player === undefined) { return }

        this.player = player.Widget(this.iframe.current!.id);
        this.player.bind(player.Widget.Events.READY, () => {
            this.props.events.ready(this);
        });
        this.player.bind(player.Widget.Events.PLAY, () => {
            this.props.events.stateChange(this, {data: PlayerStates.PLAYING, target: this});
        });
        this.player.bind(player.Widget.Events.FINISH, () => {
            console.log('ended soundcloud')
            this.props.events.stateChange(this, {data: PlayerStates.ENDED, target: this});
        });
    }
}

export default SoundcloudPlayerComponent;
