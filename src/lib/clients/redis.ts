import Redis from 'ioredis';

declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}
if (!process.env.REDIS_URL) {
  throw new Error(
    'REDIS_URL is not defined.'
  );
}
const redis = global.redis ?? new Redis(process.env.REDIS_URL,{
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redis.on('error', (err) => {
  console.error('[Redis] Connection error:', err.message);
});

if (process.env.NODE_ENV !== 'production') global.redis = redis;

export default redis;
