import React from "react";
import Spinner from "./output-onlinegiftools.gif";
import { Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex marginBottom="60rem">
      <img
        src="https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/output-onlinegiftools.gif"
        width={480}
        height="100%"
        alt="Spinner"
      />
    </Flex>
  );
};

export default Loading;
