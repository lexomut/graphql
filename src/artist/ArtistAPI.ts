import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class ArtistAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3002/v1/artists';
    }

    willSendRequest(request:RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getArtists() {
        const artist = await this.get('/');
        return artist;
    }


    async create(body:{}) {
        const artist = this.post('/',body);
        return artist;
    }
}
