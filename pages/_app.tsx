import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { library }  from '@fortawesome/fontawesome-svg-core';
import {
  faGripLines, faPlus, faVolumeUp,
  faStepBackward, faStepForward, faPlay, faPause, faMusic
} from '@fortawesome/free-solid-svg-icons';

import PlayBar from '../components/play-bar/play-bar.component';
import '../styles/root.scss'
import HeaderComponent from '../components/header/header.component';

library.add(
  faGripLines, faPlus, faMusic, faVolumeUp,
  faStepBackward, faStepForward, faPlay, faPause
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <div id="topMessage">
        <h2>notice</h2>
        <p>I do not own any listed song on the website, for legal reasons, contact: <span>dsal3389@gmail.com</span></p>
      </div>
      
      <HeaderComponent />

      <div id="main-content-wrapper">
        <Component {...pageProps} />
      </div> 
      
      <PlayBar/>
    </Fragment>
  );
}

export default MyApp
