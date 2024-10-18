'use client';
import BhajanCard from "@/components/bhagancard";
import { fetchYTdata, fetchMoreYTdata } from "../api/fetchYTdata/route";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function BhajanPage() {
  const [content, setContent] = useState(true); // Bhajans = true, Favourites = false
  const [finalData, setFinalData] = useState(null);

  const favArr = useSelector((state) => state.userData.favourites);

  // Fetch data only if finalData is not already fetched
  useEffect(() => {
    async function fetchData() {
      if (!finalData) { // Prevent re-fetching when finalData already exists
        const data = await fetchYTdata();
        setFinalData(data);
      }
    }
    fetchData();
  }, [finalData]); // Run only when finalData changes (initially null)

  // Load more items when "Load More" button is clicked
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

  // Toggle to Favourites
  function handleFavClick() {
    setContent(false);
  }

  if (!finalData) {
    return <h1 className="text-5xl text-center my-96 font-bold">Loading...</h1>;
  }

  const bhajanContent = (
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
      <div className="flex justify-center items-center p-2">
        {finalData?.nextPageToken && ( // Only show "Load More" if more data exists
          <button className="rounded-full bg-orange-600 py-3 px-5 text-white mt-14" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </>
  );

  const favContent = (
    <div className="grid grid-cols-12 gap-6">
      {favArr.map((item) => (
        <BhajanCard
          key={item.videoId}
          videoId={item.videoId}
          thumbnail={item.thumbnail}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-200 py-10 px-10 md:px-20">
      <div className="flex justify-center items-center pb-10">
        <div
          onClick={() => setContent(true)}
          className={content ? 'px-10 sm:px-20 md:px-24 lg:px-36 xl:px-48 py-2 bg-white font-semibold' : 'px-10 sm:px-20 md:px-24 lg:px-36 xl:px-48 py-2 bg-orange-600 font-semibold text-white cursor-pointer'}
        >
          Bhajans
        </div>
        <div
          onClick={handleFavClick}
          className={content ? 'px-10 sm:px-20 md:px-24 lg:px-36 xl:px-48 py-2 bg-orange-600 font-semibold text-white cursor-pointer' : 'px-10 sm:px-20 md:px-24 lg:px-36 xl:px-48 py-2 bg-white font-semibold'}
        >
          Favourites
        </div>
      </div>
      {content ? bhajanContent : favContent}
    </div>
  );
}
