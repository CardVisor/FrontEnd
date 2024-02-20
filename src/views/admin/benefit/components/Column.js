import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "./stitches.config";

const StyledColumn = styled("div", {
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  marginTop: 8,

  h2: {
    margin: 0,
    padding: "0 16px",
  },
});

const StyledList = styled("div", {
  backgroundColor: "#ddd",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
});

function Column({ col }) {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <StyledColumn>
          <h2>{col.id}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {col.list.slice(0, 3).map((item, index) => (
              <Item key={item.benefit_id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </StyledList>
        </StyledColumn>
      )}
    </Droppable>
  );
}

export default Column;
