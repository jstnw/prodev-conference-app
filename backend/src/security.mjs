import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env['JWT_SECRET']
if (secret === undefined || secret.length === 0) {
  console.error('ERROR: Missing JWT_SECRET environment variable.');
  process.exit(2);
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}

export function decodeToken(token) {
  return jwt.decode(token, secret);
}

export async function authorize(ctx, next) {
  if (ctx.claims === undefined) {
    ctx.status = 401;
    return ctx.body = {
      code: 'INVALID_TOKEN',
      message: 'The token provided is invalid.'
    }
  }
  await next();
}

export async function bearer(ctx, next) {
  const auth = ctx.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) {
    let token = auth.substring(7);
    try {
      ctx.claims = verifyToken(token);
    } catch (e) {
      console.error('INVALID TOKEN!')
      console.error(decodeToken(token));
      console.error(e);
    }
  }
  await next();
}
