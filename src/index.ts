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

const users = [
    {
        id: '123456',
        firstName: 'lex',
        lastName: 'omut',
        password: '23456',
        email: 'lex@df.ed'
    },
    {
        id: '12343356',
        firstName: 'lex1',
        lastName: 'omut1',
        password: '234562',
        email: 'le2x@df.ed'
    },
];

const artists = [
    {
        id: '234',
        firstName: '45454grgt',
        middleName: 'rfrghyj',
        birthDate: 'rgthyju',
        birthPlace: 'edfrgthy',
        country: 'defrgh',
        bandsIds: ['drgth'],
        instruments: 'sedfrg'
    }
];




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
        return { token };
    },
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
