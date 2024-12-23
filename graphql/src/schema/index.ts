import { readFileSync } from 'fs';
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from 'path';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

const rocketDefs = readFileSync(path.resolve(__dirname, './Rocket.graphql'), { encoding: 'utf-8' });

const typeDefs = mergeTypeDefs([
    scalarTypeDefs,
    rocketDefs,
]);

export default typeDefs;
