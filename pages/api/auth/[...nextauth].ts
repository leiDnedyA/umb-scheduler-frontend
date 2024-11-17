import NextAuth from 'next-auth';
import { withAuth } from 'next-auth/middleware';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db, sqlite } from '@/drizzle';
import { eq } from 'drizzle-orm'
import { users } from '@/schemas'
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';

export const pages = {
  signIn: '/login',
  error: '/error'
};

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse({
            email: credentials?.username,
            password: credentials?.password
          });

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          console.log(parsedCredentials.data);
          console.log(credentials)

          const userList = await db.select().from(users);
          console.log(sqlite.prepare(`SELECT * FROM users`).all())
          console.log('userlist', userList)

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user || !user.hashedPassword) return null;
          const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
          if (passwordsMatch) return user;
        }

        return null;
      },
      credentials: {
        username: { label: "email", type: "email", placeholder: "you@email.com" },
        password: { label: "Password", type: "password" }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: any) {
      user;
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  }
};

export default NextAuth(authOptions);
