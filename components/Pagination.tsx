import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface PaginationProps {
  totalPage: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({ totalPage, onChangePage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(totalPage);

  const handleChangePage = (num: number) => {
    setCurrentPage(num);
    onChangePage(num);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onChangePage(currentPage + 1);
    }
  };

  useEffect(() => {
    setTotalPages(totalPage);
  }, [totalPage]);

  const startIndex = Math.max(1, currentPage - 2);
  const endIndex = Math.min(totalPages, currentPage + 2);

  return (
    <View
      className="flex-row justify-center items-center mt-2 h-9 w-full overflow-x-scroll"
      style={{ gap: 8 }}
    >
      <TouchableOpacity
        className="h-[30px] w-[20px] bg-[#D3CFCF] rounded-[3px] flex justify-center items-center"
        onPress={handlePrevPage}
      >
        <AntDesign name="left" size={16} color="#000" />
      </TouchableOpacity>

      {endIndex-startIndex+1>0&&[...Array(endIndex - startIndex + 1)].map((item, index) => {
        const pageNumber = startIndex + index;
        if (pageNumber === currentPage) {
          return (
            <TouchableOpacity
              key={index}
              className="h-[30px] w-[20px] bg-[#FF7991] rounded-[3px] flex justify-center items-center"
              onPress={() => handleChangePage(pageNumber)}
            >
              <Text className="text-white">{pageNumber}</Text>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={index}
            className="h-[30px] w-[20px] bg-[#D3CFCF] rounded-[3px] flex justify-center items-center"
            onPress={() => handleChangePage(pageNumber)}
          >
            <Text>{pageNumber}</Text>
          </TouchableOpacity>
        );
      })}

      {endIndex < totalPages && (
        <TouchableOpacity
          className="h-[30px] w-[20px] bg-[#D3CFCF] rounded-[3px] flex justify-center items-center"
          onPress={() => handleChangePage(endIndex + 1)}
        >
          <Text>...</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className="h-[30px] w-[20px] bg-[#D3CFCF] rounded-[3px] flex justify-center items-center"
        onPress={handleNextPage}
      >
        <AntDesign name="right" size={16} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;