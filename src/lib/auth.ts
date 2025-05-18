import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const checkPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const generateToken = (userId: number) => {
  const access_secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!access_secret) {
    throw new Error('JWT secret is not defined');
  }
  const token = jwt.sign({ userId }, access_secret, { expiresIn: '12h' });
  return token
}
  

