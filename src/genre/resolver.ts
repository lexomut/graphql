import { GenreApi } from './genreApi';

export const genreResolver = {
    Query: {
        genres: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.genreAPI.getAll();
            return res;
        },
        genre: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.genreAPI.getOnce(arg.id);
            return res;
        }
    },
    Mutation: {
        async createGenre(parent: any, {track}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.create(track);
            return res;
        },
        async updateGenre(parent: any, {id, data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.update(id, data);
            return res;
        },
        async deleteGenre(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.delete(data.id);
            return res;
        }
    },
    Genre:{}
};

