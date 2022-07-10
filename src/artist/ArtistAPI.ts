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
        const item: Artist = await this.post('/',body);
        return Object.assign(item,{id:item._id,bands:item.bandsIds});
    }

    async update(id:string, data:any) {
        const item:Artist = await this.put('/'+id,data);
        return Object.assign(item,{id:item._id,bands:item.bandsIds});
    }

    async remove(id:string):Promise<any> {
        const {deletedCount} = await this.delete('/'+id);
        return deletedCount;
    }
}
