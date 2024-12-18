"use client"

import Loading from "@/components/Loading";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      if (courses) {
        if (id) {
          const course = courses.find((c) => c.courseId === id);
          setSelectedCourse(course || courses[0]);
        } else {
          setSelectedCourse(courses[0]);
        }
      }
    }, [courses, id]);

    if (isLoading) return <Loading />;
    if (isError || !courses) return <div>Failed to fetch courses</div>;

    return <div>Search</div>
};

export default Search