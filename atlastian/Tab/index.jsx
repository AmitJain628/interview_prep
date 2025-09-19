import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const TabItem = ({ tabItem, handleTabChange, index }) => {
  return (
    <div className="tab-item" onClick={() => handleTabChange(tabItem.id)}>
      {tabItem.title}
    </div>
  );
};

export default function Tab() {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      content: "I am test",
      title: "tab 1",
    },
    {
      id: 2,
      title: "tab 2",
      url: "/api/details",
      lazy: true,
    },
    {
      id: 3,
      title: "tab 3",
      loader: async () => <div>I am tab 3</div>,
      lazy: true,
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [tabContents, setTabContents] = useState({});

  const loadContent = async (tabId) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (tabIndex === -1) return;
    const newTabContents = { ...tabContents };
    const selectedtab = tabs[tabIndex];

    const location = useLocation();
    const history = useHistory();

    let content = null;
    if (selectedtab.lazy) {
      if (selectedtab.url) {
        try {
          const data = await fetch(selectedtab.url);
          const text = await data.text();
          content = text;
        } catch (error) {
          console.log(error);
        }
      } else if (selectedtab.loader) {
        content = await selectedtab.loader();
      }
    } else {
      content = selectedtab.content;
    }

    setTabContents((prev) => ({ ...prev, [tabId]: content }));
  };

  const handleTabChange = (tabId) => {
    console.log(tabId);
    if (!tabContents[tabId]) {
      loadContent(tabId);
    }
    setActiveIndex(tabId);
    window.history.pushState(null, "", `?tab=${tabId}`);
    history.push(`?tab=${tabId}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get("tab");

    if (tabParam) {
        const tabId = parseInt(tabParam, 10);
        const selectedTabId = tabs.findIndex(tab => tab.id === tabId);
        if (selectedTabId !== -1) {
            setActiveIndex(selectedTabId);
            if (!tabContents[tabId]) {
                loadContent(tabId);
              }
        }
    } else {
        loadContent(activeIndex);
    }
    
  }, []);

  return (
    <div className="tab-container">
      {tabs.map((tab, index) => (
        <TabItem
          tabItem={tab}
          key={tab.id}
          index={index}
          handleTabChange={handleTabChange}
        />
      ))}
      <div>{tabContents[activeIndex] ? tabContents[activeIndex] : null}</div>
    </div>
  );
}


.tab-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Tab header with flex */
.tab-header {
  display: flex;
  border-bottom: 1px solid #ccc;
}

/* Each tab item */
.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f5f5f5;
  margin-right: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover effect */
.tab-item:hover {
  background-color: #e0e0e0;
}

/* Active tab */
.tab-item.active {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-bottom: none;
  font-weight: bold;
}

/* Tab content */
.tab-content {
  padding: 20px;
  border: 1px solid #ccc;
  min-height: 100px;
  background-color: #ffffff;
}

