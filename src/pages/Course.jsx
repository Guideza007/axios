import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course");
    const data_format = await res.data.data;

    // เก็บข้อมูลที่อ่านได้ใส่ State
    setData(data_format);
  };

  //
  useEffect(() => {
    // call api เมื่อมีการเปิด component ครั้งแรก
    callApi();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          หลักสูตรการสอนทั้งหมด
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
      <div className="h-56 rounded-t-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={props.picture}
          alt={props.title}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {props.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{props.detail}</p>
        <NavLink
          to={"/course/" + props.id}
          className="block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-2 rounded-md hover:from-blue-600 hover:to-indigo-600 transition"
        >
          ดูเนื้อหาในหลักสูตร
        </NavLink>
      </div>
    </div>
  );
};

export default Course;
