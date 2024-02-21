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
import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";

// Assets
import React, { useRef } from "react";
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



export default function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // 각 섹션에 대한 참조 생성
  const genderRef = useRef();
  const ageRef = useRef();
  const jobRef = useRef();
  const salaryRef = useRef();
  

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
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700" mt="20px" ref={genderRef}>
          성별 조회
        </Text>
        {/* GeneralInformation component */}
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="1fr 2fr">
          <GenderInformation
            gridArea={{ base: "1", lg: "1" }}  // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
          />
          <Projects
          gridArea={{ base: "1", lg: "1" }}  // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
            />
        </Grid>
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700" mt="20px" ref={ageRef}>
          나이 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <AgeInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
          />
           <AgeData
          gridArea={{ base: "1", lg: "1" }}  // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
            />
        </Grid>
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700" mt="20px" ref={jobRef}>
          직업 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <JobInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
          />
           <JobData
          gridArea={{ base: "1", lg: "1" }}  // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
            />
        </Grid>
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700" mt="20px" ref={salaryRef}>
          연봉 별 조회
        </Text>
        <Grid gap={{ base: "10px", xl: "20px" }} gridTemplateColumns="2fr 4fr">
          <SalaryInformation
            gridArea={{ base: "1", lg: "1" }}
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
          />
           <SalaryData
          gridArea={{ base: "1", lg: "1" }}  // Adjust the grid area
            maxH={{ base: "auto", lg: "420px", "2xl": "365px" }}
            minH='400px'
            pe='20px'
            />
        </Grid>
      </Box>
    </>
  );
}
