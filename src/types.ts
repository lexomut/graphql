import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
const { print } = require('graphql');


const typesArray = loadFilesSync(path.join(__dirname, '.'), { recursive: true,extensions: ['graphql'] });
export const schemas = print(mergeTypeDefs(typesArray)) ;


