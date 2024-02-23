import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Grid,
    Checkbox,
    CheckboxGroup,
    Text,
    useColorModeValue,
    Select,
    IconButton,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BenefitTreemap from './components/BenefitTreemap';
import DatePickerMonthly from './components/DatePicker';
import ParentBenefitComponent from './components/ParentBenefitComponent';
import Card from 'components/card/Card';
import { SearchIcon } from '@chakra-ui/icons';
import BenefitRecommendModal from './components/BenefitRecommendModal';
import Loading from '../default/components/Loading';
//import { useRecoilValue } from 'recoil';
import { benefitState } from '../Recoil/BenefitCluster';

export default function BenefitSetting() {
    //const bState = useRecoilValue(benefitState);
    const divToRemove = document.querySelector('.hi');
    const [benefitList, setBenefitist] = useState([]);
    const [benefitTreeList, setbBenefitTreeList] = useState([]);
    const [benefitTitle, setBenefitTitle] = useState();
    const [loading, setLoading] = useState(false);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const [allPeriodChecked, setAllPeriodChecked] = useState(true);
    const [date, setDate] = useState(null);
    const [selectOption, setSelectOption] = useState('high');
    const [seachState, setSeachState] = useState(true);

    const handleCheckboxChange = (e) => {
        setDate(null);
        setAllPeriodChecked(e.target.checked);
    };

    const handleSelectChange = (e) => {
        setSelectOption(e.target.value);
    };
    const handleIconClick = async () => {
        var formattedDate = null;
        if (date) {
            const year = date.getFullYear();
            let month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줍니다.
            month = month < 10 ? `0${month}` : month; // 월이 한 자리수일 경우 앞에 0을 붙여줍니다.
            formattedDate = `${year}-${month}`;
        }
        try {
            const res = await axios.post('/benefitCluster/benefitTopAndBottom', {
                date: formattedDate,
                selectOption: selectOption,
            });
            const res2 = await axios.post('/benefitCluster/benefitTreeChart', {
                date: formattedDate,
            });
            setBenefitist(res.data.list);
            setBenefitTitle(res.data.title);
            setbBenefitTreeList(res2.data);
            setLoading(true);
        } catch (err) {
            console.log(err);
        }
    };
    //검색 상태를 설정하는 useEffect
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthOptions = [];
    const defaultDate = currentMonth === 0 ? new Date(currentYear - 1, 11, 1) : new Date(currentYear, currentMonth, 1);
    const [minDate, setMinDate] = useState(null);
    for (let year = currentYear; year >= currentYear - 2; year--) {
        const startMonth = year === currentYear ? currentMonth : 12;
        const endMonth = year === currentYear - 2 ? 1 : 1;

        for (let month = startMonth; month >= endMonth; month--) {
            const monthString = month < 10 ? `0${month}` : `${month}`;
            const yearString = String(year);
            const optionText = `${yearString}년 ${monthString}월`;
            const optionValue = `${yearString}-${monthString}`;
            monthOptions.push({ text: optionText, value: optionValue });
        }
    }

    useEffect(() => {
        if (allPeriodChecked === true) {
            setSeachState(true);
        } else if (allPeriodChecked === false && date !== null) {
            setSeachState(true);
        } else if (allPeriodChecked === false && date === null) {
            setSeachState(false);
        } else {
            setSeachState(false);
        }

        //검색 날짜 제한
    }, [date, selectOption, allPeriodChecked]);
    // useEffect(() => {
    //     if (bState === false) {
    //         if (divToRemove != null) divToRemove.remove();
    //     } else {
    //         // if (divToRemove != null) divToRemove.appendChild();
    //     }
    // }, [bState]);
    useEffect(() => {
        setMinDate(new Date(monthOptions[monthOptions.length - 1].value));

        const fetchData = async () => {
            await handleIconClick();
        };

        fetchData();
    }, []);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Grid
                mb="10px"
                mr="10px"
                ml="10px"
                templateColumns={{
                    base: '1fr',
                    lg: '4.7fr',
                }}
                templateRows={{
                    base: 'repeat(1, 1fr)',
                    lg: '1fr',
                }}
                gap={{ base: '20px', xl: '20px' }}
            >
                <Card p="20px">
                    <Box mb={{ base: '1px', '2xl': '1px' }} alignItems={'baseline'}>
                        <Flex direction={{ base: 'row' }} justify="flex-start" alignItems="center">
                            <Box mr={10}>
                                <Checkbox colorScheme="blue" defaultChecked size="lg" onChange={handleCheckboxChange}>
                                    <Text color={textColor} fontSize="15px" fontWeight="800">
                                        전체 기간
                                    </Text>
                                </Checkbox>
                            </Box>
                            <Box mr={10}>
                                <DatePickerMonthly
                                    disabled={allPeriodChecked}
                                    onChange={(date) => setDate(date)}
                                    allPeriodChecked={allPeriodChecked}
                                    minDate={minDate}
                                    maxDate={defaultDate}
                                    defaultValue={defaultDate}
                                ></DatePickerMonthly>
                            </Box>
                            <Box mr={10} maxWidth="400px">
                                <Flex direction={{ base: 'col' }} justify="flex-start" alignItems="center">
                                    <Text
                                        mr={4}
                                        color={textColor}
                                        fontSize="15px"
                                        fontWeight="800"
                                        whiteSpace={'nowrap'}
                                    >
                                        혜택 적용 금액
                                    </Text>
                                    <Select defaultValue="high" size="xs" mr={2} onChange={handleSelectChange}>
                                        <option value="high">높은순</option>
                                        <option value="low">낮은순</option>
                                    </Select>
                                    {seachState ? (
                                        <IconButton
                                            colorScheme="facebook"
                                            aria-label="Search database"
                                            icon={<SearchIcon />}
                                            size="xs"
                                            onClick={handleIconClick}
                                            mr={4}
                                        />
                                    ) : (
                                        <IconButton
                                            colorScheme="gray"
                                            aria-label="Search database"
                                            icon={<SearchIcon />}
                                            size="xs"
                                            disabled={true}
                                            mr={4}
                                        />
                                    )}
                                </Flex>
                            </Box>
                            <Box mr={10} maxWidth="200px">
                                <BenefitRecommendModal></BenefitRecommendModal>
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <>
                {loading && (
                    <>
                        <Accordion defaultIndex={[1]} allowMultiple>
                            <AccordionItem mr="10px" ml="10px" mb="10px" mt="10px">
                                <AccordionButton _expanded={{ color: 'white' }}>
                                    <Box as="span" flex="1" textAlign="left">
                                        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                                            혜택 분포 트리맵
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <BenefitTreemap data={benefitTreeList}></BenefitTreemap>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem mr="10px" ml="10px" mb="10px" mt="10px">
                                <AccordionButton _expanded={{ color: 'white' }}>
                                    <Box as="span" flex="1" textAlign="left">
                                        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                                            혜택 순위 & 상세 정보
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <ParentBenefitComponent
                                        benefitList={benefitList}
                                        benefitTitle={benefitTitle}
                                        date={date}
                                        selectOption={selectOption}
                                    ></ParentBenefitComponent>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>
                )}
            </>
            <Flex
                className="hi"
                position="absolute"
                background="#F4F7FE"
                top="-100px"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                paddingTop={350}
                filter="opacity(0.95)"
            >
                <Loading />
            </Flex>
        </Box>
    );
}
