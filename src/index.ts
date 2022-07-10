import { ApolloServer } from 'apollo-server';
import { ArtistApi } from './modules/artist/ArtistAPI';
import { resolvers } from './resolvers';
import { schemas } from './graphql-types';
import { UserApi } from './modules/users/UserAPI';
import { AlbumApi } from './modules/album/albumApi';
import { GenreApi } from './modules/genre/genreApi';
import { FavouritesApi } from './modules/favourites/favouritesApi';
import { BandApi } from './modules/band/bandApi';
import { TrackApi } from './modules/track/trackApi';
import 'dotenv/config';

const port = process.env.port ||4000;

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources: () => {
        return {
            userAPI: new UserApi(),
            artistAPI: new ArtistApi(),
            genreAPI: new GenreApi(),
            trackAPI: new TrackApi(),
            bandAPI: new BandApi(),
            albumAPI: new AlbumApi(),
            favouritesAPI: new FavouritesApi()
        };
    },
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        return {token};
    },
});

server.listen(port).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
