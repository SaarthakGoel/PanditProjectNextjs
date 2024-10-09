'use client';
import BhajanCard from "@/components/bhagancard";
import { fetchYTdata, fetchMoreYTdata } from "../api/fetchYTdata/route";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function BhajanPage() {

  const [content, setContent] = useState(true);
  const [finalData, setFinalData] = useState(null);

  const favArr = useSelector((state) => state.userData.favourites)

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

  if (!finalData) {
    return <h1 className="text-5xl text-center my-96 font-bold">Loading...</h1>
  }

  const display1 = (
    <>
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
    </>
  )

  const display2 = (
    <>
      <div className="grid grid-cols-12 gap-6">
        {favArr.map((item) => {
          return (
            <BhajanCard
              key={item.videoId}
              videoId={item.videoId}
              thumbnail={item.thumbnail}
              title={item.title}
              description={item.description}
            />
          )
        }
        )}
      </div>
    </>
  )

  return (
    <div className="bg-gray-200 py-10 px-20">
      <div className="flex justify-center items-center pb-10">
        <div onClick={() => setContent(true)} className="px-48 py-2 bg-white font-semibold">
          Bhajans
        </div>
        <div onClick={() => setContent(false)} className="px-48 py-2 bg-orange-600 font-semibold">
          Favourites
        </div>
      </div>
      {
        content ? display1 : display2
      }
    </div>
  );
}
