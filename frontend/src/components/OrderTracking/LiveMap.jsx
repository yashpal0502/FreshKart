import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPinIcon } from "lucide-react";
import { iconsForLeafpad } from "../../assets/assets";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import React from "react";

// Custom delivery truck icon
const truckIcon = new L.Icon({
  iconUrl: iconsForLeafpad.truck,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Destination pin icon
const destinationIcon = new L.Icon({
  iconUrl: iconsForLeafpad.destination,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LiveMap = ({ order, liveLocation }) => {
  // Component to re-center map when location changes
  function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
  }

  // console.log("Shipping Address:", order.shippingAddress);
  // console.log("Live Location:", liveLocation);
  return (
    <>
      {order.status !== "Delivered" && order.status !== "Cancelled" && (
        <div className="relative overflow-hidden rounded-[30px] bg-white shadow-xl border border-app-border">
          {/* Header */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-app-border">
            <div>
              <h2 className="text-xl font-bold text-app-green">
                Live Tracking
              </h2>

              <p className="text-sm text-app-text-light mt-1">
                Track your order in real time
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>

              <span className="text-xs font-semibold text-emerald-700">
                LIVE
              </span>
            </div>
          </div>

          <div className="relative h-[350px]">
            {/* Floating Driver Card */}

            {liveLocation && (
              <div className="absolute left-5 top-5 z-[999] rounded-2xl bg-white/90 backdrop-blur-md shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-app-green text-white flex items-center justify-center font-bold">
                    🚚
                  </div>

                  <div>
                    <p className="font-semibold text-app-green">
                      Delivery Partner
                    </p>

                    <p className="text-xs text-app-text-light">
                      Approaching destination
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Destination Badge */}

            {order.shippingAddress.lat && (
              <div className="absolute right-5 top-5 z-[999] rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-red-500" />

                  <span className="text-xs font-medium">Delivery Address</span>
                </div>
              </div>
            )}

            {/* MAP */}

            {liveLocation && liveLocation.lat != null ? (
              <MapContainer
                center={[liveLocation.lat, liveLocation.lng]}
                zoom={15}
                zoomControl={false}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  position={[liveLocation.lat, liveLocation.lng]}
                  icon={truckIcon}
                >
                  <Popup>Delivery Partner</Popup>
                </Marker>

                {order.shippingAddress.lat && order.shippingAddress.lng && (
                  <Marker
                    position={[
                      order.shippingAddress.lat,
                      order.shippingAddress.lng,
                    ]}
                    icon={destinationIcon}
                  >
                    <Popup>Delivery Address</Popup>
                  </Marker>
                )}

                <MapUpdater center={[liveLocation.lat, liveLocation.lng]} />
              </MapContainer>
            ) : order.shippingAddress.lat ? (
              <MapContainer
                center={[order.shippingAddress.lat, order.shippingAddress.lng]}
                zoom={15}
                zoomControl={false}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  position={[
                    order.shippingAddress.lat,
                    order.shippingAddress.lng,
                  ]}
                  icon={destinationIcon}
                >
                  <Popup>Delivery Address</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-app-green/5 to-app-orange/5">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-app-green/10">
                    <MapPinIcon className="h-10 w-10 text-app-green" />
                  </div>

                  <h3 className="font-semibold text-app-green">
                    Waiting for Location
                  </h3>

                  <p className="mt-2 text-sm text-app-text-light">
                    Your delivery partner hasn't started sharing live location
                    yet.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Info */}

          <div className="flex justify-between items-center px-6 py-4 border-t border-app-border bg-app-cream/30">
            <div>
              <p className="font-semibold text-app-green">Destination</p>

              <p className="text-sm text-app-text-light">
                {order.shippingAddress.label}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-app-green">Status</p>

              <p className="text-sm text-app-orange">{order.status}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveMap;
