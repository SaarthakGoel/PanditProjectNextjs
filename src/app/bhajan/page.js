import { fetchYTdata } from "../api/fetchYTdata/route";


export default async function BhajanPage() {

  const data = await fetchYTdata();
  console.log(data)

  return (
    <div>
      bhajan page
    </div>
  )
}
