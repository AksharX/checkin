import { useAuth } from "@/components/hooks/useAuth";
import { use } from "react";
import useSWR from "swr";

async function getCourses(url: string, token: string): Promise<Course[]> {
  console.log(url, token);
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  console.log(data.courses);
  return data.courses || [];
}

async function getStudents(url: string, token: string): Promise<Student[]> {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  console.log(data.courses);
  return data.students || [];
}

export function useCourses() {
  const { data } = useAuth();
  return useSWR(
    data?.accessToken
      ? ["https://classroom.googleapis.com/v1/courses", data.accessToken]
      : null,
    ([url, token]) => getCourses(url, token)
  );
}

export interface useStudentProps {
  courseId?: string | null;
}
export function useStudents({ courseId }: useStudentProps) {
  const { data } = useAuth();

  return useSWR(
    courseId && data?.accessToken
      ? [
          `https://classroom.googleapis.com/v1/courses/${courseId}/students`,
          data.accessToken,
        ]
      : null,
    ([url, token]) => getStudents(url, token)
  );
}

export interface Course {
  id: string;
  name: string;
  section: string;
  descriptionHeading: string;
  room: string;
  ownerId: string;
  creationTime: Date;
  updateTime: Date;
  enrollmentCode: string;
  courseState: string;
  alternateLink: string;
  teacherGroupEmail: string;
  courseGroupEmail: string;
  teacherFolder: TeacherFolder;
  guardiansEnabled: boolean;
  calendarId: string;
  gradebookSettings: GradebookSettings;
}

export interface GradebookSettings {
  calculationType: string;
  displaySetting: string;
}

export interface TeacherFolder {
  id: string;
  title: string;
  alternateLink: string;
}
export interface Student {
  courseId: string;
  userId: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  name: Name;
  permissions: Permission[];
}

export interface Name {
  givenName: string;
  familyName: string;
  fullName: string;
}

export interface Permission {
  permission: string;
}
