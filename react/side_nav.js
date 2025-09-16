import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const handleClick = (url) => {
    navigate(url);
  };
  return (
    <div className="side-container">
      <div onClick={() => handleClick("/home")}>Home</div>
      <div onClick={() => handleClick("/about")}>About</div>
      <div onClick={() => handleClick("/setting")}>Setting</div>
    </div>
  );
};

const Home = ({ timer, stopTimer, startTimer }) => {
  const [time, setTime] = useState(0);
  const timeRef = useRef();
  const [startTime, setStartTimer] = useState(false);

  useLayoutEffect(() => {
    console.log("timer fetch", localStorage.getItem("time"));
    setTime(parseInt(localStorage.getItem("time")));
    setStartTimer(true);
  }, []);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem("time", time);
      timeRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
    }

    return () => {
      console.log("clean up function", time, timeRef.current);
      clearInterval(timeRef.current);
    };
  }, [time, startTime]);

  return <div>I am home component {time}</div>;
};

const About = ({ timer, stopTimer, startTimer }) => {
  const [time, setTime] = useState(0);
  const timeRef = useRef();

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(timeRef.current);
    };
  }, []);
  return <div>I am about component {time}</div>;
};

const Setting = ({ timer, stopTimer, startTimer }) => {
  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);
  return <div>I am setting component {timer.time}</div>;
};

const Main = () => {
  const [timer, setTimer] = useState({
    home: { time: Date.now() },
    about: { time: 0 },
    setting: { time: 0 },
  });

  const startTimer = (route) => {
    const newTimer = { ...timer };
    const pageTimer = { ...newTimer[route] };
  };

  const stopTimer = () => {};

  return (
    <div className="main-container">
      <SideNav />
      <div className="right-container">
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                timer={timer.home}
                startTimer={startTimer}
                stopTimer={stopTimer}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                timer={timer.about}
                startTimer={startTimer}
                stopTimer={stopTimer}
              />
            }
          />
          <Route
            path="/setting"
            element={
              <Setting
                timer={timer.setting}
                startTimer={startTimer}
                stopTimer={stopTimer}
              />
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}
