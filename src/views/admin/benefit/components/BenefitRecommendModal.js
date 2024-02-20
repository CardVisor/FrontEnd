import {
    Button,
    Checkbox,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BenefitRecommendResult from './BenefitRecommendResult';
import axios from 'axios';

function BenefitRecommend(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState('inside');
    const categories = {
        성별: ['남자', '여자'],
        연령: ['20대', '30대', '40대', '50대', '60대', '70대 이상'],
        직업: ['직장인', '공무원', '전문직', '프리랜서', '개인사업자', '법인사업자', '대학생', '전업주부'],
        연소득: ['3000만 미만', '3000만 ~ 5000만', '5000만 ~ 7000만', '7000만 ~ 1억', '1억 이상'],
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

    const handleSearchAction = () => {
        axios({
            method: 'post',
            url: '/benefitCluster/benefitRecommend',
            data: checkedOptions,
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const allCategoriesChecked = () => {
        return Object.values(checkedOptions).every((category) => category.includes(true));
    };
    const [searchFlag, setSearchFlag] = useState(false);
    useEffect(() => {
        setSearchFlag(allCategoriesChecked);
    }, [checkedOptions]);

    return (
        <>
            <Button onClick={onOpen} colorScheme="facebook" variant="solid" size="sm">
                타겟 기반 혜택 추천
            </Button>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                scrollBehavior={scrollBehavior}
                size="5xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>타겟 기반 혜택 추천</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="lg" fontWeight="700" pl={2} mb="5">
                            필터
                        </Text>
                        <div>
                            {Object.keys(categories).map((category) => (
                                <Stack key={category} pl={5} mt={1} spacing={1} mb="3">
                                    <div key={category}>
                                        <Text>{category}</Text>
                                        <Checkbox
                                            isChecked={checkedOptions[category].every((item) => item)}
                                            isIndeterminate={
                                                checkedOptions[category].some((item) => item) &&
                                                !checkedOptions[category].every((item) => item)
                                            }
                                            onChange={handleParentChange(category)}
                                            mr={6}
                                            colorScheme="facebook"
                                        >
                                            전체
                                        </Checkbox>

                                        {categories[category].map((item, index) => (
                                            <Checkbox
                                                key={category + index}
                                                isChecked={checkedOptions[category][index]}
                                                onChange={handleChildChange(category, index)}
                                                mr={4}
                                                colorScheme="blackAlpha"
                                            >
                                                {item}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </Stack>
                            ))}
                        </div>
                        <hr></hr>
                        <Stack pl={5} mt={5} spacing={1} mb="5">
                            <BenefitRecommendResult></BenefitRecommendResult>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button disabled={!searchFlag} colorScheme="facebook" onClick={handleSearchAction}>
                            조회
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default BenefitRecommend;
