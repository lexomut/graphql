import { BandApi } from './bandApi';

export const bandResolver = {
    Query: {
        bands: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.bandAPI.getAll();
            return res;
        },
        band: async (parent: any, arg: any, {dataSources}: any) => {
            const res = await dataSources.bandAPI.getOnce(arg.id);
            return res;
        }
    },
    Mutation: {
        async createBand(parent: any, {data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.bandAPI.create(data);
            return res;
        },
        async updateBand(parent: any, {id, data}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSource.bandAPI.update(id, data);
            return res;
        },
        async deleteBand(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.bandAPI.delete(data);
            return res;
        }
    },
    Band: {
        genres(parent: any, arg: any, {dataSources}: any) {
            return Promise.all(parent.genres.map((id: any) => dataSources.genreAPI.getOnce(id)));
        },
        async   members(parent: any, arg: any, {dataSources}: any) {
            const res = await dataSources.bandAPI.getOnce(parent.id);
            return res.members;
        }
    }
};

