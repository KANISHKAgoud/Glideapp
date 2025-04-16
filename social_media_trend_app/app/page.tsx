
import Navbar from "@/components/Navbar"
import ExcelReader from "@/components/ExcelReader";



export default function Home() {
  return (
    <div className="h-[100%] w-[100%]">
      <Navbar />
      <div className="bg-black w-[100%]">
        <div className="text-white pt-3.5 md:pt-4 md:flex justify-evenly md:p-0 pl-5 ">
          <div className="text-xl font-bold">
            Post Insights
          </div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <input className="bg-gray-800 text-center rounded-xl md:w-[60%] w-[75%]" type="search" placeholder="search" />
            <button className="bg-purple-700 md:p-2 p-3  rounded-xl">
              ADD
            </button>
          </div>
        </div>

        <div>
        <ExcelReader />
        </div>

        
      </div>
    </div>
  );
}
