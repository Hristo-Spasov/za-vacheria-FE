import redis from "@/lib/clients/redis";

const rateLimiter = async (
  scope: string,
  ip: string,
  limit: number = 3,
  time: number = 60
) => {
  const key = `rate-limit:${scope}:${ip}`;
  const now = Date.now();
  const removeTime = now - time * 1000;

  await redis.lpush(key, now.toString());
  await redis.ltrim(key, 0, limit - 1);

  const timestamps = await redis.lrange(key, 0, -1);
  const filtered = timestamps.filter((ts) => parseInt(ts) > removeTime);

  if (filtered.length >= limit) {
    throw new Error(`Too many reports.Try again later.`);
  }

  await redis.expire(key, time);

  return true;
};

export default rateLimiter;
