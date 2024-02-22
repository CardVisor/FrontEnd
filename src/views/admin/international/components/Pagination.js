import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const PagingUl = styled.ul`
    display: flex;
    justify-content: center;
    gap: 5px;
    padding: 5px 0 25px;
    margin: 0;

    & ul,
    li {
        list-style: none;
    }
    & li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        background: transparent;
        transition: 0.3s;
        cursor: pointer;
        border: 1px solid #eaeaea;
        color: #555;
        &:not([data-disabled="disabled"]):hover {
            border: 1px solid #5e3aff;
            color: #000;
        }
        &[data-disabled="disabled"] {
            cursor: auto;
        }
    }
    & .activePage {
        border: 1px solid #5e3aff;
        color: #000;
    }
`;

function Pagination({
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    firstPageText,
    prevPageText,
    lastPageText,
    nextPageText,
    handlePageChange,
    maxItems,
}) {
    // 페이지 버튼 총 길이
    const totalLength =
        Math.ceil(totalItemsCount / itemsCountPerPage) < 1
            ? 1
            : Math.ceil(totalItemsCount / itemsCountPerPage);
    // 버튼 총 길이를 배열로 생성
    const pagingArray = Array.from(
        {
            length: totalLength,
        },
        (item, index) => index
    );

    // 현재 페이지가 바뀔때마다.
    // 페이지 묶음의 몇 번째인지 설정
    const [listNum, setListNum] = useState(1);
    useEffect(() => {
        setListNum(
            Math.floor(parseInt((activePage + maxItems - 1) / maxItems))
        );
    }, [activePage]);

    // 한 묶음에 보여줄 페이지 넘버
    const listNumIndex =
        listNum === 1
            ? Array.from(
                  {
                      length: maxItems,
                  },
                  (item, index) => {
                      return index;
                  }
              )
            : Array.from(
                  {
                      length: maxItems,
                  },
                  (item, index) => {
                      return index + maxItems * (listNum - 1);
                  }
              );

    const arrowDisabled1 =
        activePage <= maxItems ? { "data-disabled": "disabled" } : {};
    const arrowDisabled2 =
        activePage + maxItems > pagingArray.length
            ? { "data-disabled": "disabled" }
            : {};

    return (
        <PagingUl>
            {pagingArray.length > 1 && (
                <>
                    <li
                        {...arrowDisabled1}
                        onClick={() => {
                            if (activePage > maxItems) {
                                handlePageChange(1);
                            }
                        }}
                        style={
                            activePage <= maxItems
                                ? { backgroundColor: "#e5e5e5", color: "#fff" }
                                : null
                        }
                    >
                        {firstPageText}
                    </li>
                    <li
                        {...arrowDisabled1}
                        onClick={() => {
                            if (activePage > maxItems) {
                                let newPage =
                                    activePage % maxItems === 1
                                        ? activePage - maxItems
                                        : activePage -
                                          (activePage % maxItems) +
                                          1 -
                                          maxItems;
                                handlePageChange(newPage);
                            }
                        }}
                        style={
                            activePage <= maxItems
                                ? { backgroundColor: "#e5e5e5", color: "#fff" }
                                : null
                        }
                    >
                        {prevPageText}
                    </li>
                    {pagingArray.map((item, index) => {
                        if (
                            listNumIndex[0] <= index &&
                            index <= listNumIndex[listNumIndex.length - 1]
                        ) {
                            if (index + 1 === activePage) {
                                return (
                                    <li
                                        key={item}
                                        id={index + 1}
                                        className="activePage"
                                        onClick={() => {
                                            handlePageChange(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </li>
                                );
                            } else {
                                return (
                                    <li
                                        key={item}
                                        id={index + 1}
                                        onClick={() => {
                                            handlePageChange(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </li>
                                );
                            }
                        }
                    })}
                    <li
                        {...arrowDisabled2}
                        onClick={() => {
                            if (activePage + maxItems <= pagingArray.length) {
                                let newPage =
                                    activePage % maxItems === 0
                                        ? activePage + 1
                                        : activePage +
                                          maxItems -
                                          (activePage % maxItems) +
                                          1;
                                handlePageChange(newPage);
                            }
                        }}
                        style={
                            activePage + maxItems > pagingArray.length
                                ? { backgroundColor: "#e5e5e5", color: "#fff" }
                                : null
                        }
                    >
                        {nextPageText}
                    </li>
                    <li
                        {...arrowDisabled2}
                        onClick={() => {
                            if (activePage + maxItems <= pagingArray.length) {
                                handlePageChange(pagingArray.length);
                            }
                        }}
                        style={
                            activePage + maxItems > pagingArray.length
                                ? { backgroundColor: "#e5e5e5", color: "#fff" }
                                : null
                        }
                    >
                        {lastPageText}
                    </li>
                </>
            )}
        </PagingUl>
    );
}

export default Pagination;
