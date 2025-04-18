"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "@/components/Navbar"


export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/Social_Media_Trends.xlsx");
      const ab = await res.arrayBuffer();
      const wb = XLSX.read(ab, { type: "buffer" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws);
      setData(json[Number(id)]);
    };

    loadData();
  }, [id]);

  if (!data) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="h-[100%] mx-auto">
      <Navbar />
      <div className=" flex flex-col">

      <div className="bg-blue-950 h-[0.1%] ">
        <div className="text-white flex justify-items-center justify-center">
          <div className="">{`Post Insights > `}</div>
          <div className="">{data.Text}</div>
        </div>
      </div>
      <div className="bg-black text-white h-full">
        <div className="">
          <div className="font-bold">Post Content</div>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-white  flex flex-col sm:flex-row sm:items-center justify-  pb-1">
              <span className="font-semibold ">{key}:</span>
              <span className="">{value?.toString()}</span>
            </div>
          ))}

          </div>
        </div>
      </div>
    </div>
  );
}
