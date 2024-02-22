import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

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
    return (
        <PagingUl>
        <li
            onClick={() => {
                if (activePage !== 1) {
                    handlePageChange(activePage - 1);
                }
            }}
            style={activePage === 1 ? { backgroundColor: "#e9e9e9" } : null}
        >
            {firstPageText}
        </li>
            <li
                onClick={() => {
                    if (activePage !== 1) {
                        handlePageChange(activePage - 1);
                    }
                }}
                style={activePage === 1 ? { backgroundColor: "#e9e9e9" } : null}
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
                onClick={() => {
                    if (activePage !== pagingArray.length) {
                        handlePageChange(activePage + 1);
                    }
                }}
                style={
                    activePage === pagingArray.length
                        ? { backgroundColor: "#e9e9e9" }
                        : null
                }
            >
                {nextPageText}
            </li>
            <li
                onClick={() => {
                    if (activePage !== pagingArray.length) {
                        handlePageChange(activePage + 1);
                    }
                }}
                style={
                    activePage === pagingArray.length
                        ? { backgroundColor: "#e9e9e9" }
                        : null
                }
            >
                {lastPageText}
            </li>
        </PagingUl>
    );
}

export default Pagination;

const PagingUl = styled.ul`
    margin: auto;
    margin-top: 50px;
    width: 300px;
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
    align-items: center;

    & ul,
    li {
        list-style: none;
    }
    & li {
        width: 35px;
        height: 35px;
        text-align: center;
        font-size: 25px;
        border-radius: 5px;
        background-color: rgb(216, 236, 252);
        transition: 0.6s;
        cursor: pointer;
        &:hover {
            color: white;
            background-color: rgb(60, 177, 255);
        }
    }
    & .activePage {
        color: white;
        background-color: rgb(60, 177, 255);
    }

    & li:first-child,
    li:last-child {
        background-color: rgb(162, 214, 253);
        &:hover {
            background-color: rgb(60, 177, 255);
        }
    }
`;
