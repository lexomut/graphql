import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
export interface Track {
    _id: string;
    title: string;
    albumId: string;
    artistsIds: string[];
    bandsIds: string[];
    duration: number;
    released: number;
    genresIds: string[];
}

export class TrackApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3006/v1/tracks';
    }


    willSendRequest(request:RequestOptions) {
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
                genres:  item.genresIds,
                album:item.albumId
            });
        });
        return result;
    }


    async getOnce(id:string):Promise<any> {
        const item = await this.get('/'+ id);
        return Object.assign(item, {
            id:item._id,
            artists: item.artistsIds,
            bands:  item.bandsIds,
            tracks: item.trackIds,
            genres:  item.genresIds,
            album:item.albumId
        });
    }

    async create(body:{}):Promise<any> {
        if (!this.context.token) {
            return;
        }
        const result = await this.post('/',body);
        return {...result, id:result._id};
    }

    async update(id:string,body:any):Promise<any> {
        const result = await this.post('/'+id,body);
        return {...result, id:result._id};
    }

    async delete(id:string):Promise<any> {
        if (!this.context.token) {
            return;
        }
        return await this.delete('/'+id);
    }
}
