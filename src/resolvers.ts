export const resolvers = {
    Query: {
        users: async (_:any, __:any, { dataSources }:any) => dataSources.userAPI.getUser(),
        artists: async (_:any, __:any, { dataSources }:any) => dataSources.artistAPI.getArtists()
    }
};
