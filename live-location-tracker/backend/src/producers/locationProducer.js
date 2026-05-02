import kafka from "../config/kafka.js";

const producer = kafka.producer();

export const connectProducer = async () => {
    await producer.connect();
    console.log("Kafka Producer Connected");
};

export const sendLocationUpdate = async (data) => {

    await producer.send({
        topic: "location-updates",
        messages: [
            {
                value: JSON.stringify(data)
            }
        ]
    });

};