import { useQuery } from "@tanstack/react-query"
import { getClientCredentialToken } from "../apis/authApi"

const useClientCredentialToken = (): string | undefined => {
    const { data } = useQuery({
        queryKey: ['client-credential=token'],
        queryFn: getClientCredentialToken
    })
    const ClientCredentialToken = data?.access_token
    return ClientCredentialToken;
}

export default useClientCredentialToken;