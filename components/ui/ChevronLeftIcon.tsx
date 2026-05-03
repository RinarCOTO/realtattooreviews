import { FiChevronLeft } from "react-icons/fi";

type ChevronLeftIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export default function ChevronLeftIcon({
  className = "size-4 shrink-0",
  "aria-hidden": ariaHidden = true,
}: ChevronLeftIconProps) {
  return <FiChevronLeft aria-hidden={ariaHidden} className={className} />;
}
