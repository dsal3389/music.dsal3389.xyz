
// youtube changeState states, this implemented 
// the the soundcloudplayer component (not by soundcloud itself)
export const playerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
}

export interface AbstractPlayer {
    play: () => void;
    pause: () => void;
    isPaused: () => Promise<boolean>;
    setVolume: (n:number) => void;
}
