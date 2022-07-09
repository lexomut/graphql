import { TrackApi } from './trackApi';

export const trackResolver = {
    Query: {
        tracks: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.trackAPI.getAll();
            return res;
        },
        track: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.trackAPI.getOnce(arg);
            return res;
        }
    },
    Mutation: {
        async createTrack(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.trackAPI.create(data);
            return res;
        },
        async updateTrack(parent: any, {id, data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSource.trackAPI.update(id, data);
            return res;
        },
        async deleteTrack(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.trackAPI.delete(data);
            return res;
        }
    },
};

