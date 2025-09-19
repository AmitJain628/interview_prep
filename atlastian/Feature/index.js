import React, {
  createContext,
  react,
  useContext,
  useEffect,
  useState,
} from "react";

const FeatureContext = createContext({});

const FeatureContextProvider = ({ children }) => {
  const [features, setFeatures] = useState({});

  const getFeatureFlag = () => {
    try {
      setFeatures({
        feature1: true,
        feature2: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeatureFlag();
  }, []);

  const getFeatureFlagValue = (name) => {
    if (name && name in features) {
      return features[name];
    }

    return false;
  };

  return (
    <FeatureContext.Provider value={{ getFeatureFlagValue, features }}>
      {children}
    </FeatureContext.Provider>
  );
};

const Component = () => {
  const { getFeatureFlagValue } = useContext(FeatureContext);

  if (!getFeatureFlagValue("feedback-dialog")) {
    return false;
  }

  return <div></div>;
};

const App = () => {
  return (
    <FeatureContextProvider>
      <Component />
    </FeatureContextProvider>
  );
};
