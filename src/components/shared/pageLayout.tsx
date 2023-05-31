import { useCourses } from "@/components/hooks/useClassroom";
import { Navbar } from "@/components/shared/navbar";
import { SideBar } from "@/components/shared/sidebar";
import CourseTable from "@/components/tables/courseTable";

export default function PageLayout() {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Navbar></Navbar>
      <SideBar></SideBar>
      <main className="p-4 md:ml-64 h-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 col-span-2">
            <CourseTable />
          </div>
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        </div>
      </main>
    </div>
  );
}
