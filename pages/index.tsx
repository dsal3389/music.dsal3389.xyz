import Head from 'next/head';
import { Fragment } from 'react';

import mongodb from '../mongodb';
import CardComponent from '../components/cards/card/card.component';
import { randomColor, randomRGBCard } from '../utils/random';
import routes   from '../config/routes/routes';
import Playlist from '../config/models/playlist.model';

interface HomeProps{
  playlists: Playlist[]
};

const Home = ({ playlists }: HomeProps) => {
  return (
    <Fragment>
      <Head>
        <title>music | playlists</title>
      </Head>

      <div id='home-page'>
        <div id='home-cards'>
          {
            playlists.map((ps, i) => {
              return (
                <div className='home-card' key={ i }>
                  <CardComponent 
                    title={ ps.name }  
                    description={ ps.description } 
                    link={ routes.playlist(ps.name) }
                    color={ ps.special ? randomRGBCard(.6, 1000) : randomColor(.7) } 
                  />
                </div>
              );
            })
          }
        </div>  
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const mongo = (await mongodb).db();
  const playlists = await mongo.collection('playlists').find({}, { projection: { _id: 0 } }).toArray();

  return {
    props: { playlists },
    revalidate: 3600
  }
}

export default Home
