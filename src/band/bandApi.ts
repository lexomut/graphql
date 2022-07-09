import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface Band {
    _id: string;
    name: string;
    origin: string;
    membersId: Member[];
    website: string;
    genresIds: string[];
}

export interface Member {
    artistId: string
    instrument: string
    years: string[]
}

export class BandApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3003/v1/bands';
    }


    willSendRequest(request:RequestOptions) {
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
