import { RedisOptions } from "ioredis"

interface SubscribtionsConfig {
    enableWS: boolean
    enableSSE: boolean
}

interface RedisConfig {
    host: string
    port: number
    name: string
    retryStrategy: (times: number) => number
}

export const subscriptionsConfig: SubscribtionsConfig = {
    enableWS: true,
    enableSSE: false
}

export const redisOptions: RedisOptions = {
    host: 'redis',
    port: 6379,
    name: 'graphql',
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};


export default {
    ...subscriptionsConfig,
    redisOptions
}
