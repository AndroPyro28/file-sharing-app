import bcrypt from 'bcryptjs';

// Hash a password
export async function hashPassword(password: string) {
  const saltRounds = 10; // Number of rounds for salt generation
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Verify a password
export async function comparePassword(password: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}