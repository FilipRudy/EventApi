import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function encodePassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, saltRounds);
}

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(rawPassword, hashedPassword);
}
