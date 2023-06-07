export function safeArray(arr: any, defaultValue = []) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr;
  }
  return defaultValue;
}

export function safeObject(obj: any, defaultValue = {}) {
  if (!!obj && typeof obj === "object") {
    return obj;
  }
  return defaultValue;
}

export function safeString(str: any, defaultValue = "") {
  if (!!str && typeof str === "string") {
    return str;
  }
  return defaultValue;
}

export function safeNumber(num: any, defaultValue = 0) {
  if (typeof num === "number") {
    return num;
  }
  return defaultValue;
}

export const capitalized = (str: string) => {
  if (typeof str === "string") {
    const uppercase = str.replace(/(^|[\s-])\S/g, (match) =>
      match.toUpperCase()
    );
    return uppercase.replaceAll("-", " ");
  }
  return "";
};
