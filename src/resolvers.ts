import { artistResolver } from './artist/resolver';
import { userResolver } from './users/resolver';

export const resolvers = {
    Query: {...userResolver.Query,...artistResolver.Query},
    Mutation: {...userResolver.Mutation,...artistResolver.Mutation},
};
