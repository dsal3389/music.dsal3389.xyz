import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from '../cards/card/card.component';

interface NotificationProps {
    verticalPosition: 'top' | 'bottom',
    horizontalPosition: 'left' | 'right',
    header: string,
    description?: string
}

function NotificationComponent({ verticalPosition, horizontalPosition, header, description }: NotificationProps){
    return (
        <div
            style={{
                position: 'absolute',
                padding: '8px 0 0 8px',
                minWidth: '200px',
            }}
        >
            <CardComponent title={ header } description='' color="#333333"/>
        </div>
    );
}

export function createNotification(){
    const comp = React.createElement(NotificationComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'left',
        header: 'foo'
    }, null);
    
    return ReactDOM.render(
        comp,
        document.getElementById('app-overlay')
    )
}

export default NotificationComponent;
