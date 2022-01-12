import React, { createRef, ReactNode } from 'react';
import YouTubePlayer from 'youtube-player';
import css from './youtube.style.module.scss';

// those events supported by the player component
type youtubeEvents = 'ready' | 'stateChange' | 'error';

interface YouTubeProps {
    id: string,
    events?:{
        [event in youtubeEvents]?: ((player:any, e?: any) => void)
    }
}

class YouTubePlayerComponent extends React.Component<YouTubeProps> {
    containerRef;
    player: any;

    constructor(props: YouTubeProps) {
        super(props);
        this.containerRef = createRef<HTMLDivElement>();
    }

    componentDidMount() {
        this.createPlayer();
    }

    componentDidUpdate(prevProps:YouTubeProps) {
        if(prevProps.id !== this.props.id) {
            this.player.loadVideoById(this.props.id);
        }
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render():ReactNode{
        return (
            <div className={ css.youtubePlayer }>
                <div ref={ this.containerRef }></div>
            </div>    
        );
    }

    pause = () => this.player.pauseVideo();
    setVolume = (n:number) => this.player.setVolume(n);

    private createPlayer() {
        const playerOptions = {
            width: '100%',
            height: '100%',
            videoId: this.props.id,
        };

        this.player = YouTubePlayer(this.containerRef.current!, playerOptions);

        // hooks
        this.player.on('ready', this._onReady);
        this.player.on('stateChange', (e:any) => this.callEvent('stateChange', e));
        this.player.on('error', (e:any) => this.callEvent('error', e))
    }

    private callEvent = async (name: youtubeEvents, event: any) => {
        const eventsHookers = this.props.events;
        const eventHook = eventsHookers ? eventsHookers[name] : undefined

        if(eventHook !== undefined) {
            await eventHook(this, event);
        }
    }

    private _onReady = (event: any) => {
        event.target.playVideo();
        this.callEvent('ready', event);
    }
}

export default React.memo(YouTubePlayerComponent);