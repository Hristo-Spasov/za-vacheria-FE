import redis from '@/lib/clients/redis';



export async function GET() {
  try {
    await redis.set('test', 'Connected to VPS Redis!', 'EX', 60);
    const value = await redis.get('test');
    return Response.json({ success: true, value });
  } catch (err) {
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
