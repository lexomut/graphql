import { ApolloServer } from 'apollo-server';
import { ArtistApi } from './artist/ArtistAPI';
import { resolvers } from './resolvers';
import { schemas } from './graphql-types';
import { UserApi } from './users/UserAPI';
import { AlbumApi } from './album/albumApi';
import { GenreApi } from './genre/genreApi';
import { FavouritesApi } from './favourites/favouritesApi';
import { BandApi } from './band/bandApi';
import { TrackApi } from './track/trackApi';
// const typeDefs = gql`
//   type Book {
//         title: String
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;

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

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
