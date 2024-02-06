/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='flex-end'
      px={{ base: "30px", md: "50px" }}
      pb='30px'>
      <Text color={textColor} fontSize='sm'>
          This dashboard is a group project. Please refer to 
          <Link
            fontWeight='500'
            href='https://github.com/CardVisor'>
            &nbsp;GitHub&nbsp;
          </Link>
          &nbsp;&copy; 2024
      </Text>
    </Flex>
  );
}
