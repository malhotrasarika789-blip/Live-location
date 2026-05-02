import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { socket } from "../services/socket";

let map;
let markers = {};

export default function Home() {
    useEffect(() => {
    map = L.map("map").setView([28.6139, 77.2090], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Live Tracker"
    }).addTo(map);


    setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("send-location", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        });
    }, 3000);

    socket.on("receive-location", (data) => {
        const { id, latitude, longitude } = data;

        if (!markers[id]) {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        } else {
        markers[id].setLatLng([latitude, longitude]);
        }

        map.setView([latitude, longitude]);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });

    }, []);

    return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}