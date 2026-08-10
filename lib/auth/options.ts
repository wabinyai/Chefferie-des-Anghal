import { AuthOptions } from '@auth/core';
import CredentialsProvider from '@auth/core/providers/credentials';
import { compare } from 'bcryptjs';
import dbConnect from '@/lib/db/mongoose';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Courriel', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email.toLowerCase(), archived: false }).select('+passwordHash');
        if (!user) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        if (user.disabled) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user = session.user || {};
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/admin/login'
  }
};
