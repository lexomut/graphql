import { userResolver } from './users/resolver';

export const resolvers = {
    Query: {...userResolver.Query},
    Mutation: {...userResolver.Mutation},
};
