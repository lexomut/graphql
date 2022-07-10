
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
                console.log('no Token');
                throw new Error('no Token');
            }
            console.log('data',data);
            const res =await context.dataSources.albumAPI.create(data);
            console.log('res',res);
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

