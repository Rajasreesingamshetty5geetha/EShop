"use client"; 

import { useSearchParams } from "next/navigation";

export default function ProductParams() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("someParam");

  return <div>{paramValue}</div>;
}
