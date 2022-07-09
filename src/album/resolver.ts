import { AlbumApi } from './albumApi';

export const albumResolver = {
    Query: {
        albums: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.albumAPI.getAll();
            return res;
        },
        album: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.albumAPI.getOnce(arg);
            return res;
        }
    },
    Mutation: {
        async createAlbum(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.albumAPI.create(data);
            return res;
        },
        async updateAlbum(parent: any, {id, data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSource.albumAPI.update(id, data);
            return res;
        },
        async deleteAlbum(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.albumAPI.delete(data);
            return res;
        }
    },
};

