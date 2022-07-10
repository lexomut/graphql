import { albumResolver } from './modules/album/resolver';
import { artistResolver } from './modules/artist/resolver';
import { bandResolver } from './modules/band/resolver';
import { favouritesResolver } from './modules/favourites/resolver';
import { genreResolver } from './modules/genre/resolver';
import { trackResolver } from './modules/track/resolver';
import { userResolver } from './modules/users/resolver';

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...artistResolver.Query,
        ...albumResolver.Query,
        ...bandResolver.Query,
        ...trackResolver.Query,
        ...favouritesResolver.Query,
        ...genreResolver.Query

    },
    Mutation: {
        ...userResolver.Mutation,
        ...artistResolver.Mutation,
        ...albumResolver.Mutation,
        ...bandResolver.Mutation,
        ...trackResolver.Mutation,
        ...favouritesResolver.Mutation,
        ...genreResolver.Mutation
    },
    Artist: artistResolver.Artist,
    Band: bandResolver.Band,
    Album: albumResolver.Album,
    Genre:genreResolver.Genre,
    Track:trackResolver.Track,
    Favourites:favouritesResolver.Favourites

};
