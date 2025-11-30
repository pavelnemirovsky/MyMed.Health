import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/en/login',
    error: '/en/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // User must accept terms and privacy before signing in
      // This is handled on the client side
      return true;
    },
    async jwt({ token, account, user, profile }) {
      // Persist the OAuth access_token and user info to the token
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
      }
      if (user) {
        token.id = user.id;
      }
      if (profile) {
        token.email = profile.email || undefined;
        token.name = profile.name || undefined;
        token.picture = profile.picture || undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true, // Required for NextAuth v5
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

