import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ users }) {
    const center = [28.4595, 77.0266];

    return (
    <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.values(users).map((u) => (
        <Marker key={u.id} position={[u.lat, u.lng]}>
            <Popup>
            User: {u.id}
            </Popup>
        </Marker>
        ))}
    </MapContainer>
    );
}