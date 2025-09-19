const Normal = () => {
    return (
      <div className="container">
        <ul className="list-container">
          {Array(1000)
            .fill("")
            .map((el, index) => (
              <li
                className="item"
                style={{
                  top: `${index * 35}px`,
                }}
              >
                list item {index + 1}
              </li>
            ))}
        </ul>
      </div>
    );
  };
  
  export default Normal;
  