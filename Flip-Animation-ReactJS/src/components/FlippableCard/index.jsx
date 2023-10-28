import { useState } from "react";
import Card from "../Card";
import "./flippableCard.css";

import { CSSTransition } from "react-transition-group";

export default function FlippableCard() {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="flippableCardContainer">
      <CSSTransition in={showFront} timeout={2000} classNames="flip">
        <Card
          onClick={() => {
            setShowFront((prev) => !prev);
          }}
        />
      </CSSTransition>
    </div>
  );
}
