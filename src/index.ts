import { ApolloServer } from 'apollo-server';
import { ArtistAPI } from './artist/ArtistAPI';
import { resolvers } from './resolvers';
import { schemas } from './types';
import { UserAPI } from './users/UserAPI';
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
            userAPI: new UserAPI(),
            artistAPI: new ArtistAPI(),
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
