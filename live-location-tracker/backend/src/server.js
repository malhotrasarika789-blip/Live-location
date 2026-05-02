import dotenv from "dotenv";

dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";

import { connectProducer } from "./producers/locationProducer.js";

import { setupSocket } from "./socket/socketHandler.js";

import { startBroadcastConsumer } from "./consumers/broadcastConsumer.js";

import { startDBConsumer } from "./consumers/dbConsumer.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRoutes);

await mongoose.connect(
  process.env.MONGO_URI
);

await connectProducer();

setupSocket(io);

startBroadcastConsumer(io);

startDBConsumer();

server.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server Running on ${process.env.PORT}`
    );
    }
);