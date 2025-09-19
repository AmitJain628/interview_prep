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
      // Simulate API call since we can't actually fetch from /api/details
      content = <div>Details content loaded from {tab.url}</div>;
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
            key={tab.id}
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

/* Embedded CSS Styles */
const styles = `
/* Container for the tab headers */
.tab-header {
  display: flex;
  border-bottom: 2px solid #e2e8f0; /* light gray border */
  background-color: #f8fafc;
  user-select: none;
}

/* Individual tab */
.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: #475569; /* gray-600 */
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

/* Hover effect for tabs */
.tab:hover {
  color: #1d4ed8; /* blue-700 */
}

/* Active tab */
.tab.active {
  color: #1d4ed8; /* blue-700 */
  border-bottom-color: #1d4ed8; /* underline to indicate active */
  font-weight: 600;
  background-color: #f1f5f9;
}

/* Tab panel container */
.tab-panel {
  background-color: #ffffff;
  padding: 1rem;
  min-height: 120px;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  color: #334155; /* gray-700 */
}

/* Optional: smooth transition when content changes */
.tab-panel > * {
  transition: opacity 0.3s ease;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
