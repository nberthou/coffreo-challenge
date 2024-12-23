import RedisDataSource from "./RedisDataSource";
import config from "../config";
import RocketDataSource from "./RocketDataSource";

const getDataSources = async () => {
    return {
        redis: RedisDataSource.getInstance(config.redisOptions),
        rocket: new RocketDataSource()
    }
}

export default getDataSources
