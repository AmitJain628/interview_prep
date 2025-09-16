import { useEffect, useRef, useState } from "react";


function usePaginatedList(fetchPage, size) {
    const [data, setData] = useState([]);
    const [paginated, setPaginatedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const cacheRef = useRef({});

    useEffect(() => {
        let isMounted = true;

        if (cacheRef.current[page] && Date.now() - cacheRef.current[page].time > 10000) {
           setPaginatedData(cacheRef.current[page].data);
           return;
        } else {
            loadData();
        }

        async function loadData() {
           try {
            const result = await mockApi(currentPage);
            setData(result);
            cacheRef.current[currentPage] = result;
           } catch(error) {

           }
        }

        return () =>  {
            isMounted = false
        }

    }, [currentPage, size, fetchPage]);

    const prevPage = () => {
        if (page < 2) {
            return;
        }
        setCurrentPage((prev) => prev - 1);
    }
    const nextPage = () => {
        if (!hasMore) return;
        setCurrentPage((prev) => prev + 1);
    }

    return {
        isLoading,
        hasMore,
        paginated,
        data
    }


}

function Pagination() {
    const {
        data,
        isLoading,
        page,
        nextPage,
        prevPage,
        hasMore,
      } = usePaginatedList(mockApi, currentPage);

    let loadinRef = useRef(null);
    

    useEffect(() => {
        
        let observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore && !isLoading){
                nextPage();
            }
        });

        if(loadinRef.current) {
            observer.observe(loadinRef.current);
        }

        return () => observer.disconnect();

    }, [hasMore, isLoading]);


    return (
        <div>
            {!isLoading && 
            paginated.map((data) => (
              <div>
                <span>{data.id}</span>
                <span>{data.name}</span>
               </div>
              ))
            }
            {isLoading && <p ref={loadinRef}>Loading...</p>}
        </div>
    )
}