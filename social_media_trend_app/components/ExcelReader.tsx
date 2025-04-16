"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  Text: string;
  Sentiment?: string;
  Timestamp?: number;
  User?: string;
  Platform: string;
  Hashtags?: string;
  Retweets?: number;
  Likes?: number;
  Country?: string;
  Year?: number;
  Month?: number;
  Day?: number;
  Hour?: number;
}

export default function ExcelReader() {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Social_Media_Trends.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-3 mx-auto p-4 md:w-[70%] w-[100%]">
      {excelData.map((entry, index) => (
        <div key={index} className="mb-2 p-2 rounded text-white">
            <div className="flex justify-between">

            <div>
          <p> {entry.Platform}</p>
          <p> {entry.Text}</p>
            </div>
            <button className="text-white">...</button>
            </div>
          <div className="w-full h-[2px] bg-white my-4"></div>
        </div>
      ))}
    </div>
  );
}
