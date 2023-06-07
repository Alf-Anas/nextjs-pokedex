const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function addPrefix(url: string) {
  return `${prefix}${url}`;
}
