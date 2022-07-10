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
        async createBand(parent: any, {band}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.bandAPI.create(band);
            return res;
        },
        async updateBand(parent: any, {id, band}: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.bandAPI.update(id, band);
            return res;
        },
        async deleteBand(parent: any, data: any, context: any) {
            if (!context.token) {
                throw new Error('no Token');
            }
            const res = await context.dataSources.bandAPI.remove(data.id);
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

