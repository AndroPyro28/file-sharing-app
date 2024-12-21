import argon2 from 'argon2';

// Hash a password
export async function hashPassword(password:string) {
  return await argon2.hash(password, {
    type: argon2.argon2id, // Use the Argon2id variant
    memoryCost: 2 ** 16,  // Memory cost in KB (64 MB)
    timeCost: 3,          // Number of iterations
    parallelism: 1,       // Parallelism factor
  });
}

// Verify a password
export async function comparePassword(password:string, hashedPassword:string) {
  return await argon2.verify(hashedPassword, password);
}
