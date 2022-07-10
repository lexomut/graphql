import { TrackApi } from './trackApi';

export const trackResolver = {
    Query: {
        tracks: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.trackAPI.getAll();
            return res;
        },
        track: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.trackAPI.getOnce(arg.id);
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
    Track:{
        genres(parent: any, arg: any, {dataSources}: any) {
            return Promise.all(parent.genres.map((id: any) => dataSources.genreAPI.getOnce(id)));
        },
        bands(parent: any, arg: any, {dataSources}: any) {
            return Promise.all(parent.bands.map((id: any) => dataSources.bandAPI.getOnce(id)));
        },

        async artists(parent: any, arg: any, {dataSources}: any) {
            const res = await Promise.all(parent.artists.map((id: any) => dataSources.artistAPI.getOnce(id)));
            return res;
        },

        album: async (parent: any, arg: any, {dataSources}: any) => {
            console.log(parent.id);
            const res = await dataSources.albumAPI.getOnce(parent.id);
            return res;
        }
    }
};

