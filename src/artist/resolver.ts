
export const artistResolver = {
    Query: {
        artists: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.artistAPI.getAll();
            return res;
        },
        artist: async (parent: any, arg: any, {dataSources}: any) => {
            const res =    await dataSources.artistAPI.getOnce(arg.id);
            return res;
        }
    },
    Mutation: {
        async createArtist(parent: any, {artist}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.artistAPI.create(artist);
            return res;
        },
        async updateArtist(parent: any, {id, artist}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res =await context.dataSources.artistAPI.update(id, artist);
            return res;
        },
        async deleteArtist(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.artistAPI.remove(data.id);
            return res;
        }
    },
    Artist: {
        bands(parent: any, arg: any, {dataSources}: any) {
            return Promise.all(parent.bands.map((id:any) => dataSources.bandAPI.getOnce(id)) );
        }
    }
};

