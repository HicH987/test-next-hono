import { MiddlewareHandler } from 'hono';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = c.req.header('Authorization');
  
  if (token !== 'Bearer my-secret-token-123') {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  await next(); // Proceed to the next handler if authorized
};
