import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

interface Album {
    id: string;
    name: string;
    released: number;
    artistsIds: string[];
    bandsIds: string[];
    trackIds: string[];
    genresIds: string[];
    image: string;
}

export class AlbumApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3005/v1/albums';
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAll():Promise<any> {
        const all = await this.get('/');
        const result= all.items.map((item:any) => Object.assign({},item, {id:item._id}));
        console.log('result',result);
        return result;

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
