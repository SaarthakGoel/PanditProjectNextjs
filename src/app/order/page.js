'use client'
import { useSelector } from "react-redux"
import OrderCard from "@/components/ordercard";


export default function OrderPage() {

  const orderData = useSelector((state) => state.userData.orders)
  console.log(orderData);

  return (
    <div className="bg-gray-200 py-10 px-10 md:px-20 lg:px-40">
      <h1 className="text-3xl md:text-5xl font-semibold mb-10">Order History</h1>
      { orderData && orderData.length ? 
        orderData?.slice().reverse()
        .map((order) => {
          return (
            <OrderCard key={order.transactionId} order={order} />
          )
        }) :
        <h1 className="text-4xl text-center font-bold col-span-12 my-32 md:my-48 mx-10">No Orders Yet 😊</h1>
      }
    </div>
  )
}