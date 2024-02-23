import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

const CateUnitWrap = styled.div`
    padding: 10px 7px;

    &.basketItem {
      background-coloe: pink;
    }

    & .cateUnitTit {
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 5px;
        padding-left: 5px;
    }
    & .cateUnitBody {
        min-height: 200px;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px;
    }
    & .cateUnitFoot {
        font-size: 14px;
        background: #fffad0;
        & span {
            color: #3f51b5;
            font-size: 18px;
            font-weight: bold;
        } 
    }
`;

const formatNumber = (number) => {
  if (number > 0) {
      return new Intl.NumberFormat('ko-KR').format(number);
  } else if (number === 0) {
      return '-';
  }
};

function Column({ col }) {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <CateUnitWrap className={col.id === "신규 조합" ? "basketItem" : ""}>
              <h2 className="cateUnitTit">{col.id}</h2>
              <Box className="cateUnitBody" {...provided.droppableProps} ref={provided.innerRef}
                  
              >
                  {col.list.slice(0, 3).map((item, index) => (
                    <Item key={item.benefit_id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                  {col.id === "신규 조합" && <span className="cateUnitFoot">카드 조합에 따른 혜택<br />가치 합:&nbsp;&nbsp;<span>{formatNumber(226111)}</span>&nbsp;원</span>}
              </Box>
          </CateUnitWrap>
      )}
    </Droppable>
  );
}

export default Column;
