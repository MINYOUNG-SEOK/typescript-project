import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { getGetCurrentUserProfile } from "../apis/userApi"
import { User } from "../models/user"


const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
    const accessToken = localStorage.getItem("access_token")

    return useQuery<User, Error>({
        queryKey: ["current-user-profile", accessToken],
        queryFn: getGetCurrentUserProfile,
        enabled: !!accessToken,
        staleTime: 0,
    })
}

export default useGetCurrentUserProfile