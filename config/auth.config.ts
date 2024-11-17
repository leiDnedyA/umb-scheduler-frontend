// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/drizzle';
import { eq } from 'drizzle-orm'
import { users } from '@/schemas'
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';

export const pages = {
  signIn: '/login',
  error: '/error'
};

export default withAuth({
  pages,
  secret: process.env.NEXTAUTH_SECRET
});

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
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
    }
  }
};
