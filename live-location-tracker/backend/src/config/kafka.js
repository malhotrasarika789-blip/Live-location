import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "live-location-app",
    brokers: [process.env.KAFKA_BROKER]
});

export default kafka;