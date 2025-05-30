
export async function POST(req: Request) {
  const { password } = await req.json();
  const correctPassword = '123';
  return new Response(JSON.stringify({ valid: password === correctPassword }));
}