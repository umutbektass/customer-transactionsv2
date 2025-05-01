
import CredentialsProvider from "next-auth/providers/credentials";

export  const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email", placeholder: "test@example.com" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials, req) {
      

        const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
        });

        if (res.ok) {
          const data = await res.json()

          const user = {
            id: data.userId,
            name: data.username,
            email: data.email,
          };
          return user;
        } else {
          console.log("Kimlik bilgileri geçersiz (App Router).");
          return null;
        }
      }
    })
  ],

  pages: {
     signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user?.name;
        token.email = user?.email;
      }
      if (trigger === "update") {
        token.accessToken = session.accessToken;
        token.twoFactorEnabled = session.twoFactorEnabled;
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
        session.twoFactorEnabled = token.twoFactorEnabled;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, 
};