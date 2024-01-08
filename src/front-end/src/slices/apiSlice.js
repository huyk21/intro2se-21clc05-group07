import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { logout } from "./authSlice"; // Import the logout action

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

async function baseQueryWithAuthenticationLogOut(args, api, extraOptions) {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(logout()); // Dispatch the logout action
  }
  return result;
}
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthenticationLogOut,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
