"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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
    <div className="p-4 ">
      <div className="space-y-2">
    
      {Object.entries(data).map(([key, value]) => (
      <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between  pb-1">
        <span className="font-semibold text-gray-700">{key}:</span>
        <span className="text-gray-900">{value?.toString()}</span>
      </div>
    ))}
      </div>
    </div>
  );
}
