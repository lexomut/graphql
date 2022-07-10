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
        const result= all.items.map((item:any) => {
            return Object.assign(item, {
                id:item._id,
                artists: item.artistsIds,
                bands:  item.bandsIds,
                tracks: item.trackIds,
                genres:  item.genresIds
            });
        });
        return result;
    }


    async add(data:any):Promise<any> {
        if (!this.context.token) {
            return;
        }
        const result = await this.put('/add',data);
        return result;
    }

    async remove(data:any):Promise<any> {
        if (!this.context.token) {
            return;
        }
        const result = await this.put('/remove',data);
        return result;
    }
}
