"use client";

import { Course, useCourses } from "@/components/hooks/useClassroom";
import ModalComponent from "@/components/modals/modalComponent";

export default function CourseTable() {
  const { data: courses = [] } = useCourses();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Google Course Rooms
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Import students from Google Classroom to create a new class.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Course Name
            </th>
            <th scope="col" className="px-6 py-3">
              Room
            </th>
            <th scope="col" className="px-6 py-3">
              Section
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const { name, room, section } = course;
            return (
              <tr
                key={course.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{room}</td>
                <td className="px-6 py-4">{section}</td>
                <td className="px-6 py-4 text-right">
                  <ModalComponent></ModalComponent>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
