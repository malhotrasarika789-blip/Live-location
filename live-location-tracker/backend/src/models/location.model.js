import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    userId: String,
    username: String,
    latitude: Number,
    longitude: Number,
    timestamp: Date
});

export default mongoose.model(
    "Location",
    locationSchema
);