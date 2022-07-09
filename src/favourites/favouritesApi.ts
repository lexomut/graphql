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
        return all.items.map((item:any) => Object.assign({},item, {id:item._id}));
    }

    async getOnce(id:string):Promise<any> {
        const result = await this.get('/'+ id);
        return {...result, id:result._id};
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
