
export default interface Song{
    name: string;
    song_id: string;
    genre: string[];
    artists: string[] | string;
    platform: 'youtube' | 'soundcloud';
}
