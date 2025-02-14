import { useParams } from "react-router-dom";

export default function Survey() {
  const { itemId } = useParams();

  return <h2>{itemId}</h2>;
}
