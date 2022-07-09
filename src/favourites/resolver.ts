export const artistResolver ={
    Query: {
        // users: async (parent: any, arg: any, {dataSources}: any) => dataSources.userAPI.getUser(),
        artists: async (parent: any, arg: any, {dataSources}: any) => await dataSources.artistAPI.getArtists(),
        // jwt: async (parent: any, {email, password}: any, {dataSources}: any) => {
        //     return await dataSources.userAPI.login(email, password);
        // }
    },
    Mutation: {
        // async login(parent: any, {email, password}: any, context: any) {
        //     return await context.dataSources.userAPI.login(email, password);
        // },
        // async register(parent: any, data: any, context: any) {
        //     const res = await context.dataSources.userAPI.register(data);
        //     if (res) {
        //         return {id: res._id, ...res};
        //     }
        // },
    },
};

