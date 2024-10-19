import MapWithAddressSelection from "@/components/AddressSelect";
import OneAddress from "@/components/OneAddress";



export default function AddressPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center sm:py-28 items-center bg-gray-200">
      <div>
        <OneAddress />
      </div>
      <div className="text-2xl lg:text-3xl font-semibold">
        Or
      </div>
      <div>
        <MapWithAddressSelection />
      </div>
    </div>
  )
}