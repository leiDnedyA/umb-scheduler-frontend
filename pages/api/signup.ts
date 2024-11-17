
import { NextApiRequest, NextApiResponse } from 'next';
import { db, sqlite } from '@/drizzle';
import { users } from '@/schemas';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Insert new user
    // const newUser = await db.insert(users).values({
    //   email,
    //   hashedPassword
    // });

    const stmt = sqlite.prepare('INSERT INTO users (email, hashed_password) VALUES (?, ?)');
    stmt.run(email, hashedPassword);

    // Return success but don't include password
    return res.status(201).json({ 
      message: 'User created successfully',
      user: {
        email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
