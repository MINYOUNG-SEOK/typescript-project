import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi"
import useClientCredentialToken from "./useClientCredentialToken"

const useGetNewReleases = () => {
    const ClientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ["new-releases"],
        queryFn: async () => {
            if (!ClientCredentialToken) {
                throw new Error("No token available")
            }
            return getNewReleases(ClientCredentialToken)
        },
    });
};

export default useGetNewReleases