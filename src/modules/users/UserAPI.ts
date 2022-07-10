import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';


export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export class UserApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3004/v1/users';
    }

    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);//`Bearer ${this.context.token}`);
    }

    async register(body:User) {
        const user = this.post('register',body);
        return user;
    }

    async login(email:string, password:string) {
        const data = await this.post('/login',{email,password});
        return data.jwt;
    }


    async getOnce(id: string): Promise<User> {
        return await this.get('/' + id);
    }


    // async getMostViewedMovies(limit = 10) {
    //     const data = await this.get('movies', {
    //         // Query parameters
    //         per_page: limit,
    //         order_by: 'most_viewed',
    //     });
    //     return data.results;
    // }
}
