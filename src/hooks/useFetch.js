import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    
    (async () => {      
      setIsLoading(true);
      
      //await new Promise(r => setTimeout(r, 700));

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          credentials: 'include'
        });

        const result = await response.json();

        if(!Object.values(result).length) throw Error;
        
        setData(result)
      } 
      
      catch (error) {
        console.error(error.message);
      } 
      
      finally {
        setIsLoading(false);
      }
    })();
    
    return () => {
      abortController.abort();
      setData(null);
    }
  }, [url]);

  return { data, isLoading };
}