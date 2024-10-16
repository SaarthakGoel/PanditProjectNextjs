'use client'

import { useState } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import 'leaflet-defaulticon-compatibility';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "@/actions";
import { useSession } from "@clerk/nextjs";
import { addAddress } from "@/store/slice/userData-slice";



export default function MapWithAddressSelection() {

  const [selsectedPosition, setSelectedPosition] = useState(null);
  const [name, setName] = useState('')
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("")
  const [isError , setIsError] = useState(false);

  const dispatch = useDispatch();
  const addArr = useSelector((state) => state.userData.address)
  const {session} = useSession();
  const userId = session?.user?.id;

  const getAddressFromCoordinates = async (lat, lon) => {

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);

    const data = await response.json();
    if (data.address) {
      console.log(data.address)
      const street1 = data.address.road || "";
      const city1 = data.address.city || data.address.town || "";
      const state1 = data.address.state || "";
      const postalCode1 = data.address.postcode || "";
      const country1 = data.address.country || "";
      setStreet(street1);
      setCity(city1);
      setState(state1);
      setPostalCode(postalCode1);
      setCountry(country1);
    }
  }

  async function handleAddAddress() {
    const duplicateAddress = addArr.find((item) => item.name === name);

    // If a duplicate is found, set error and return early
    if (duplicateAddress) {
      setIsError(true);
      return;
    }
    dispatch(addAddress({name , street , city , state , country , postalCode}));
    const res = await saveAddress({userId , name , street , city , state , country , postalCode});
    console.log(res.message);
  }


  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition({ lat, lng });
        getAddressFromCoordinates(lat, lng);
      },
    });
    return null;
  }

  return (
      <div>
        <div className=" bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Address
          </h2>
        <MapContainer center={[28.6139, 77.209]} zoom={13} style={{ zIndex : '0', height: '250px', width: '100%' }} >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {selsectedPosition && (
            <Marker position={[selsectedPosition.lat, selsectedPosition.lng]}></Marker>
          )}
          <MapClickHandler />
        </MapContainer>

        {/* Display the selected address */}
            <div className="flex gap-4">
            {/* Address Name */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Address Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="e.g. Home, Office"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {
                isError ? <p>Name should be unique</p> : null
              }
            </div>

            {/* Street */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Street</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            </div>
            <div className="flex gap-4">
            {/* City */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">City</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">State</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            </div>
            <div className="flex gap-4">
            {/* Postal Code */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Postal Code</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Country</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200 disabled:opacity-50"
              onClick={handleAddAddress}
            >
              Save Address
            </button>
        </div>
      </div>
  )
};