import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class RedisService {
  /**
   * 通过依赖注入获取 Redis 客户端实例。
   */
  constructor(
    @Inject('REDIUS_CLIENT')
    private readonly redisClient: RedisClientType,
  ) {}
  async hasGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }
  async hasSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const filed in obj) {
      await this.redisClient.hSet(key, filed, obj[filed]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
