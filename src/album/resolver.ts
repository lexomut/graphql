
export const albumResolver = {
    Query: {
        albums: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.albumAPI.getAll();
            return res;
        },
        album: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.albumAPI.getOnce(arg.id);
            return res;
        }
    },
    Mutation: {
        async createAlbum(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.albumAPI.create(data.album);
            return res;
        },
        async updateAlbum(parent: any, {id, album}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.albumAPI.update(id, album);
            return res;
        },


        async  deleteAlbum(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.albumAPI.remove(data.id);
            return res;
        }
    },


    Album:{
        async artists(parent: any, arg: any, {dataSources}: any) {
            const res = await Promise.all(parent.artists.map((id: any) => dataSources.artistAPI.getOnce(id)));
            return res;
        },
        async  bands(parent: any, arg: any, {dataSources}: any) {
            const res = await Promise.all(parent.bands.map((id: any) => dataSources.bandAPI.getOnce(id)));
            return res;
        },
        async  tracks(parent: any, arg: any, {dataSources}: any) {
            const res = await Promise.all(parent.tracks.map((id: any) => dataSources.trackAPI.getOnce(id)));
            return res;
        },

        genres(parent: any, arg: any, {dataSources}: any) {
            return Promise.all(parent.genres.map((id: any) => dataSources.genreAPI.getOnce(id)));
        },
    }

};

