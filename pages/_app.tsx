import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { library }  from '@fortawesome/fontawesome-svg-core';
import {
  faGripLines,
  faStepBackward, faStepForward, faPlay, faPause
} from '@fortawesome/free-solid-svg-icons';

import PlayBar from '../components/play-bar/play-bar.component';
import '../styles/root.scss'

library.add(
  faGripLines,
  faStepBackward, faStepForward, faPlay, faPause
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <div id="app-overlay"></div>
      <div id="main-content-wrapper">
        <Component {...pageProps} />
      </div> 
      <PlayBar/>
    </Fragment>
  );
}

export default MyApp
