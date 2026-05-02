import kafka from "../config/kafka.js";

const consumer = kafka.consumer({
    groupId: "db-group"
});

export const startDBConsumer = async () => {

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

            console.log("Saving To DB:", data);

        }

    });

};