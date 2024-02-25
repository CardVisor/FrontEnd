import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const CateUnitWrap = styled.div`
    padding: 10px 7px;
    &.basketItem {
      & .cateUnitBody {     
        display: flex;
        flex-direction: column;
        height: 100%;   
      }
      &.basketFixed {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        background: pink;
      }
    }
    & .cateUnitTit {
        position: relative;
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
        padding-left: 5px;
        & .tip {
          position: absolute;
          top: 50%;
          right: 0;
          font-size: 11px;
          transform: translateY(-50%);
          color: #ff6565;
          padding-right: 5px;
        }
    }
    & .cateUnitBody {
        min-height: 200px;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px;
        height: calc( 100% - 29px);
    }
    & .cateUnitFoot {
        margin-top: auto;
        align-self: flex-end;
        & span {
          font-size: 14px;
          background: #fffad0;
          & strong {
            color: #3f51b5;
            font-size: 18px;
            font-weight: bold;
          } 
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

function Column({ col, combival }) {


  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <CateUnitWrap id={col.id === "신규 조합" ? "combination" : null} className={col.id === "신규 조합" ? "basketItem" : ""}>
              <h2 className="cateUnitTit">{col.id}{col.id === "신규 조합" && <span className="tip">* 최대 3개 조합 가능</span>}</h2>
              <Box className="cateUnitBody" {...provided.droppableProps} ref={provided.innerRef}
                  
              >
                  {col.list.slice(0, 3).map((item, index) => (
                    <Item key={item.benefit_id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                  {col.id === "신규 조합" && combival > 0 && <div className="cateUnitFoot"><span>카드 조합에 따른 혜택<br />가치 합:&nbsp;&nbsp;<strong>{formatNumber(combival)}</strong>&nbsp;원</span></div>}
              </Box>
          </CateUnitWrap>
      )}
    </Droppable>
  );
}

export default Column;
