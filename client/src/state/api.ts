import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  /*
  redux
    Above is the headers in action.
    To be able to authenticate for every single route,
    we pass the above authorization token, when we call the backend
      - This is one of the beauties of Redux Toolkit Query
  */

  /*
  testing
    restart server - npm run dev
    client and dynamodb local - already running
    open http://localhost:3000/user/settings
    open inspect -> network
    click "update settings" button of the User Settings page
    observe Status Code: 200 OK
    if it shows 500: server error, below is the solution
  */

  /*
  .env file of server
    # NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y29uY2lzZS1zZWFzbmFpbC04OC5jbGVyay5hY2NvdW50cy5kZXYk
    # Error: Publishable key is missing. Ensure that your publishable key is correctly configured
    CLERK_PUBLISHABLE_KEY=pk_test_Y29uY2lzZS1zZWFzbmFpbC04OC5jbGVyay5hY2NvdW50cy5kZXYk
  */

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.data) {
      result.data = result.data.data;
    } 

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Users"],
  endpoints: (build) => ({

    /* 
    ===============
    USER CLERK
    =============== 
    */
    updateUser: build.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),

    /* 
    ===============
    COURSES
    =============== 
    */

    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }),
});

export const { useUpdateUserMutation, useGetCoursesQuery, useGetCourseQuery } = api;
