import { sendLocationUpdate } from "../producers/locationProducer.js";

const connectedUsers = new Map();

export const setupSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        socket.on("send-location", async (data) => {

            try {

                if (
                    !data.latitude ||
                    !data.longitude
                ) {
                    return;
                }

                const locationData = {
                    userId: socket.id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    timestamp: Date.now()
                };

                connectedUsers.set(socket.id, locationData);

                await sendLocationUpdate(locationData);

            } catch (error) {

                console.log("Socket Error:", error);

            }

        });

        socket.on("disconnect", () => {

            console.log("User Disconnected");

            connectedUsers.delete(socket.id);

            io.emit("user-disconnected", socket.id);

        });

    });

};