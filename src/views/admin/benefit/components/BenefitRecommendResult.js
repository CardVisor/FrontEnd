import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { styled } from "./stitches.config";
import { Flex } from "@chakra-ui/react";
import { Fragment } from "react";

const StyledColumns = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  //   margin: "1vh auto",
  //   width: "80%",
  height: "100%",
  width: "50%",
  gap: "8px",
});
const Styledleff = styled("div", {
  height: "100rem",

  width: "0.005rem",
  border: "0.01rem solid",
  borderColor: "#000000",
  margin: "0.5rem",
});
// const DynamicStyledColumns = styled("div", {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr",
//   margin: "1vh auto",
//   width: "80%",
//   gap: "8px",
// });

function BenefitRecommendResult({ data, setNewCombination }) {
  const [columns, setColumns] = useState({});

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

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const start = columns[source.droppableId];
    const startList = [...start.list];
    const draggedItem = startList.splice(source.index, 1)[0];
    //움직인 요소의 console
    console.log(draggedItem);

    //아이템이 원래의 위치로 돌아갈 때를 확인하는 조건
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
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
        <Flex>
          <StyledColumns>
            {Object.values(columns)
              .filter((col) => col.id !== "신규 조합")
              .map((col) => (
                <Column col={col} key={col.id} />
              ))}
          </StyledColumns>
          <Styledleff />
          <Flex
            minHeight={150}
            maxHeight={300}
            position="fixed"
            minH="100%"
            left={1000}
          >
            {/* 신규조합 상자는 크기 제한이 없었으면 좋겠다. 최소 150이상 부터 가능하도록 */}
            {Object.values(columns)
              .filter((col) => col.id === "신규 조합")
              .map((col) => (
                <Fragment key={col.id}>
                  <Column col={col} key={col.id} />
                </Fragment>
              ))}
          </Flex>
        </Flex>
      </DragDropContext>
    </>
  );
}

export default BenefitRecommendResult;
