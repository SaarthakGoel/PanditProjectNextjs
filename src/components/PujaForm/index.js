"use client";

import { useState } from "react";

const PujaForm = () => {
  const [date, setDate] = useState("");

  const timeSlots = [
    "6:00 AM - 9:00 AM",
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
    "9:00 PM - 12:00 AM",
  ];

  return (
    <div>
<div className="mb-5">
      <label className="block text-lg text-gray-600 mb-2">Select Date:</label>
      <input
        type="date"
        className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
        min={new Date().toISOString().split("T")[0]} // Restricting past dates
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>


    <div className="mb-5">
          <label className="block text-lg text-gray-600 mb-2">Select Time Slot:</label>
          <select className="w-full border-2 border-gray-300 p-2 rounded focus:border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none">
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
    </div>
    
  );
};

export default PujaForm;
