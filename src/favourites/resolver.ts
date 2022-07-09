import { FavouritesApi } from './favouritesApi';

export const favouritesResolver = {
    Query: {
        favouritess: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.favouritesAPI.getAll();
            return res;
        },
        favourites: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.favouritesAPI.getOnce(arg);
            return res;
        }
    },
    Mutation: {
        async createFavourites(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.favouritesAPI.create(data);
            return res;
        },
        async updateFavourites(parent: any, {id, data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSource.favouritesAPI.update(id, data);
            return res;
        },
        async deleteFavourites(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.favouritesAPI.delete(data);
            return res;
        }
    },
};

