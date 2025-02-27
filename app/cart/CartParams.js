"use client"; 
import { useSearchParams } from "next/navigation";

export default function CartParams() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("someParam");

  return <div>{paramValue}</div>;
}
