import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3004/v1/users';
    }

    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async register(body:{}) {
        const user = this.post('register',body);
        return user;
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
