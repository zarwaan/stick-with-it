import { useCallback, useEffect, useMemo, useState } from "react";

export default function useFetch(fetchUrl,options={},autoFetch=true) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (override = {}) => {
        const controller = new AbortController();
        setIsLoading(true);
        setError(null);

        const merged = {
        ...options,
        ...override,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          ...(override.headers || {}),
        },
        signal: controller.signal,
      };

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}${fetchUrl}`,merged);
            const result = await response.json();
            if(response.ok){
                setData(result)
            }
            else{
                setError(result)
            }
        }
        catch(err){
            if(err.name !== "AbortError")
                setError(err)
        }
        finally{
            setIsLoading(false)
        }

        return () => controller.abort();
    },[fetchUrl,options])

    useEffect(() => {
        if(autoFetch) fetchData();
    },[fetchData, autoFetch])

    return {
        data, isLoading, error, fetchData
    };
}