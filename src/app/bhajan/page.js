'use client';
import BhajanCard from "@/components/bhagancard";
import { fetchYTdata, fetchMoreYTdata } from "../api/fetchYTdata/route";
import { useState, useEffect } from "react";

export default function BhajanPage() {
  const [finalData, setFinalData] = useState(null);

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
        items: [...prevData.items, ...moreData.items],
        nextPageToken: moreData.nextPageToken,
      }));
    }
  }

  if(!finalData){
    return <h1 className="text-5xl text-center my-96 font-bold">Loading...</h1>
  }

  return (
    <div className="bg-gray-200 py-10 px-20">
      <div>sections</div>
      <div className="grid grid-cols-12 gap-6">
        {finalData?.items?.map((item) => (
          <BhajanCard
            key={item.id.videoId}
            videoId={item.id.videoId}
            thumbnail={item.snippet.thumbnails.high.url}
            title={item.snippet.title}
            description={item.snippet.description}
          />
        ))}
      </div>
      <div>
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}
