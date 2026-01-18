'use client';
import { useAppStore } from "@/providers/store-provider";

const Betslip = () => {
  const { betslip } = useAppStore((state) => state);

  return <div className="w-[300px]">
    <div>
        <p>Selections:</p>
        <div>
            Entries here
        </div>
        <div className="flex flex-col">
            <div className="flex items-center">
                <p>Stawka</p>
                <input type="number" className="ml-2 border p-1 w-20"/>
            </div>
            <div className="flex">
                <p>Kurs całkowity:</p>
                <p>XX.XX</p>
            </div>
            <div className="flex">
                <p>Potencjalna wygrana:</p>
                <p>XXXXXX</p>
            </div>
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Postaw zakład</button>
            </div>
        </div>
    </div>
  </div>;
};

export default Betslip;
