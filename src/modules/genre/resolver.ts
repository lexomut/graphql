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
        async createGenre(parent: any, {genre}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.create(genre);
            return res;
        },
        async updateGenre(parent: any, {id, genre}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.update(id, genre);
            return res;
        },
        async deleteGenre(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.genreAPI.remove(data.id);
            return res;
        }
    },
    Genre:{}
};

