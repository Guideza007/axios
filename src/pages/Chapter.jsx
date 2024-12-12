import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Chapter = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course/" + id);
    const data_format = await res.data.data;
    setData(data_format);
  };

  useEffect(() => {
    callApi();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          คลิปวิดิโอการสอน
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((g) => (
            <CourseCard key={g.id} {...g} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <NavLink to="/">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              กลับไปหน้าแรก
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="text-xl font-semibold text-gray-800 mb-4">
        {props.ch_title}
      </div>
      <div className="mb-4">
        <iframe
          className="w-full rounded-lg"
          height="300"
          src={"https://www.youtube.com/embed/" + props.ch_url}
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-between items-center text-gray-600">
        <div>
          <p className="text-sm">จำนวนผู้ชม: {props.ch_view.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm">เวลารวม: {props.ch_timetotal}</p>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
