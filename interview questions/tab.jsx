import "./styles.css";
import { useState, useEffect } from "react";

const Tab = () => {
  const [tabs, setTabs] = useState([
    { id: "t1", title: "Overview", content: <div>Welcome to overview</div> },
    { id: "t2", title: "Details", url: "/api/details", lazy: true },
    {
      id: "t3",
      title: "Stats",
      loader: async () => <div>Stats loaded!</div>,
      lazy: true,
    },
  ]);
  const [active, setActive] = useState("t1");
  const [loading, setLoading] = useState(false);
  const [tabContents, setTabContents] = useState({});

  const loadContent = async (tab) => {
    if (tabContents[tab.id]) return;
    let content;

    if (tab.content) {
      content = tab.content;
    } else if (tab.url) {
      const res = await fetch(tab.url);
      content = await res.text(); // Or parse JSON if needed
    } else if (tab.loader) {
      content = await tab.loader();
    } else {
      content = null;
    }

    tabContents[tab.id] = content;
    setTabContents((prev) => ({ ...prev, [tab.id]: content }));
    console.log("tab", tab);
  };

  const onTabChange = (tab, idx) => {
    setActive(tab.id);

    if (tab.lazy) {
      loadContent(tab);
    } else if (!tabContents[tab.id]) {
      loadContent(tab);
    }
  };

  useEffect(() => {
    console.log(tabs, active);
    const activeTab = tabs.filter((tab) => tab.id === active);
    loadContent(activeTab?.[0]);
  }, []);

  console.log(tabContents[active], active);

  return (
    <>
      <div className="tab-header">
        {tabs.map((tab, idx) => (
          <div
            className={`tab ${tab.id === active ? "active" : ""}`}
            onClick={() => onTabChange(tab, idx)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div
        className="tab-panel"
        style={{ padding: "1rem", minHeight: "100px" }}
      >
        {tabContents[active] ? tabContents[active] : null}
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Tab />
    </div>
  );
}
