import { getDirtyValues } from "@/utils/form";
import debounce from "lodash/debounce";
import { useCallback } from "react";
import useDeepEffect from "./useDeepEffect";
import useLocalStorage from "./useLocalStorage";

export default function useUnsavedValues(
  localStorageKey: any,
  formMethods: any
) {
  // Local Storage
  const [isEditing, setIsEditing] = useLocalStorage(
    `${localStorageKey}: isEditing`,
    false
  );
  const [unsavedValues, setUnsavedValues] = useLocalStorage(
    `${localStorageKey}: unsavedValues`,
    {}
  );

  // Form Methods
  const {
    formState: { dirtyFields },
    reset,
    watch,
    setValue,
  } = formMethods;
  const isDirty = Object.keys(unsavedValues).length > 0;

  // Watch Values
  const allValues = watch();

  const debounceHandler = useCallback(
    debounce((newUnsavedValues) => {
      setUnsavedValues(newUnsavedValues);
    }, 500),
    []
  );

  useDeepEffect(() => {
    if (Object.keys(dirtyFields).length > 0) {
      debounceHandler(getDirtyValues(dirtyFields, allValues));
    }

    if (Object.keys(dirtyFields).length === 0) {
      debounceHandler({});
    }
  }, [allValues]);

  // Event Handlers
  function onCancelUnsavedValues() {
    setIsEditing(false);
    setUnsavedValues({});
  }

  function onErrorUnsavedValues() {
    reset({}, { keepDirty: true, keepValues: true });
  }

  function onSuccessUnsavedValues() {
    reset({}, { keepValues: true });
    setIsEditing(false);
    setUnsavedValues({});
  }

  // Restore Unsaved Values
  function restoreUnsavedValue(key, value) {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      restoreUnsavedValues(value, key);
    } else if (Object.prototype.toString.call(value) === "[object Array]") {
      value.forEach((item, index) => {
        restoreUnsavedValues(item, `${key}[${index}]`);
      });
    } else {
      setValue(key, value, {
        shouldDirty: true,
      });
    }
  }

  function restoreUnsavedValues(values, parentKey = null) {
    Object.keys(values).forEach((key) => {
      const combinedKey = parentKey ? `${parentKey}.${key}` : key;
      restoreUnsavedValue(combinedKey, values[key]);
    });
  }

  function restoreUnsavedForm(formValues) {
    reset(formValues, { keepDefaultValues: false });
    restoreUnsavedValues(unsavedValues);
  }

  return {
    isDirty,
    isEditing,
    setIsEditing,
    onSuccessUnsavedValues,
    onErrorUnsavedValues,
    onCancelUnsavedValues,
    restoreUnsavedForm,
  };
}
