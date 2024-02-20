import { Box, Text } from "@chakra-ui/react";
import React from "react";

function DndColumn({ column, data }) {
  return (
    <Box>
      <Text>{column}</Text>
      {data.map((item) => (
        <Box key={item.benefit_id}>{item.benefit_detail}</Box>
      ))}
    </Box>
  );
}

export default DndColumn;
