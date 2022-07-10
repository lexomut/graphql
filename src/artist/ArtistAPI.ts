import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { ID } from 'graphql-modules/shared/types';
import { BandQl } from '../band/bandApi';

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

type ArtistQl = {
    id: string
    firstName: string
    secondName: string
    middleName: string
    birthDate: string
    birthPlace: string
    country: string
    bands: string[]
    instruments: string[]
}

export class ArtistApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3002/v1/artists';
    }


    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAll():Promise<ArtistQl[]> {
        const {items}:{items:Artist[]} = await this.get('/');
        return items.map((item:Artist) => {
            return Object.assign(item,{id:item._id,bands:item.bandsIds});
        });
    }

    async getOnce(id:string):Promise<ArtistQl> {
        console.log(id);
        const item:Artist = await this.get('/'+ id);
        return Object.assign(item,{id:item._id,bands:item.bandsIds});
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
