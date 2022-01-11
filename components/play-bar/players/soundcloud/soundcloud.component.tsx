import React from "react";

interface SoundCloudProps { 
    id: string;
    events: any;
}

class SoundcloudPlayerComponent extends React.Component<SoundCloudProps>{
    
    render(): React.ReactNode {
        return (
            <p>I am soundcloud player</p>
        );
    }
}

export default SoundcloudPlayerComponent;
