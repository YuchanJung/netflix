import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IAngleProps {
  direction: "left" | "right" | "up" | "down";
  className: string;
}

function returnIcon(direction: "left" | "right" | "up" | "down") {
  let icon: IconDefinition;
  if (direction === "left") icon = faAngleLeft;
  else if (direction === "right") icon = faAngleRight;
  else if (direction === "up") icon = faAngleUp;
  else icon = faAngleDown; // direction === "down"
  return icon;
}

function AngleIcon({ direction, className }: IAngleProps) {
  const icon = returnIcon(direction);
  return <FontAwesomeIcon icon={icon} className={className} />;
}

export default AngleIcon;
