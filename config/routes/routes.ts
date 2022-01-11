
const routeNames = {
    playlist: 'playlist'
}

export default {
    home: '/',
    playlist: (name: string) => `${routeNames.playlist}/${name}`
}
