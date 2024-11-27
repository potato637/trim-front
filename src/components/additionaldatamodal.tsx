import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { additionalDataModalState } from "../recoil/userState";

const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export default function AdditionalDataModal() {
  const [additionalData, setAdditionalData] = useState("");
  const setAdditionalDAtaModalOpen = useSetRecoilState(
    additionalDataModalState
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAdditionalDAtaModalOpen(false);
    }
  };

  const handleSave = () => {
    // save or send to backend
    setAdditionalDAtaModalOpen(false);
  };

  return (
    <ModalOverLay onClick={handleCloseModal}>
      <ModalContent ref={modalRef}>
        <h2>Additional Info</h2>
        <Input
          type="text"
          placeholder="nickname"
          value={additionalData}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </ModalContent>
    </ModalOverLay>
  );
}
