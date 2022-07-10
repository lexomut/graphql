import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface Band {
    _id: string;
    name: string;
    origin: string;
    members: Member[];
    website: string;
    genresIds: string[];
}

export type BandQl = {
    id: string
    name: string
    origin: string
    members: Member[]
    website: string
    genres: string[]
}

export interface Member {
    _id:string
    artistId: string
    instrument: string
    years: string[]
}

export class BandApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3003/v1/bands';
    }


    willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getAll(): Promise<Band[]> {
        const {items}:{items:Band[]} = await this.get('/');
        return items.map((item: Band) => {
            return Object.assign(item, {id: item._id, genresIds: item.genresIds, members: item.members.map( member => Object.assign(member,{id:member._id}))});
        });
    }

    async getOnce(id: string): Promise<BandQl> {
        const item: Band = await this.get('/' + id);
        return {
            id: item._id,
            name: item.name,
            origin: item.origin,
            members: item.members.map( member => Object.assign(member,{id:member._id})),
            website: item.website,
            genres: item.genresIds,
        };
    }

    async create(body: {}): Promise<BandQl> {
        const item:Band = await this.post('/', body);
        return {
            ...item,
            id: item._id,
            name: item.name,
            origin: item.origin,
            members: item.members.map( member => Object.assign(member,{id:member._id})),
            website: item.website,
            genres: item.genresIds,
        };
    }

    async update(id: string, body: any): Promise<any> {
        const item:Band = await this.put('/' + id, body);
        return {
            ...item,
            id: item._id,
            name: item.name,
            origin: item.origin,
            members: item.members.map( member => Object.assign(member,{id:member._id})),
            website: item.website,
            genres: item.genresIds,
        };
    }

    async remove(id:string):Promise<any> {
        const {deletedCount} = await this.delete('/'+id);
        return deletedCount;
    }
}
