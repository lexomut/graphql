import { albumResolver } from './album/resolver';
import { artistResolver } from './artist/resolver';
import { userResolver } from './users/resolver';

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...artistResolver.Query,
        ...albumResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...artistResolver.Mutation,
        ...albumResolver.Mutation
    },
};
