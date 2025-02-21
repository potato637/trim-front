import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ItemBox = styled.div`
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  font-size: 1.2rem;
`;
const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Fake Data Generator
const generateItems = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => `Item ${start + i + 1}`);
};

export default function Swipertest() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  // Load initial items
  useEffect(() => {
    setItems(generateItems(0, itemsPerPage));
  }, []);

  // Function to load more items
  const loadMore = () => {
    const newItems = generateItems(items.length, itemsPerPage);
    setItems((prev) => [...prev, ...newItems]);
    setPage(page + 1);
  };

  return (
    <Container>
      <GridContainer>
        {items.map((item, index) => (
          <ItemBox key={index}>{item}</ItemBox>
        ))}
      </GridContainer>
      <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
    </Container>
  );
}
