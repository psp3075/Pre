import React, { useState } from "react";

export const FeatureFlag = React.createContext({});

export const FeatureFlagProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    isGoldPlan: true,
    isPlatinumPlan: false,
  });
  return (
    <FeatureFlag.Provider value={{ features }}>{children}</FeatureFlag.Provider>
  );
};
