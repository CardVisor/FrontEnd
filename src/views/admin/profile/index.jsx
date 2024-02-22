/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  VStack,
  grid,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import React, { useEffect, useRef, useState } from "react";
import Card from "components/card/Card";
import GenderInformation from "./components/Gender";
import AgeInformation from "./components/Age";
import JobInformation from "./components/Job";
import SalaryInformation from "./components/Salary";
import Projects from "./components/Projects";
import AgeData from "./components/AgeData";
import JobData from "./components/JobData";
import SalaryData from "./components/SalaryData";
import CustomFilter from "./components/CustomFilter";
import Loading from "../default/components/Loading";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { loadState } from "../../admin/Recoil/Atom";

export default function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const divToRemove = document.querySelector(".hi");

  // 각 섹션에 대한 참조 생성
  const holy = useRecoilValue(loadState);
  const genderRef = useRef();
  const ageRef = useRef();
  const jobRef = useRef();
  const salaryRef = useRef();

  useEffect(() => {
    if (holy === false) {
      if (divToRemove != null) divToRemove.remove();
    } else {
      // if (divToRemove != null) divToRemove.appendChild();
    }
  }, [holy]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <Box pt={{ base: "auto", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Card>
          {/* <ButtonGroup>
            <Button colorScheme="teal" onClick={() => genderRef.current.scrollIntoView({ behavior: 'smooth' })} style={{ backgroundColor:"#5E3AFF"}}>성별</Button>
            <Button colorScheme="teal" onClick={() => ageRef.current.scrollIntoView({ behavior: 'smooth' })} style={{ backgroundColor:"#5E3AFF"}}> 나이</Button>
            <Button colorScheme="teal" onClick={() => jobRef.current.scrollIntoView({ behavior: 'smooth' })} style={{ backgroundColor:"#5E3AFF"}}>직업</Button>
            <Button colorScheme="teal" onClick={() => salaryRef.current.scrollIntoView({ behavior: 'smooth' })} style={{ backgroundColor:"#5E3AFF"}}>연봉</Button>
          </ButtonGroup> */}
          <CustomFilter></CustomFilter>
        </Card>
        <Text
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
          mt="20px"
          ref={genderRef}
        >
          성별 조회
        </Text>
        {/* GeneralInformation component */}
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="1fr 2fr">
          <GenderInformation
            gridArea={{ base: "1", lg: "1" }} // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
          <Projects
            gridArea={{ base: "1", lg: "1" }} // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
        </Grid>
        <Text
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
          mt="20px"
          ref={ageRef}
        >
          나이 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <AgeInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
          <AgeData
            gridArea={{ base: "1", lg: "1" }} // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
        </Grid>
        <Text
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
          mt="20px"
          ref={jobRef}
        >
          직업 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <JobInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
          <JobData
            gridArea={{ base: "1", lg: "1" }} // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
        </Grid>
        <Text
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
          mt="20px"
          ref={salaryRef}
        >
          연봉 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <SalaryInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
          <SalaryData
            gridArea={{ base: "1", lg: "1" }} // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH="400px"
            pe="20px"
          />
        </Grid>
        <Flex
          className="hi"
          position="absolute"
          background="#F4F7FE"
          top="-100px"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          filter="opacity(0.95)"
        >
          <Loading />
        </Flex>
      </Box>
    </>
  );
}
