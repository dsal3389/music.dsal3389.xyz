import Script from 'next/script';
import React, { createRef, Fragment } from "react";
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
import { AbstractPlayer } from '../shared';
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

class SoundcloudPlayerComponent extends React.PureComponent<SoundCloudProps> implements AbstractPlayer{
    player:any;
    private iframe;
    
    constructor(props: SoundCloudProps) {
        super(props);
        this.iframe = createRef<HTMLIFrameElement>();
    }

    componentDidMount(){
        this.createPlayer(window.SC);
    }

    componentDidUpdate(prevProps:SoundCloudProps){
        if(prevProps.id !== this.props.id){
            this.destroyPlayer();
            this.createPlayer(window.SC);
        }
    }

    componentWillUnmount(){
        this.destroyPlayer();
    }
    
    render(): React.ReactNode {
        return (
            <Fragment>
                <iframe 
                    ref={ this.iframe }
                    className={ css.soundcloudPlayer }
                    width="100%" 
                    height="100%" 
                    scrolling="no"
                    allow="autoplay" 
                    src={ `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.props.id}&color=%23000000&auto_play=true&show_comments=false&show_reposts=false&visual=true&single_active=true` }>
                </iframe>
                <Script 
                    strategy='afterInteractive'
                    src='https://w.soundcloud.com/player/api.js' 
                    onLoad={ () => this.createPlayer(window.SC) }
                />
            </Fragment>    
        );
    }
    
    setVolume = (n:number) => this.player.setVolume(n)
    play  = () => this.player.play();
    pause = () => this.player.pause();
    isPaused = async () => {
        return new Promise<boolean>((resolve, reject) => {
            this.player.isPaused(resolve);
        });
    };

    private createPlayer = (player:any) => {
        if(player === undefined) { return }

        this.player = player.Widget(this.iframe.current);

        this.player.bind(player.Widget.Events.READY, () => {
            this.props.events.ready(this);
        });
        this.player.bind(player.Widget.Events.PLAY, () => {
            this.props.events.stateChange(this, {data: PlayerStates.PLAYING, target: this});
        });
        this.player.bind(player.Widget.Events.FINISH, () => {
            this.props.events.stateChange(this, {data: PlayerStates.ENDED, target: this});
        });
    }

    private destroyPlayer(){
        if(this.player){
            this.player.unbind(window.SC.Widget.Events.READY);
            this.player.unbind(window.SC.Widget.Events.PLAY);
            this.player.unbind(window.SC.Widget.Events.FINISH);
            this.player = null;
        }
    }
}

export default SoundcloudPlayerComponent;
