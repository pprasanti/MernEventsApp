
import axios from "axios";
import { useCallback, useState } from "react"

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (reqConfig, applyData) => {
        setIsLoading(true)
        setError(null);
        try {

            var headers = (undefined !== reqConfig.headers) ? reqConfig.headers : { 'Content-Type': 'application/json' }

            const response = await axios.request({
                baseURL: `${process.env.REACT_APP_API_URL} ?? '' + ${reqConfig.url}`,
                // baseURL: `${reqConfig.url}`,
                method: reqConfig.method ?? 'GET',
                headers: Object.assign(headers, { Authorization: `Bearer ${localStorage.getItem('token')}` }),
                body: reqConfig.body ? reqConfig.body : null,
            })
            console.log(response)

            if (response.statusText !== "OK") {
                throw new Error(response.statusText)
            }

            const data = await response.data
            console.log(response)
            applyData(data)
        } catch (error) {
            setError(error)
        }
        setIsLoading(false)
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;