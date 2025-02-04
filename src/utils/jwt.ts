import jwt, { JwtPayload } from 'jsonwebtoken';


export const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '100d',
  });
};