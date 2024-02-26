import {
    Box,
    Button,
    Checkbox,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import "assets/css/benefitCluster/Modal.css";
import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import BenefitRecommendResult from "./BenefitRecommendResult";

function BenefitRecommend(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollPosition, setScrollPosition] = useState(0);
    const modalContentRef = useRef(null);
    const responseRef = useRef(null);

    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [benefitCustomData, setBenefitCustomData] = useState();
    const [loadingDndComp, setLoadingDndComp] = useState(false);
    //const [fetchNeeded, setFetchNeeded] = useState(false); // fetchData 호출 제어를 위한 상태
    const categories = {
        성별: ["남자", "여자"],
        연령: ["20대", "30대", "40대", "50대", "60대", "70대 이상"],
        직업: [
            "직장인",
            "공무원",
            "전문직",
            "프리랜서",
            "개인사업자",
            "법인사업자",
            "대학생",
            "전업주부",
        ],
        연소득: [
            "3000만 미만",
            "3000만 ~ 5000만",
            "5000만 ~ 7000만",
            "7000만 ~ 1억",
            "1억 이상",
        ],
    };

    const [checkedOptions, setCheckedOptions] = useState({
        성별: Array(categories.성별.length).fill(false),
        연령: Array(categories.연령.length).fill(false),
        직업: Array(categories.직업.length).fill(false),
        연소득: Array(categories.연소득.length).fill(false),
    });

    const handleParentChange = (category) => (e) => {
        const newValue = e.target.checked;
        setCheckedOptions({
            ...checkedOptions,
            [category]: Array(categories[category].length).fill(newValue),
        });
    };

    const handleChildChange = (category, index) => (e) => {
        const newCheckedItems = [...checkedOptions[category]];
        newCheckedItems[index] = e.target.checked;
        setCheckedOptions({
            ...checkedOptions,
            [category]: newCheckedItems,
        });
    };

    const handleSearchAction = useCallback(async () => {
        try {
            const res = await axios({
                method: "post",
                url: "/benefitCluster/benefitRecommend",
                data: checkedOptions,
            });
            console.log(res.data);
            setBenefitCustomData(res.data);
            setLoadingDndComp(true);
        } catch (err) {
            console.log(err);
        }
    }, [checkedOptions]);

    const allCategoriesChecked = () => {
        return Object.values(checkedOptions).every((category) =>
            category.includes(true)
        );
    };

    const [searchFlag, setSearchFlag] = useState(false);

    useEffect(() => {
        setSearchFlag(allCategoriesChecked);
    }, [checkedOptions]);

    useEffect(() => {
        const handleScroll = () => {
            if (modalContentRef.current) {
                setScrollPosition(modalContentRef.current.scrollTop);
            }
        
            requestAnimationFrame(() => {
                const combiElement = document.querySelector(".basketItem");
        
                if (combiElement) {
                    if (scrollPosition >= 400) {
                        combiElement.classList.add("fixedItem");
                    } else {
                        combiElement.classList.remove("fixedItem");
                    }
                }
            });
        };

    if (modalContentRef.current) {
        modalContentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
        if (modalContentRef.current) {
            modalContentRef.current.removeEventListener(
                "scroll",
                handleScroll
            );
        }
    };
}, [handleSearchAction, scrollPosition]);

useLayoutEffect(() => {
    //console.log("responseRef.current111", responseRef && responseRef.current);
    if (responseRef.current) {
        //console.log("responseRef.current222", responseRef.current);
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                requestAnimationFrame(() => {
                    //console.log("Previous width:", entry.contentRect.width);
                    //console.log("responseRef.current : ", responseRef.current);
                    const combiElement = document.querySelector(".basketItem");

                    //console.log("combiElement : ", combiElement);

                    if (responseRef.current && combiElement) {
                        //console.log("entry.contentRect.width", entry.contentRect.width);
                        if (entry.contentRect.width <= 672) {
                            //console.log("672보다 작다 !!");
                            combiElement.style.width = "224px";
                        } else {
                            //console.log("672보다 크다 !!");
                            combiElement.style.width = "448px";
                        }
                    }
                });
            }
        });

        resizeObserver.observe(responseRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }
}, [loadingDndComp]);


    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme="facebook"
                variant="solid"
                size="sm"
            >
                타겟 기반 혜택 추천
            </Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                scrollBehavior={scrollBehavior}
            >
                <ModalOverlay />
                <ModalContent maxH="860px" maxW="1420px">
                    <ModalHeader fontSize="22px">
                        타겟 기반 혜택 추천
                    </ModalHeader>
                    <ModalCloseButton size="lg" />
                    <ModalBody
                        padding="10px 30px"
                        className="benefitBody"
                        ref={modalContentRef}
                        id="benefitModalBody"
                    >
                        <Text className="subTitle">고객층 필터</Text>
                        <Box className="benefitFilterWrap">
                            {Object.keys(categories).map((category) => (
                                <Box key={category} className="filterLine">
                                    <Text className="filterHeader">
                                        {category}
                                    </Text>
                                    <div key={category}>
                                        <Checkbox
                                            isChecked={checkedOptions[
                                                category
                                            ].every((item) => item)}
                                            onChange={handleParentChange(
                                                category
                                            )}
                                            className="chk_item"
                                        >
                                            전체
                                        </Checkbox>
                                        {categories[category].map(
                                            (item, index) => (
                                                <Checkbox
                                                    key={category + index}
                                                    isChecked={
                                                        checkedOptions[
                                                            category
                                                        ][index]
                                                    }
                                                    onChange={handleChildChange(
                                                        category,
                                                        index
                                                    )}
                                                    className="chk_item"
                                                >
                                                    {item}
                                                </Checkbox>
                                            )
                                        )}
                                    </div>
                                </Box>
                            ))}
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                mr="20px"
                                mt="10px"
                            >
                                <Button
                                    disabled={!searchFlag}
                                    colorScheme="blue"
                                    borderRadius="10px"
                                    onClick={handleSearchAction}
                                >
                                    조회
                                </Button>
                            </Box>
                        </Box>
                        {loadingDndComp && (
                            <Box className="benefitSearchResult">
                                <BenefitRecommendResult
                                    data={benefitCustomData}
                                    scrollPosition={scrollPosition}
                                    ref={responseRef}
                                />
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default BenefitRecommend;
