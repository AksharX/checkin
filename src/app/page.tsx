"use client";
import { useAuth } from "@/components/hooks/useAuth";
import {
  Course,
  useCourses,
  useStudents,
} from "@/components/hooks/useClassroom";
import { PageLayout } from "@/components/shared/pageLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  return <Layout></Layout>;
}

function Layout() {
  // const { data, status } = useAuth();
  // const { data: courses } = useCourses();
  // const [courseId, setCourseId] = useState<string | null>(null);
  // const { data: students } = useStudents({ courseId });

  return <div></div>;
}
