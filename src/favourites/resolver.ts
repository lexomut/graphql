export const favouritesResolver = {
    Query: {
        favourites: async (parent: any, arg: any, context: any) => {
            if (!context.token) {
                throw new Error('no Token');
            }
            const result = await context.dataSources.favouritesAPI.getAll();
            return result;
        }
    },
    Mutation: {
        addGenreToFavourites(parent: any, arg: any, context: any) {
            return addFavourites(parent, arg, context, 'genres');
        },
        addArtistToFavourites(parent: any, arg: any, context: any) {
            return addFavourites(parent, arg, context, 'artists');
        },
        addBandToFavourites(parent: any, arg: any, context: any) {
            return addFavourites(parent, arg, context, 'bands');
        },
        addTrackToFavourites(parent: any, arg: any, context: any) {
            return addFavourites(parent, arg, context, 'tracks');
        },

        removeGenreToFavourites(parent: any, arg: any, context: any) {
            return removeFavourites(parent, arg, context, 'genres');
        },
        removeArtistToFavourites(parent: any, arg: any, context: any) {
            return removeFavourites(parent, arg, context, 'artists');
        },
        removeBandToFavourites(parent: any, arg: any, context: any) {
            return removeFavourites(parent, arg, context, 'bands');
        },
        removeTrackToFavourites(parent: any, arg: any, context: any) {
            return removeFavourites(parent, arg, context, 'tracks');
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
            const result = await Promise.all(parent.artists.map((id: any) => dataSources.artistAPI.getOnce(id)));
            return result;
        },
        async tracks(parent: any, arg: any, {dataSources}: any) {
            const result = await Promise.all(parent.tracks.map((id: any) => dataSources.trackAPI.getOnce(id)));
            return result;
        },

    }
};

async function addFavourites(parent: any, {id}: any, context: any, type: string) {
    if (!context.token) {
        throw new Error('no Token');
    }
    const result = await context.dataSources.favouritesAPI.add({id, type});
    return result;
}

async function removeFavourites(parent: any, {id}: any, context: any, type: string) {
    if (!context.token) {
        throw new Error('no Token');
    }
    const result = await context.dataSources.favouritesAPI.remove({id, type});
    return result;
}

