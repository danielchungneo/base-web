export const INPUT_MASK_NAMES = {
  // number masks
  PHONE: "phone",
  FAX: "fax",
  ZIP: "zip",

  // alphabet masks
  STATE: "state",
};

export const INPUT_MASK_FORMATS = {
  // react-number-format lib
  [INPUT_MASK_NAMES.PHONE]: "(###) ###-####",
  [INPUT_MASK_NAMES.FAX]: "(###) ###-####",
  [INPUT_MASK_NAMES.ZIP]: "#####",

  // react-input-mask lib
  [INPUT_MASK_NAMES.STATE]: "aa",
};

export const INPUT_MASK_DEFAULT_CHAR = "_";
