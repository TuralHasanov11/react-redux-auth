import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { logout, setUser } from "../store/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithAutoAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403){
        // send refresh token
        const refreshResult = await baseQuery("auth/refresh", api, extraOptions)

        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setUser({...refreshResult.data, user}))

            // retry login
            result = await baseQuery(args, api, extraOptions)
        }else{
            api.dispatch(logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithAutoAuth,
    endpoints: builder => ({})
})