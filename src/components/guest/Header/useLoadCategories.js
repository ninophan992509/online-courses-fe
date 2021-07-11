import React, { useState, useEffect } from "react";
import request from "../../../configs/request";

export const useLoadCategories = (filter) => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        setLoading(true);
       if(filter && filter.page === 0)
       {
           setCats([]);
           delete filter.page;
       }
       
        const fetchData = async () => {
            
            try {
                const res = await request({
                url:'/categories',
                method: 'GET',
                params: filter
                });
    
                if (res.data.rows.length > 0) {
                    setCats(cats.concat(res.data.rows));
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
                setPageNumber(res.pageNumber);
                
            } catch (error) {
                console.log(error);
                setError(true);
            }
            
        }
        
        fetchData();
        setLoading(false);
       
    }, [filter]);
    return { cats, loading, hasMore, error, pageNumber};
}

