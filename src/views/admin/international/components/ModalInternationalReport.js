import {
    Box,
    Button,
    Checkbox,
    CloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TopMonthFilter from "./TopMonthFilter";
import "assets/css/international/modal.css";
// import DownloaderExcel from "./DownloadExcel";
import { numberWithDots } from "../variables/util";
import { chartNationInfo } from "../variables/chartNationInfo";
import axios from "axios";
import Pagination from "./Pagination";

const ModalInternationalReport = ({ isOpen, onClose }) => {
    // 상태 관리
    const [selectStartMonth, setSelectStartMonth] = useState(null);
    const [selectEndMonth, setSelectEndMonth] = useState(null);
    const [searchStPrice, setSearchStPrice] = useState(0);
    const [searchEdPrice, setSearchEdPrice] = useState(1000000000);
    const [selectedNations, setSelectedNations] = useState([]);
    const [isMaxSelected, setIsMaxSelected] = useState(false);
    const [checkedGender, setCheckedGender] = useState([false, false]);
    const [checkedAgeGroup, setCheckedAgeGroup] = useState(
        new Array(6).fill(false)
    );
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);
    const [searchParams, setSearchParams] = useState(null);
    const [tableData, setTableData] = useState([]);

    const isChecked = (checkboxState) => checkboxState.some(Boolean);

    // 상수 정의
    const genders = ["남", "여"];
    const ageGroups = ["20대", "30대", "40대", "50대", "60대", "70대 이상"];

    // 전체 선택 확인
    const allGenderChecked = checkedGender.every(Boolean);
    const allAgeGroup = checkedAgeGroup.every(Boolean);

    // 선택된 국가의 코드가 이미 선택되었는지 확인
    const isAlreadySelected = (code) =>
        selectedNations.some((nation) => nation.code === code);

    const isIndeterminate = (item, all) => {
        return item.some(Boolean) && !all;
    };

    // 숫자만 반환하는 함수
    const onlyNumbers = (value) => value.replace(/[^0-9]/g, "");
    const isNumberKey = (key) => /[0-9]/.test(key);

    // 입력 변화 처리 함수
    const handlePriceChange = (setter) => (e) => {
        const value = onlyNumbers(e.target.value);
        setter(value === "" ? "0" : value);
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

    // 국가 선택 처리 함수
    const handleSelectChange = (e) => {
        if (isMaxSelected || isAlreadySelected(e.target.value)) return;

        const selectedValue = e.target.value;
        if (selectedValue === "ALL") {
            const isConfirmed = window.confirm(
                "선택된 나라들을 삭제하시고 전체를 선택하시겠습니까?"
            );

            if (isConfirmed) {
                handleRemoveAll();
            }
        } else {
            const selected = chartNationInfo.find(
                (nation) => nation.nationCode === e.target.value
            );

            setSelectedNations((prev) => {
                const updatedNations = [
                    ...prev,
                    {
                        code: selected.nationCode,
                        display: `${selected.kName}(${selected.eName})`,
                    },
                ];

                if (updatedNations.length >= 10) {
                    setIsMaxSelected(true);
                }

                return updatedNations;
            });
        }
    };

    const handleRemoveAll = () => {
        setSelectedNations([]);
        setIsMaxSelected(false);
    };

    // 선택된 국가 삭제 처리 함수
    const handleRemoveItem = (index) => {
        setSelectedNations((prev) => prev.filter((_, i) => i !== index));
        if (selectedNations.length <= 10) setIsMaxSelected(false);
    };

    // 모든 필터 초기화
    const resetFilters = () => {
        setSelectStartMonth(null);
        setSelectEndMonth(null);
        setSearchStPrice(0);
        setSearchEdPrice(100000000);
        setSelectedNations([]);
        setIsMaxSelected(false);
        setCheckedGender([false, false]);
        setCheckedAgeGroup(new Array(6).fill(false));
    };

    // 모달 닫기 처리 함수
    const handleModalClose = () => {
        onClose();
        resetFilters();
        setTableData({});
        setPagingDataSet([]);
    };

    useEffect(() => {
        setIsSearchDisabled(
            !(isChecked(checkedGender) && isChecked(checkedAgeGroup))
        );
    }, [checkedGender, checkedAgeGroup]);

    useEffect(() => {
        //console.log("Modal?param이 있으면 axios해라", searchParams);
        if (searchParams) {
            axios({
                method: "post",
                url: `/international/chartDataList`,
                data: searchParams,
            })
                .then((res) => {
                    //console.log("?res.data 모달 모딩???", res.data);
                    setTableData(res.data);
                    setPage(1);
                    //console.log("Updated tableData: ", tableData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [searchParams]);

    useEffect(() => {
        console.log("Updated tableData useEffect: ", tableData);
    }, [tableData]);

    // 검색 버튼 클릭 핸들러 함수
    const handleSearchClick = () => {
        const selectedGenders = genders.filter(
            (_, index) => checkedGender[index]
        );
        const selectedAgeGroups = ageGroups.filter(
            (_, index) => checkedAgeGroup[index]
        );
        const selectedCountries = selectedNations.map((nation) => nation.code);
        const selectedPeriod = {
            startMonth: selectStartMonth,
            endMonth: selectEndMonth,
        };
        const selectedPriceRange = {
            startPrice: searchStPrice,
            endPrice: searchEdPrice,
        };

        setSearchParams({
            genders: selectedGenders,
            ageGroups: selectedAgeGroups,
            priceRange: selectedPriceRange,
            countries: selectedCountries,
            period: selectedPeriod,
        });
    };

    //////////////////페이징////////////////////////////////

    const [pagingDataSet, setPagingDataSet] = useState([]);

    const [page, setPage] = useState(0);
    const handlePageChange = (page) => {
        setPage(page);
    };

    let indexArray = Array.from({ length: 10 }, (item, index) => {
        return index;
    });
    
    let pageIndex = [];
    pageIndex =
        page === 1
            ? indexArray
            : indexArray.map((item) => item + (page - 1) * 10);

    // 현재 페이지 데이터
    const dataFetching = () => {
        let tableDataArray = Object.entries(tableData);
        const pagingData = [];
        for (let i = 0; i < indexArray.length; i++) {
            if (tableDataArray && tableDataArray[pageIndex[i]] === undefined) {
                break;
            } else {
                let entry = tableDataArray[pageIndex[i]];
                let key = entry[0];
                let value = entry[1];
                let obj = {};
                obj[key] = value;
                pagingData.push(obj);
            }
        }
        setPagingDataSet(pagingData);
        console.log("setPagingDataSetsetPagingDataSet??", pagingData);
    };
    
    useEffect(() => {
        if (Object.values(tableData).length !== 0) {
            dataFetching();
        }
    }, [tableData, page]); 

    useEffect(() => {
        //console.log("setPagingDataSetsetPagingDataSet??", pagingDataSet);
    }, [pagingDataSet]);

    return (
        <Modal
            isCentered
            onClose={handleModalClose}
            isOpen={isOpen}
            scrollBehavior="inside"
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent
                h="90vh"
                maxH="1000px"
                w="90vw"
                maxW="1260px"
                padding="10px"
            >
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
                                    {gender}성
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
                                    onChange={handlePriceChange(
                                        setSearchStPrice
                                    )}
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
                                    onChange={handlePriceChange(
                                        setSearchEdPrice
                                    )}
                                    onKeyDown={handleKeyUp}
                                />
                            </InputGroup>
                        </Box>
                        <Box className="filterLine hasBranch">
                            <Box className="filterTop">
                                <span className="heading_option">국가</span>
                                <Select
                                    maxW="420px"
                                    defaultValue="ALL"
                                    onChange={handleSelectChange}
                                >
                                    <option value="ALL">전체</option>
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
                                {selectedNations.length > 0 && (
                                    <Button
                                        colorScheme="blackAlpha"
                                        size="xs"
                                        onClick={handleRemoveAll}
                                    >
                                        전체 삭제
                                    </Button>
                                )}
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
                        </Box>
                        <Box display="flex" className="filterLine">
                            <span className="heading_option">조회 기간</span>
                            <TopMonthFilter
                                setSelectStartMonth={setSelectStartMonth}
                                setSelectEndMonth={setSelectEndMonth}
                            />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            mr="20px"
                            mt="10px"
                        >
                            <Button
                                colorScheme="blue"
                                borderRadius="10px"
                                isDisabled={isSearchDisabled}
                                onClick={handleSearchClick}
                            >
                                검색
                            </Button>
                            <Button
                                colorScheme="blackAlpha"
                                borderRadius="10px"
                                ml="10px"
                                onClick={resetFilters}
                            >
                                옵션 초기화
                            </Button>
                            {/*
                            <DownloadExcel />
                             */}
                        </Box>
                    </Box>
                    <Box m="30px 10px">
                        <Text pb="5px" pl="5px" style={{ fontSize: "14px" }}>
                            총{" "}
                            <span style={{ color: "blue", fontWeight: "bold" }}>
                                {tableData && Object.keys(tableData).length}
                            </span>
                            건
                        </Text>
                        <Box
                            border="1px"
                            borderColor="gray.200"
                            borderRadius="md"
                        >
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>No</Th>
                                            <Th>국가</Th>
                                            <Th>국가 코드</Th>
                                            <Th>날짜</Th>
                                            <Th>주고객층</Th>
                                            <Th>총 매출액</Th>
                                            <Th>총 결제 건수</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pagingDataSet &&
                                        pagingDataSet.length !== 0 ? (
                                            pagingDataSet.map((item, index) => {
                                                let country =
                                                    Object.keys(item)[0];
                                                let data = item[country];
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        index={(page - 1) * 10 + index + 1} 
                                                        country={country}
                                                        data={data}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <Tr>
                                                <Td
                                                    colSpan="7"
                                                    textAlign="center"
                                                    p="100px 0"
                                                >
                                                    검색된 결제 리포트가
                                                    없습니다.
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={Object.keys(tableData).length}
                        firstPageText={"<<"}
                        prevPageText={"<"}
                        lastPageText={">>"}
                        nextPageText={">"}
                        handlePageChange={handlePageChange}
                        maxItems={5}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default React.memo(ModalInternationalReport);

const TableRow = ({ index, country, data }) => {
    const keys = Object.keys(data);
    const firstKey = keys[0];
    const restKeys = keys.slice(1);
    const nationInfo = chartNationInfo.find(
        (info) => info.nationCode === country
    );

    return (
        <>
            <Tr>
                <Td rowSpan={keys.length}>{index}</Td>
                <Td rowSpan={keys.length}>
                    {nationInfo ? (
                        <>
                            {nationInfo.kName}
                            <br />({nationInfo.eName})
                        </>
                    ) : (
                        country
                    )}
                </Td>
                <Td rowSpan={keys.length}>{country}</Td>
                <Td>{`${firstKey.split("-")[0]}년 ${
                    firstKey.split("-")[1]
                }월`}</Td>
                <Td>
                    {data[firstKey].age_range}대{" "}
                    {data[firstKey].gender_range === "여" ? "여성" : "남성"}
                </Td>
                <Td>{numberWithDots(data[firstKey].total_amount)} 원</Td>
                <Td>{data[firstKey].total_payment_count} 건</Td>
            </Tr>
            {restKeys.map((key, idx) => (
                <Tr key={idx}>
                    <Td>{`${key.split("-")[0]}년 ${key.split("-")[1]}월`}</Td>
                    <Td>
                        {data[key].age_range}대{" "}
                        {data[key].gender_range === "여" ? "여성" : "남성"}
                    </Td>
                    <Td>{numberWithDots(data[key].total_amount)} 원</Td>
                    <Td>{data[key].total_payment_count} 건</Td>
                </Tr>
            ))}
        </>
    );
};
