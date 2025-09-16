import { useEffect } from "react"

function InfiniteScroll() {


    const handleScroll = () => {
        if (window.innerHeight + window.scrollY > document.documentElement.scrollHeight) {
            loadMore();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <div>

        </div>
    )
}