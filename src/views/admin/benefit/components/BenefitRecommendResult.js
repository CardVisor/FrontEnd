import { forwardRef, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
//import { styled } from './stitches.config';
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { styled } from "styled-components";
import NFTBenefit from "./NFTBenefit";
import axios from "axios";

const DragNDropWrapper = styled.div`
  //width: 50%;
  display: table-cell;
  & .cateBody {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  & .cateStaticWrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const CardUnitWrap = styled.div`
  //width: 50%;
  display: table-cell;
  padding-left: 10px;
  & .subTitle.cardTit {
    display: flex;
    justify-content: space-between;
    & .btnValChk {
      font-size: 14px;
      height: 38px;
      border-radius: 15px;
    }
    & p {
      color: #e52c2c;
      text-align: right;
      margin: 10px 15px -18px 0;
      font-size: 26px;
    }
  }
  & .cardUnitBody {
    padding: 10px 7px;
    & .cardUnit {
      border: 1px solid #ddd;
      border-radius: 10px;
      & + .cardUnit {
        margin-top: 15px;
      }
    }
  }
`;

const BenefitRecommendResult = forwardRef(({ data }, responseRef) => {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  const [columns, setColumns] = useState({});
  const [newCombination, setNewCombination] = useState([]);
  const [combival, setCombival] = useState(0);
  const [curRankVal, setCurRankVal] = useState(0);
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    const newData = {};
    for (let category in data) {
      newData[category] = {
        id: category,
        list: data[category].map((item, index) => ({
          ...item,
          originalCategory: category,
          originalIndex: index,
        })),
      };
    }
    newData["신규 조합"] = {
      id: "신규 조합",
      list: [],
    };
    setColumns(newData);
    setNewCombination([]);
  }, [data]);

  useEffect(() => {
    console.log("조합배열: Combination에서 호출");
    console.log("newCombination", newCombination);
    let combiSum = 0;

    newCombination.forEach((data, i) => {
      let curCombiIdx = data.card_benefit_info.length;
      let curCombiSum = 0;
      data.card_benefit_info.forEach((d, i2) => {
        curCombiSum += d.expectedBenefitValue;
      });
      combiSum += curCombiSum / curCombiIdx;
    });

    setCombival(combiSum.toFixed(0));
  }, [newCombination]);

  const handleSecondAction = () => {
    setSearchState(true);
    axios({
      url: API_SERVER + "/benefitCluster/benefitCombination",
      method: "post",
      data: { combival: combival },
    })
      .then((res) => {
        console.log(res.data);
        setCurRankVal(res.data[res.data.length - 1].cur_rank_val);
        setSearchState(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchState(false);
      });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const start = columns[source.droppableId];
    const startList = [...start.list];
    const draggedItem = startList.splice(source.index, 1)[0];

    if (!destination && start.id === "신규 조합") {
      const end = columns[draggedItem.originalCategory];
      const endList = [...end.list];
      endList.splice(draggedItem.originalIndex, 0, draggedItem);
      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          list: startList,
        },
        [end.id]: {
          ...end,
          list: endList,
        },
      });

      setNewCombination((prev) =>
        prev.filter(
          (item) => item.benefit_detail !== draggedItem.benefit_detail
        )
      );
      return;
    }

    //아이템이 원래의 위치로 돌아갈 때를 확인하는 조건
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // "신규 조합" 컬럼에 아이템이 4개 이상이면 아이템이 드롭되지 않도록 처리
    if (
      destination.droppableId === "신규 조합" &&
      columns["신규 조합"].list.length >= 3
    ) {
      startList.splice(source.index, 0, draggedItem);
      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          list: startList,
        },
      });
      return;
    }

    if (
      (draggedItem.originalCategory !== destination.droppableId &&
        destination.droppableId !== "신규 조합") ||
      (source.droppableId === draggedItem.originalCategory &&
        source.droppableId === destination.droppableId)
    ) {
      startList.splice(source.index, 0, draggedItem);
      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          list: startList,
        },
      });
      return;
    }

    const end = columns[destination.droppableId];
    const endList = start.id === end.id ? startList : [...end.list];

    // "신규 조합"에서 아이템이 원래의 위치로 돌아갑니다.
    if (start.id === "신규 조합" && end.id === draggedItem.originalCategory) {
      endList.splice(draggedItem.originalIndex, 0, draggedItem);
    } else {
      endList.splice(destination.index, 0, draggedItem);
    }

    //신규조합에 들어가는 배열을 나중에 setting 하기 위한 영역
    if (
      destination.droppableId === "신규 조합" &&
      source.droppableId !== "신규 조합"
    ) {
      setNewCombination((prev) => [...prev, draggedItem]);
    } else if (
      source.droppableId === "신규 조합" &&
      destination.droppableId !== "신규 조합"
    ) {
      setNewCombination((prev) =>
        prev.filter(
          (item) => item.benefit_detail !== draggedItem.benefit_detail
        )
      );
    }
    setColumns({
      ...columns,
      [start.id]: {
        ...start,
        list: startList,
      },
      [end.id]: {
        ...end,
        list: endList,
      },
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DragNDropWrapper ref={responseRef}>
          <Box className="subTitle cateTit">Category</Box>
          <Box className="cateBody">
            <Box className="cateWrap cateStaticWrap">
              {Object.values(columns)
                .filter((col) => col.id !== "신규 조합")
                .map((col) => (
                  <Column col={col} key={col.id} />
                ))}
            </Box>
            <Box className="cateWrap cateBasketWrap">
              {Object.values(columns)
                .filter((col) => col.id === "신규 조합")
                .map((col) => (
                  <Fragment key={col.id}>
                    <Column col={col} key={col.id} combival={combival} />
                  </Fragment>
                ))}
            </Box>
          </Box>
        </DragNDropWrapper>
      </DragDropContext>
      {newCombination && Array.isArray(newCombination) && combival > 0 && (
        <>
          <CardUnitWrap className="cardUnitWrapper">
            <Box className="subTitle cardTit">
              Combination Result
              {newCombination && combival > 0 && (
                <Box ml="auto">
                  <Button
                    className="btnValChk"
                    colorScheme="facebook"
                    onClick={handleSecondAction}
                  >
                    기존 카드와 가치 평가
                  </Button>

                  {searchState ? (
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mr="20px"
                      mt="10px"
                    >
                      <Spinner />
                    </Box>
                  ) : (
                    curRankVal !== 0 && <Text>{curRankVal} 위</Text>
                  )}
                </Box>
              )}
            </Box>
            <Box className="cardUnitBody">
              {newCombination.map((benefit, index) => (
                <Box className="cardUnit" key={benefit.benefit_id}>
                  <NFTBenefit
                    data={benefit}
                    benefit_pct={benefit.benefit_pct}
                    benefit_detail={benefit.benefit_detail}
                  />
                </Box>
              ))}
            </Box>
          </CardUnitWrap>
        </>
      )}
    </>
  );
});

export default BenefitRecommendResult;
