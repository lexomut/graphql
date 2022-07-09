import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class GenreApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/v1/genres';
    }


    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getArtists() {
        const artists = await this.get('/');
        return artists.items;
    }


    async create(body:{}) {
        const artist = this.post('/',body);
        return artist;
    }
}
