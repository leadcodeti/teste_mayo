import { CSpinner } from "@coreui/react";
import { Loading } from "./loadingStyle";

interface loadingProps {
  fontSize: number;
  color: string;
  size:string;
}

export function LoadingScrean({color, size, fontSize}: loadingProps) {
  return (
    <Loading color={color} fontSize={fontSize}>
      {size === "sm" ?<CSpinner component="span" size="sm"/> : <CSpinner component="span"/>}
    </Loading>
   
  )
}