import React from "react";

interface Props {
  total: number;
  size: number;
  page: number;
}
const Showing = ({ total, size, page }: Props) => {
  return (
    <p className="text-sm">
      Showing <span className="font-semibold">{(page - 1) * size + 1}</span> to{" "}
      <span className="font-semibold">{Math.min(page * size, total)}</span> of{" "}
      <span className="font-semibold">{total}</span> results
    </p>
  );
};

export default Showing;
