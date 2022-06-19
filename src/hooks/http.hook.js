import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoadingValue] = useState(false);
  const [error, setErrorValue] = useState(null);
  
  const request = useCallback(async (url, method = 'GET', body = null, headers = {
    'Content-Type': 'application/json'
  }) => {
    setLoadingValue(true);
    try {
        const response = await fetch(url, {method, body, headers});
        
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}. Status error: ${response.status}`)
        }
        
        const data = await response.json();
        
        setLoadingValue(false);
     
        return data;
    } catch(e) {
        setLoadingValue(false);
        setErrorValue(e.message);
        throw e;
    }
    
  }, [])
  
  const clearError = useCallback(() => setErrorValue(null), []);
  
  return {loading, error, request, clearError};
}

export default useHttp;
