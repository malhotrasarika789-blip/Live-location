import kafka from "../config/kafka.js";

const consumer = kafka.consumer({
    groupId: "socket-group"
});

export const startBroadcastConsumer = async (io) => {

    await consumer.connect();

    await consumer.subscribe({
        topic: "location-updates",
        fromBeginning: true
    });

    await consumer.run({

        eachMessage: async ({ message }) => {

            const data = JSON.parse(
                message.value.toString()
            );

            io.emit("receive-location", data);

        }

    });

};