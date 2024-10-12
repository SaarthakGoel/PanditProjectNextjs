import MapWithAddressSelection from "@/components/AddressSelect";
import OneAddress from "@/components/OneAddress";



export default function AddressPage() {
  return (
    <div className="flex gap-10 justify-center items-center bg-gray-200">
      <div>
        <OneAddress />
      </div>
      <div className="text-3xl font-semibold">
        Or
      </div>
      <div>
        <MapWithAddressSelection />
      </div>
    </div>
  )
}