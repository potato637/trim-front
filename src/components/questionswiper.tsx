import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getData, HomeDataStateI } from "../recoil/data";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 0px;
  height: 100px;
  overflow-wrap: break-word;
  background-color: #fbfbfb;
  color: #000;
  cursor: pointer;
  transition: 200ms;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 0.5rem;
  padding: 10px;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  .pagination {
    font-size: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  .pagination li {
    cursor: pointer;
  }
`;

function Items({ currentItems }: { currentItems: HomeDataStateI[] }) {
  const navigate = useNavigate();

  const itemClickHandler = (itemId: string) => {
    navigate(itemId);
  };

  return (
    <>
      <GridContainer>
        {currentItems &&
          currentItems.map((item, index) => (
            <ItemContainer onClick={() => itemClickHandler(item.createDate)}>
              <h2 key={index}>{item.title}</h2>
            </ItemContainer>
          ))}
      </GridContainer>
    </>
  );
}

export default function QuestionSwiper({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const data = useRecoilValue(getData("question"));
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <Container>
      <Items currentItems={currentItems} />
      <PaginationContainer>
        <ReactPaginate
          breakLabel="..."
          pageCount={pageCount}
          nextLabel=">"
          previousLabel="<"
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="selected"
        />
      </PaginationContainer>
    </Container>
  );
}
