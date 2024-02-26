import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledItem = styled.div`
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: #fff;
    }
`;
const StyledTooltip = styled.div`
  font-size: 0.8em;
  background-color: #fff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 2px;
  color: #d2471b;
  transition: opacity 0.3s ease-in-out;
`;

const formatNumber = (number) => {
  if (number > 0) {
    return new Intl.NumberFormat("ko-KR").format(number);
  } else if (number === 0) {
    return "-";
  }
};

const pctFormatNumber = (number) => {
  if (number > 0) {
    const percent = (number * 100).toFixed(2);
    return new Intl.NumberFormat("ko-KR").format(percent);
  } else if (number === 0) {
    return "-";
  }
};
function Item({ item, index }) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  return (
    <>
      <Draggable draggableId={String(item.benefit_detail)} index={index}>
        {(provided, snapshot) => (
          <StyledItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <div style={{ fontSize: "14px" }} >
              {item.rank +
                "위  : " +
                item.benefit_detail +
                "(" +
                pctFormatNumber(item.benefit_pct) +
                "%)"}
              {isTooltipVisible && (
                <StyledTooltip
                  className={"tooltip" + String(item.benefit_detail)}
                >
                  {"(혜택 횟수 " +
                    formatNumber(item.cnt_benefit) +
                    " / 혜택 금액 " +
                    formatNumber(item.sum_benefit) +
                    ")"}
                </StyledTooltip>
              )}
            </div>
          </StyledItem>
        )}
      </Draggable>
    </>
  );
}

export default Item;
