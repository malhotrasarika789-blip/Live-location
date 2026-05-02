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


const PORT = process.env.PORT || 3000;


const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRoutes);

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    console.log("Connecting Kafka Producer...");
    await connectProducer();
    console.log("Kafka Producer Connected");

    setupSocket(io);

    startBroadcastConsumer(io);
    startDBConsumer();


    server.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();