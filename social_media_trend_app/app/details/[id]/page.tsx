"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import Navbar from "@/components/Navbar"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

import html2canvas from 'html2canvas';


export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);

  const [showGraph, setShowGraph] = useState(false);
  const chartRef = useRef(null);


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


  const downloadChartImage = () => {
    if (!chartRef.current) return;

    html2canvas(chartRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'post-stats-chart.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };


  return (
    <div className="h-[100%] mx-auto">
      <Navbar />
      <div className=" flex flex-col">

        <div className="bg-blue-950 min-h-[15vh] md:min-h-[25vh]">
          <div className="text-white flex justify-items-center justify-center pt-3">
            <div className="">{`Post Insights > `}</div>
            <div className="">{data.Text}</div>
          </div>

          {/* <div className="">
            sjfa
          </div> */}

        </div>
        <div className="bg-black text-white h-[100%]">
          <div className="px-6 md:px-16 lg:px-28 pt-11">
            <div className="font-bold text-2xl mb-6">Post content</div>
            <div className="text-gray-300 text-lg mb-10">{data.Text}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-10 text-sm text-white">
              {Object.entries(data).map(([key, value], index) => {
                if (key === "Text") return null; // We've already shown this above
                return (
                  <div key={index}>
                    <div className="text-gray-400 capitalize">{key}</div>
                    <div>{String(value)}</div>
                  </div>
                );
              })}
            </div>

            {/* Optional Like/Retweet Bars */}
            {data.Likes && data.Retweets && (
              <div className="mt-10 space-y-6">
                <div>
                  <div className="text-sm mb-1">Likes</div>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${data.Likes}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm mb-1">Retweets</div>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${data.Retweets}%` }}
                    ></div>
                  </div>
                </div>

                {/* Toggle Graph Button */}
                <div className="mt-10">
                  <button
                    onClick={() => setShowGraph(prev => !prev)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                  >
                    {showGraph ? "Hide Graph" : "Show Graph"}
                  </button>
                </div>

                {/* Graph */}
                {showGraph && (
                  <div className="mt-6 bg-gray-900 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-white text-lg font-semibold">Post Metrics Overview</div>
                      <button
                        onClick={downloadChartImage}
                        className="bg-white text-purple-700 px-3 py-1 rounded hover:bg-purple-100"
                      >
                        Download
                      </button>
                    </div>

                    <div ref={chartRef}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={[
                            { name: "Likes", value: data.Likes },
                            { name: "Retweets", value: data.Retweets },
                            { name: "Impressions", value: data.Impressions },
                            { name: "Shares", value: data.Shares },
                            { name: "Comments", value: data.Comments },
                          ].filter(item => item.value != null)}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#9333ea" radius={[10, 10, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}


              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
