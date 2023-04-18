import _ from "lodash";

export const formatSelectBox = (
  valueFieldName: any,
  labelFieldName: any,
  array: any
) => {
  if (array) {
    return array.map((opt: any) => {
      return { id: opt[valueFieldName], name: opt[labelFieldName] };
    });
  }

  return null;
};

export const formatSelectSearch = (
  valueFieldName: string,
  labelFieldName: string,
  array: any
) => {
  if (array) {
    return array.map((object: any) => {
      const copy = { ...object };
      copy.value = _.get(copy, valueFieldName);
      copy.label = _.get(copy, labelFieldName);
      return copy;
    });
  }

  return null;
};

export const createFormData = (object) => {
  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    if (key === "files" && object[key]) {
      object[key].forEach((x, i) => {
        formData.append("files", object[key][i]);
      });
    } else {
      formData.append(key, object[key]);
    }
  });

  return formData;
};

export const getDirtyValues = (dirtyFields, allValues) => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      getDirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
};
