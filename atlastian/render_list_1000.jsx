import { useState } from "react";

const Normal = () => {
    const totalItems = 1000;
    const itemHeight = 35;


    return (
        <div
          style={{
            border: "1px solid black",
            marginTop: "50px",
            position: "relative",
            width: "500px",
          }}
        >
          <ul
            style={{
              position: "relative",
              width: "500px",
              height: `500px`,
              top: "-16px",
              left: "-40px",
              overflowY: "scroll",
            }}
          >
            {Array(1000)
              .fill("")
              .map((el, index) => (
                <li
                  style={{
                    height: `${itemHeight}px`,
                    top: `${(index + 0) * itemHeight}px`,
                    position: "absolute",
                    backgroundColor: (index + 0) % 2 === 0 ? "lightgray" : "white",
                    color: "black",
                    width: "500px",
                    listStyle: "none",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  list item {index}
                </li>
              ))}
          </ul>
        </div>
      );
}


const VirtualList = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const totalItems = 1000;
    const itemHeight = 35;

    const startIndex = Math.max(0, (Math.floor(scrollTop / itemHeight) - 10));
    const endIndex = Math.min((Math.floor((scrollTop + 500)/ itemHeight)) + 10, totalItems);

    const handleScroll = (e) => setScrollTop(e.target.scrollTop);


    return (
        <div style={{
            border: "1px solid black",
            marginTop: "50px",
            position: "relative",
            width: "500px",
        }}>

            <div style={{
                overflow: "scroll",
                position: "relative",
                heigh: "500px"
            }} onScroll={handleScroll}>
                <div style={{
                    height: `${itemHeight*totalItems}px`
                }}>

                {new Array(endIndex - startIndex + 1).map((el, index) => (
                    <div style={{
                        position: "absolute",
                        height: `${itemHeight}px`,
                        top: `${(index+startIndex) * itemHeight}`
                    }}>list element {index + startIndex}</div>
                ))}
                </div>
            </div>

        </div>
    )
}


export default ListItems = ({ startIndex, endIndex }) => {
    return new Array(endIndex - startIndex + 1).fill(0).map((_, index) => {
      return (
        <div
          style={{
            height: `${itemHeight}px`,
            top: `${(index + startIndex) * itemHeight}px`,
            backgroundColor:
              (index + startIndex) % 2 === 0 ? "lightgray" : "white",
            position: "absolute",
            color: "black",
            width: "500px",
            listStyle: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          key={index}
        >
          List Item number - {index + startIndex}
        </div>
      );
    });
  };


  import { useState } from "react";
import ListItems from "./ListItems";

const itemHeight = 35;
const windowHeight = 500;
const overscan = 10;

const VirtualisedList = ({ numberOfItems }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    Math.floor((scrollTop + windowHeight) / itemHeight) + overscan,
    numberOfItems
  );
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "50px",
        position: "relative",
        width: "500px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "500px",
          height: `${windowHeight}px`,
          overflowY: "scroll",
        }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div
          style={{
            height: `${numberOfItems * itemHeight}px`,
          }}
        >
          <ListItems startIndex={startIndex} endIndex={endIndex} />
        </div>
      </div>
    </div>
  );
};

export default VirtualisedList;



const itemHeight = 35;
const windowHeight = 500;
const overscan = 10;

const ListItems = ({ startIndex, endIndex }) => {
  return new Array(endIndex - startIndex + 1).fill(0).map((_, index) => {
    return (
      <div
        style={{
          height: `${itemHeight}px`,
          backgroundColor:
            (index + startIndex) % 2 === 0 ? "lightgray" : "white",
          color: "black",
          width: "500px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        key={index}
      >
        List Item number - {index + startIndex}
      </div>
    );
  });
};

export default OptimisedVirtualisedList = ({ numberOfItems }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const renderedNodes = Math.min(
    numberOfItems - startIndex,
    Math.floor(windowHeight / itemHeight) + 2 * overscan
  );
  console.log(scrollTop, startIndex, renderedNodes);
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "50px",
        width: "500px",
        overflowY: "scroll",
        height: `${windowHeight}px`,
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div
        style={{
          height: `${numberOfItems * itemHeight}px`,
        }}
      >
        <div
        // style={{
        //   transform: `translateY(${startIndex * itemHeight}px)`,
        // }}
        >
          <ListItems
            startIndex={startIndex}
            endIndex={startIndex + renderedNodes}
          />
        </div>
      </div>
    </div>
  );
};
