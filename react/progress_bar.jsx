/*
body {
    font-family: sans-serif;
  }
  
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .progress {
    background-color: rgb(233, 236, 239);
    border: 1px solid #c5c5c5;
    border-radius: 8px;
    height: 20px;
    overflow: hidden;
  }
  
  .progress-bar {
    background-color: #0d6efd;
    color: #fff;
    height: 100%;
    overflow: hidden;
    text-align: center;
  }
  */
  let MIN_VALUE = 10
  let MAX_VALUE = 100;
  export default function ProgressBar({value}) {
    
    return (
      <div 
      className="progress"
      >
      <div className="progress-bar" 
          style={{width: `${value}%`}}
      >{value}%</div>
      </div>
      );
  }
  