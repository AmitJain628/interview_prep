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
