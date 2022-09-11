export const arrayBufferToIterable = (array: ArrayBuffer): number[] =>
  Array.from(new Uint8Array(array));

export const stringifyWithBigint = (object: any): string =>
  JSON.stringify(
    object,
    (_, v) => (typeof v === "bigint" ? v.toString() : v),
    2
  );
