import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faMusic, faList, faGripLines } from '@fortawesome/free-solid-svg-icons'

import PlayBar from '../components/play-bar/play-bar.component';
import '../styles/root.scss'

library.add(
  faMusic, faList, faGripLines
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <div id="main-content-wrapper">
        <Component {...pageProps} />
      </div>  
      <PlayBar/>
    </Fragment>
  );
}

export default MyApp
