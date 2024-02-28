import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const data = [
    {
        id: 1,
        title: "집에 가고싶어요",
        content: "너무 졸려 가고싶어요.",
    },
    {
        id: 2,
        title: "오늘은 뭐하지",
        content: "퇴근 하고 뭐할까??",
    },
    {
        id: 3,
        title: "저녁은 어떤거로?",
        content: "저녁은 치킨인가 피자인가 고민이다.",
    },
];

function DownloadExcel({ chartData }) {
    const handleDownload = () => {
        // 데이터를 엑셀 형식으로 변환합니다.
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = {
            Sheets: {
                data: worksheet,
            },
            SheetNames: ["data"],
        };

        // 엑셀 파일을 생성하고, 다운로드 받습니다.
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        saveAs(blob, "output.xlsx");
    };

    return (
        <>
            <Button
                disabled
                colorScheme="green"
                aria-label="엑셀로 내보내기"
                leftIcon={<FaRegFileExcel />}
                borderRadius="10px"
                w="auto"
                ml="10px"
                onClick={handleDownload}
            >
                다운로드
            </Button>
        </>
    );
}

export default DownloadExcel;
