export const capitalized = (str: string) => {
  if (typeof str === "string") {
    const uppercase = str.replace(/(^|[\s-])\S/g, (match) =>
      match.toUpperCase()
    );
    return uppercase.replaceAll("-", " ");
  }
  return "";
};

export const errorResponse = (err: never | any) => {
  let msg = "";

  if (err.response) {
    if (err.response.data?.message) {
      msg = err.response.data?.message;
    } else if (err.response?.data) {
      msg = err.response.data;
    } else if (err.response?.status) {
      msg = err.response.status;
    }
  } else if (typeof err === "string") {
    msg = err;
  }
  return msg;
};

export function safeObject(obj: any, defaultValue = {}) {
  if (!!obj && typeof obj === "object") {
    return obj;
  }
  return defaultValue;
}
