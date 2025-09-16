import { useEffect, useState } from "react"

function Suspense({time, loadingText, Component}) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
       const timerId = setTimeout(() => {
        setLoading(false);
       }, time);

       return () => clearTimeout(timerId);
    }, [])

    return (
        <>
        {loading ? loadingText : <Component />}
        </>
    )
}