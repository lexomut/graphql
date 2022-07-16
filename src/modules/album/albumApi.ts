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
        const all = await this.get('');
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

    async getOnce(id:string):Promise<any> {
        const item = await this.get('/'+ id);
        return Object.assign(item, {
            id:item._id,
            artists: item.artistsIds,
            bands:  item.bandsIds,
            tracks: item.trackIds,
            genres:  item.genresIds
        });
    }

    async create(body:{}):Promise<any> {
        const item = await this.post('/',body);
        return Object.assign(item, {
            id:item._id,
            artists: item.artistsIds,
            bands:  item.bandsIds,
            tracks: item.trackIds,
            genres:  item.genresIds
        });
    }

    async update(id:string,body:any):Promise<any> {
        const item = await this.put('/'+id,body);
        return Object.assign(item, {
            id:item._id,
            artists: item.artistsIds,
            bands:  item.bandsIds,
            tracks: item.trackIds,
            genres:  item.genresIds
        });
    }

    async remove(id:string):Promise<any> {
        const {deletedCount} = await this.delete('/'+id);
        return deletedCount;
    }
}
