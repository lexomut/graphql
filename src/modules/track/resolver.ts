

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

        async createTrack(parent: any, arg: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.trackAPI.create(arg.track);
            return res;
        },
        async updateTrack(parent: any, {id, track}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.trackAPI.update(id, track);
            return res;
        },
        async deleteTrack(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.trackAPI.remove(data.id);
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
            const res = await dataSources.albumAPI.getOnce(parent.id);
            return res;
        }
    }
};

