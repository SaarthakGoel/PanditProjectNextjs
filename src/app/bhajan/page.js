'use client';
import BhajanCard from "@/components/bhagancard";
import { fetchYTdata, fetchMoreYTdata } from "../api/fetchYTdata/route";
import { useState, useEffect } from "react";

export default function BhajanPage() {
  const [finalData, setFinalData] = useState({ items: [] }); // Initialized with an empty array

  useEffect(() => {
    async function fetchData() {
      const data = await fetchYTdata();
      setFinalData(data);
    }
    fetchData();
  }, []);

  async function handleLoadMore() {
    if (finalData?.nextPageToken) {
      const moreData = await fetchMoreYTdata(finalData.nextPageToken);
      setFinalData((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...moreData.items], // Append new items
        nextPageToken: moreData.nextPageToken, // Update nextPageToken
      }));
    }
  }

  return (
    <div className="bg-gray-200 py-10 px-20">
      <div>sections</div>
      <div className="grid grid-cols-12 gap-6">
        {finalData?.items?.map((item) => (
          <BhajanCard
            key={item.id.videoId} // You need a unique key here
            thumbnail={item.snippet.thumbnails.high.url}
            title={item.snippet.title}
          />
        ))}
      </div>
      <div>
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}
