import { PREFIX } from "@/constant/env";

export function addPrefix(url: string) {
  return `${PREFIX}${url}`;
}
