import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { ID } from 'graphql-modules/shared/types';

export interface Artist {
    _id: string;
    firstName: string;
    secondName: string;
    middleName: string;
    birthDate: string;
    birthPlace: string;
    country: string;
    bandsIds: string[]
    instruments: string[];
}

export class ArtistAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3002/v1/artists';
    }


    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAll():Promise<Artist[]> {
        const all = await this.get('/');
        return all.items;
    }

    async getOnce(id:string):Promise<Artist> {
        return await this.get('/'+ id);
    }

    async create(body:{}) {
        if (!this.context.token) {
            return; 
        }
        const result: Artist = await this.post('/',body);
        return result;
    }

    async update(body:Artist) {
        if (!this.context.token) {
            return;
        }
        const result = this.post('/'+body._id,body);
        return result;
    }

    async delete(id:string):Promise<any> {
        if (!this.context.token) {
            return;
        }
        return await this.delete('/'+id);
    }
}
