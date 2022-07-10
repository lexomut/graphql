import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface Favorite {
    _id: string;
    userId: string;
    bandsIds: string[];
    genresIds: string[];
    artistsIds: string[];
    tracksIds: string[];
}

export class FavouritesApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3007/v1/favourites';
    }


    willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAll():Promise<any> {
        const all = await this.get('/');
        return Object.assign(all, {
            id: all._id,
            artists: all.artistsIds,
            bands: all.bandsIds,
            tracks: all.trackIds,
            genres: all.genresIds
        });
    }


    async add(data:any):Promise<any> {
        const item = await this.put('/add',data);
        return {
            ...item,
            id:item._id,
            bands:item.bandsIds,
            genres:item.genresIds,
            artists:item.artistsIds,
            tracks:item.tracksIds,
        };
    }

    async remove(data:any):Promise<any> {
        const item = await this.put('/remove',data);
        return {
            ...item,
            id:item._id,
            bands:item.bandsIds,
            genres:item.genresIds,
            artists:item.artistsIds,
            tracks:item.tracksIds,
        };
    }
}
