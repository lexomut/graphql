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

    async create(body: {}): Promise<any> {
        if (!this.context.token) {
            return;
        }
        const result = await this.post('/', body);
        return {...result, id: result._id};
    }

    async update(id: string, body: any): Promise<any> {
        const result = await this.post('/' + id, body);
        return {...result, id: result._id};
    }

    async delete(id: string): Promise<any> {
        if (!this.context.token) {
            return;
        }
        return await this.delete('/' + id);
    }
}
