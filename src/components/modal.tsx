import { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { IsLoggedIn } from "../api";

const Container = styled.div``;
const modalStyle = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
    backgroundColor: "white",
    border: "2px solid rgb(240, 240, 240)",
    borderRadius: "12px",
    position: "absolute",
    height: "fit-content",
    width: "fit-content",
    left: "50%",
    top: "150px",
    transform: "translate(-50%, -50%)",
  },
};

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Container>
      <button onClick={openModal}>modal</button>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyle as any}
      >
        <h2>Here is a new Moda</h2>
        <p>It could tell the u</p>
      </ReactModal>
    </Container>
  );
}
