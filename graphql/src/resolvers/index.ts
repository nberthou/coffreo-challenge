import merge from 'deepmerge'
import {IResolvers} from "@graphql-tools/utils";
import {resolvers as ScalarResolvers} from 'graphql-scalars';
import RocketResolver from "./Rocket";

const resolvers: IResolvers = merge.all<IResolvers>([
    ScalarResolvers,
   // FeedbackResolver,
    RocketResolver
]);

export default resolvers
