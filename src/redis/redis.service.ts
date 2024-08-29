import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class RedisService {
  /**
   * 通过依赖注入获取 Redis 客户端实例。
   */
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }
  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
