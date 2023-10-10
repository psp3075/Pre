import React from "react";
import { FeatureFlagProvider, FeatureFlag } from "./context/FeatureFlag";

const DisplayPlan = () => {
  return (
    <>
      <Feature feature="isGoldPlan" value={true}>
        You are subscribed to Gold Plan
      </Feature>
      <Feature feature="isPlatinum" value={false}>
        You are subscribed to Platinum Plan
      </Feature>
    </>
  );
};

const Feature = ({ feature, value, children }) => {
  const { features } = React.useContext(FeatureFlag);
  return features[feature] === value ? children : null;
};
function App() {
  return (
    <FeatureFlagProvider>
      <DisplayPlan />
    </FeatureFlagProvider>
  );
}

export default App;
