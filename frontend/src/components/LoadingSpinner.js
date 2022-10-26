import { HStack, Spinner, View } from "native-base";
import React from "react";

const LoadingSpinner = () => {
  return (
    <View width="100%" height="100%" justifyContent="center" backgroundColor="coolGray.800">
      <Spinner size="lg" />
    </View>
  );
};

export default LoadingSpinner;
