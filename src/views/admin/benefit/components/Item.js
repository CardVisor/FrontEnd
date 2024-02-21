import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from './stitches.config';
import { Text } from '@chakra-ui/react';

const StyledItem = styled('div', {
    backgroundColor: '#eee',
    borderRadius: 4,
    padding: '4px 8px',
    transition: 'background-color .8s ease-out',
    marginTop: 8,

    ':hover': {
        backgroundColor: '#fff',
        transition: 'background-color .1s ease-in',
    },
});

function Item({ item, index }) {
    return (
        <Draggable draggableId={String(item.benefit_detail)} index={index}>
            {(provided) => (
                <StyledItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Text fontSize={13}>{item.benefit_detail}</Text>
                </StyledItem>
            )}
        </Draggable>
    );
}

export default Item;
