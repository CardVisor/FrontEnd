import React from "react";
import Spinner from "./output-onlinegiftools.gif";
import { Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex marginBottom="60rem">
      <img src={Spinner} width={480} alt="Spinner" />
    </Flex>
  );
};

export default Loading;
