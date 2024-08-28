import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIUS_CLIENT',
      useFactory: async () => {
        const client = await createClient().connect();
        console.log('client', client);
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
