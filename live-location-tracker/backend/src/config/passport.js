import dotenv from "dotenv";

dotenv.config();

import passport from "passport";

import {
  Strategy as GoogleStrategy
} from "passport-google-oauth20";

passport.use(

  new GoogleStrategy(

    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        "/auth/google/callback"
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      return done(null, {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });

    }

  )

);

passport.serializeUser(
  (user, done) => {
    done(null, user);
  }
);

passport.deserializeUser(
  (user, done) => {
    done(null, user);
  }
);