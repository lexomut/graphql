import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';


interface Genre {
    _id: string;
    name: string;
    description: string;
    country: string;
    year: string;
}

export class GenreApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/v1/genres';
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
        const result = await this.put('/'+id,body);
        return {...result, id:result._id};
    }

    async remove(id:string):Promise<any> {
        const {deletedCount} = await this.delete('/'+id);
        return deletedCount;
    }
}
