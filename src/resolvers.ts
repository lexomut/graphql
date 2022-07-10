import { albumResolver } from './album/resolver';
import { artistResolver } from './artist/resolver';
import { bandResolver } from './band/resolver';
import { favouritesResolver } from './favourites/resolver';
import { genreResolver } from './genre/resolver';
import { trackResolver } from './track/resolver';
import { userResolver } from './users/resolver';

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
