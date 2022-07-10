export const favouritesResolver = {
    Query: {
        favourites: async (parent: any, arg: any, context: any) => {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.favouritesAPI.getAll();
            return res;
        }
    },
    Mutation: {
        async addFavourites(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.favouritesAPI.add(data);
            return res;
        },

        async removeFavourites(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.favouritesAPI.remove(data);
            return res;
        },

    },
    Favourites: {
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
        async tracks(parent: any, arg: any, {dataSources}: any) {
            const res = await Promise.all(parent.tracks.map((id: any) => dataSources.trackAPI.getOnce(id)));
            return res;
        },

    }
};

