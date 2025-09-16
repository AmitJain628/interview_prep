import { useEffect, useState } from "react";

function fetchProducts(start, limit) {
    return new Promise((resolve, reject) => {
        fetch(`url?start=${start}&limit=${limit}`).then((res) => {
            return resolve(res);
        }).catch(error => {
            console.log(error);
        })
    })
}

function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState([0, 10]);   
  let itemPerPage = 10;
  let itemHeight = 40;
  let containerRef = useRef(null)

  useEffect(() => {

    const handleScroll = () => {
        let startIndex = Math.floor(co  / itemHeight);
        const endIndex = Math.min(startIndex + 10, products.length);

        setVisible([startIndex, endIndex]);

        if (endIndex == products.length) {
            loadMore();
        }
    }
    
    containerRef.current.addEventListener('scroll', handleScroll);

    return () => containerRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMore = async () => {
    const res = await fetchProducts(endIndex, itemPerPage);
    setProducts(prev => ([...prev, ...res]));
  }

  return (
    <div ref={containerRef} style={{
        height: '600px',
        position: 'relative',
        overflow: 'scroll'
    }}>
    <div style={{ position: 'absolute', top: 0, width: '100%', height: `${products.length * ITEM_HEIGHT}px` }}>
        {products.slice(visible[0], visible[1]).map(el => (
        <div key={product.id} style={{ top: `${(visibleRange[0] + index) * ITEM_HEIGHT}px`, position: 'absolute', width: '100%' }}>
                      {el}</div>
        ))}
        </div>
    </div>
  )
}
  
  export default InfiniteScroll;