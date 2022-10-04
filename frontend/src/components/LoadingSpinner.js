import { HStack, Spinner } from "native-base";
import React from "react";

const LoadingSpinner = () => {
  return (
    <HStack space={8} justifyContent="center">
      <Spinner size="lg" />
    </HStack>
  );
};

export default LoadingSpinner;
