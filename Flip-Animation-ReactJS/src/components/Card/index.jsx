import "./card.css";
import "./flipAnimation.css";

export default function Card({ onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="back">BACK</div>
      <div className="front">FRONT</div>
    </div>
  );
}
