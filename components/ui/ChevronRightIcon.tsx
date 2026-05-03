import { FiChevronRight } from "react-icons/fi";

type ChevronRightIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export default function ChevronRightIcon({
  className = "size-4 shrink-0",
  "aria-hidden": ariaHidden = true,
}: ChevronRightIconProps) {
  return <FiChevronRight aria-hidden={ariaHidden} className={className} />;
}
