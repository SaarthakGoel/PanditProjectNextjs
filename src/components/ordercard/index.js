'use client'
import { pujas } from "../../../data"
import Animate4 from "../animations/animate4";


const OrderCard = ({ order }) => {

  const { nowDate, nowTime, orderId, totalAmount, transactionId } = order;

  return (
    <Animate4 cssClass={`bg-white shadow-lg rounded-lg p-6 mb-6`}>
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Order Date: {nowDate}</h2>
          <p className="text-gray-500 text-sm">Time: {nowTime}</p>
        </div>
        <div className="text-right flex items-center">
          <p className="text-lg text-gray-500">Transaction ID: </p>
          <p className="text-gray-700 text-lg font-semibold"> {transactionId}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {orderId.map((puja) => {
          const details = pujas[puja.pujaId];
          return (
            <div key={puja._id} className="col-span-1 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 className=" text-lg font-semibold text-orange-700">{details?.puja_name}</h3>
                <p className="text-sm text-gray-500">Puja Date: {puja.date}</p>
                <p className="text-sm text-gray-500">Time: {puja.time}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">₹ {details?.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <div>
          <h3 className="text-gray-600 text-lg font-semibold">Total Amount</h3>
        </div>
        <div className="text-orange-600 font-bold text-2xl">₹ {totalAmount}</div>
      </div>
    </Animate4>
  );
};

export default OrderCard;