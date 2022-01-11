
/**
 * generate a random rgb color value and return it as a valid CSS value
 * rgba(100, 100, 100, .2)
 * 
 * @param alpha 
 * @returns
 */
export function randomColor(alpha=.2): string{
    const rgb = []

    for(let i=0; i < 3; i++){
        rgb.push(Math.floor(Math.random() * 255))
    }

    return `rgba(${ rgb.join(', ') }, ${ alpha })`;
}

/**
 * can be passed to cardComponent as a color, the component will call this function
 * and the function will execute itself every interval time
 * 
 * @param alpha 
 * @param interval
 * @returns 
 */
export function randomRGBCard(alpha?: number, interval=3000): (ref: HTMLDivElement) => void{
    return (ref: HTMLDivElement) => {
        const setRandom = () => {
            const color = randomColor(alpha);
            ref.style.backgroundColor = color;
        }

        setRandom(); // to run it first time without delay 
        setInterval(setRandom, interval);
    }  
}
