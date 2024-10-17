'use client'
import { useSelector } from "react-redux"
import OrderCard from "@/components/ordercard";


export default function OrderPage() {

  const orderData = useSelector((state) => state.userData.orders)
  console.log(orderData);

  return (
    <div className="bg-gray-200 py-10 px-40">
      <h1 className="text-5xl font-semibold mb-10">Order History</h1>
      {
        orderData?.slice().reverse()
        .map((order) => {
          return (
            <OrderCard order={order} />
          )
        })
      }
    </div>
  )
}