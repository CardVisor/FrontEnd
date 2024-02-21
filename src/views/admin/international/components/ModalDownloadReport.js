import {
    Box,
    Button,
    Checkbox,
    CloseButton,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TopMonthFilter from "./TopMonthFilter";
import "assets/css/international/modal.css";
import DownloaderExcel from "./DownloaderExcel";
import { numberWithDots, parseNumber } from "../variables/util";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import { chartNationInfo } from "../variables/chartNationInfo";

const ModalDownloadReport = ({ isOpen, onClose, btnRef }) => {
    const [selectStartMonth, setSelectStartMonth] = useState(null);
    const [selectEndMonth, setSelectEndMonth] = useState(null);

    //성별 옵션
    const genders = ["남성", "여성"];
    const [checkedGender, setCheckedGender] = React.useState([true, true]);
    const allGenderChecked = checkedGender.every(Boolean);

    //연령층 옵션
    const ageGroups = ["20대", "30대", "40대", "50대", "60대", "70대 이상"];
    const [checkedAgeGroup, setCheckedAgeGroup] = React.useState([
        true,
        true,
        true,
        true,
        true,
        true,
    ]);
    const allAgeGroup = checkedAgeGroup.every(Boolean);

    //월 결제 금액
    const [searchStPrice, setSearchStPrice] = useState(0);
    const [searchEdPrice, setSearchEdPrice] = useState(100000000);

    //국가 선택
    const [selectedNations, setSelectedNations] = React.useState([]);
    const [isMaxSelected, setIsMaxSelected] = React.useState(false);

    //const isIndeterminate = checkedGender.some(Boolean) && !allGenderChecked;
    const isIndeterminate = (item, all) => {
        return item.some(Boolean) && !all;
    };

    // 값 변환 함수
    const onlyNumbers = (value) => value.replace(/[^0-9]/g, "");
    const isNumberKey = (key) => /[0-9]/.test(key);

    // 입력 변화 처리 함수
    const handleStartPriceChange = (e) => {
        const value = onlyNumbers(e.target.value);
        setSearchStPrice(value === "" ? "0" : value);
    };
    const handleEndPriceChange = (e) => {
        const value = onlyNumbers(e.target.value);
        setSearchEdPrice(value === "" ? "0" : value);
    };

    // 키 입력 처리 함수
    const handleKeyUp = (e) => {
        if (
            !isNumberKey(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete"
        ) {
            e.preventDefault();
        }
    };

    const handleSelectChange = (e) => {
        if (selectedNations.length >= 10) {
            setIsMaxSelected(true);
            return;
        }
        
        const selectedNationCode = e.target.value;
        const isAlreadySelected = selectedNations.some(nation => nation.code === selectedNationCode);
        
        if(isAlreadySelected) {
          return;
        }
    
        const selectedNation = chartNationInfo.find(nation => nation.nationCode === selectedNationCode);
        
        setSelectedNations(prevNations => [
            ...prevNations, 
            { code: selectedNation.nationCode, display: `${selectedNation.kName}(${selectedNation.eName})` }
        ]);
    };

    const handleRemoveItem = (index) => {
        setSelectedNations((prevNations) => {
            const newNations = prevNations.filter((_, i) => i !== index);
            if (newNations.length < 10) {
                setIsMaxSelected(false);
            }
            return newNations;
        });
    };

    return (
        <Modal
            isCentered
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={isOpen}
            scrollBehavior="inside"
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent h="90vh" w="90vw" maxW="1200px" padding="10px">
                <ModalHeader>해외 결제 리포트</ModalHeader>
                <ModalCloseButton size="lg" />
                <ModalBody padding="10px 39px">
                    <Box className="filterWrap">
                        <Box className="filterLine chk_wrap">
                            <span className="heading_option">성별</span>
                            <Checkbox
                                isChecked={allGenderChecked}
                                isIndeterminate={isIndeterminate(
                                    checkedGender,
                                    allGenderChecked
                                )}
                                onChange={(e) =>
                                    setCheckedGender(
                                        checkedGender.map(
                                            () => e.target.checked
                                        )
                                    )
                                }
                                className="chk_item"
                            >
                                전체
                            </Checkbox>
                            {genders.map((gender, index) => (
                                <Checkbox
                                    key={index}
                                    isChecked={checkedGender[index]}
                                    onChange={(e) => {
                                        const newCheckedGender = [
                                            ...checkedGender,
                                        ];
                                        newCheckedGender[index] =
                                            e.target.checked;
                                        setCheckedGender(newCheckedGender);
                                    }}
                                    className="chk_item"
                                >
                                    {gender}
                                </Checkbox>
                            ))}
                        </Box>
                        <Box className="filterLine chk_wrap">
                            <span className="heading_option">
                                주 결제 고객층
                            </span>
                            <Checkbox
                                isChecked={allAgeGroup}
                                isIndeterminate={isIndeterminate(
                                    checkedAgeGroup,
                                    allAgeGroup
                                )}
                                onChange={(e) =>
                                    setCheckedAgeGroup(
                                        checkedAgeGroup.map(
                                            () => e.target.checked
                                        )
                                    )
                                }
                                className="chk_item"
                            >
                                전체
                            </Checkbox>
                            {ageGroups.map((ageGroup, index) => (
                                <Checkbox
                                    key={index}
                                    isChecked={checkedAgeGroup[index]}
                                    onChange={(e) => {
                                        const newCheckedAgeGroup = [
                                            ...checkedAgeGroup,
                                        ];
                                        newCheckedAgeGroup[index] =
                                            e.target.checked;
                                        setCheckedAgeGroup(newCheckedAgeGroup);
                                    }}
                                    className="chk_item"
                                >
                                    {ageGroup}
                                </Checkbox>
                            ))}
                        </Box>
                        <Box className="filterLine chk_wrap">
                            <span className="heading_option">월 결제 금액</span>
                            <InputGroup maxW="200px" mr="5px">
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    fontSize="1.2em"
                                >
                                    ₩
                                </InputLeftElement>
                                <Input
                                    placeholder="Enter amount"
                                    textAlign="right"
                                    value={numberWithDots(searchStPrice)}
                                    onChange={handleStartPriceChange}
                                    onKeyDown={handleKeyUp}
                                />
                            </InputGroup>
                            ~
                            <InputGroup maxW="200px" ml="5px">
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    fontSize="1.2em"
                                >
                                    ₩
                                </InputLeftElement>
                                <Input
                                    placeholder="Enter amount"
                                    textAlign="right"
                                    value={numberWithDots(searchEdPrice)}
                                    onChange={handleEndPriceChange}
                                    onKeyDown={handleKeyUp}
                                />
                            </InputGroup>
                        </Box>
                        <Box className="filterLine hasBranch">
                            <Box className="filterTop">
                                <span className="heading_option">국가</span>
                                <Select
                                    maxW="420px"
                                    defaultValue="all"
                                    onChange={handleSelectChange}
                                >
                                    <option value="all">전체</option>
                                    {chartNationInfo
                                        .filter(
                                            (nation) =>
                                                nation.nationCode !== "KOR"
                                        )
                                        .map((nation, index) => (
                                            <option
                                                key={index}
                                                value={nation.nationCode}
                                            >
                                                {`${nation.kName}(${nation.eName})`}
                                            </option>
                                        ))}
                                </Select>
                                <span className="selectTip">
                                    {isMaxSelected
                                        ? "* 최대 10개국 선택 가능하여, 더 이상 추가할 수 없습니다."
                                        : "* 최대 10개국 선택 가능"}
                                </span>
                            </Box>
                            <Box className="filterBottom">
                                {selectedNations.map((item, index) => (
                                    <Box className="tag" key={index}>
                                        &#35;{item.display}
                                        <CloseButton
                                            size="sm"
                                            ml="-4px"
                                            onClick={() =>
                                                handleRemoveItem(index)
                                            }
                                        />
                                    </Box>
                                ))}
                            </Box>
                            {/*
                            <Box className="filterBottom">
                                <Box className="tag">
                                    &#35;아랍에미리트(Afghanistan)
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;사우디아라비아
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;터크스 카이코스 제도
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                                <Box className="tag">
                                    &#35;아랍에미리트
                                    <CloseButton size="sm" ml="-4px" />
                                </Box>
                            </Box>
                            */}
                        </Box>
                        <Box display="flex" className="filterLine">
                            <span className="heading_option">조회 기간</span>
                            <TopMonthFilter
                                setSelectStartMonth={setSelectStartMonth}
                                setSelectEndMonth={setSelectEndMonth}
                            />
                            <Flex
                                display="flex"
                                justifyContent="flex-end"
                                ml="auto"
                                mr="40px"
                                mt="50px"
                            >
                                <Button
                                    colorScheme="blue"
                                    onClick={onClose}
                                    borderRadius="10px"
                                >
                                    검색
                                </Button>
                                <DownloaderExcel />
                            </Flex>
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default React.memo(ModalDownloadReport);
