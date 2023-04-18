import { INPUT_MASK_DEFAULT_CHAR } from "@/constants/inputMasks";
import { GenericObject } from "@/types";
import { cloneDeep } from "lodash";
import * as Yup from "yup";

/* eslint-disable no-restricted-globals */
export const transformNumberValuetoNull = (value: any): null | number =>
  isNaN(value) || value === "" || value === null ? null : value;

export const yupRegex = {
  password: /^.*(?=.*\d)(?=.*[A-Z])(?=.*\W).*$/,
  state: /^[A-Z]{2}$/,
  phone:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  url: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
};

export const yupTests = {
  password: (required: boolean) => (password: any) => {
    if (!required && !password) {
      return true;
    }

    return password?.length >= 6 && password?.match(yupRegex.password);
  },

  zip: (maskCharacter: string) => (zip: null | string) =>
    !zip?.includes(maskCharacter),
};

export const yupTransformations = {
  phone: (currentValue) =>
    !currentValue ? null : currentValue.replace(/[^\d]/g, ""), // transform to only numbers or null (to work with .nullable() chain)
  nullableNumber: (value: any): null | undefined | string | number =>
    isNaN(value) || value === "" || value === null ? null : value,
  nullableString: (value: any): null | undefined | string =>
    !value && typeof value !== "string" ? null : value,
  nullableBoolean: (value: any) =>
    value !== true && value !== false ? null : value,

  nullableDate: (curr, orig) => (orig === "" ? null : curr),
};

// schemas with commoon decorators in place so we don't have to type them every time and all forms act the same
export const commonYupSchemas = {
  /**
   * BUILT-IN TYPES
   */
  string: Yup.string().typeError("Required"),
  nullableString: Yup.string()
    .nullable()
    .transform(yupTransformations.nullableString),

  number: Yup.number().nullable().transform(yupTransformations.nullableNumber),
  nullableNumber: Yup.number()
    .nullable()
    .transform(yupTransformations.nullableNumber),

  date: Yup.date()
    .transform(yupTransformations.nullableDate)
    .nullable()
    .typeError("Required"),
  nullableDate: Yup.date()
    .transform(yupTransformations.nullableDate)
    .nullable(),

  boolean: Yup.boolean()
    .transform(yupTransformations.nullableBoolean)
    .default(false)
    .nullable(),

  array: Yup.array(),
  object: Yup.object(),

  /**
   * CUSTOM TYPES
   */
  phone: Yup.string()
    .transform(yupTransformations.phone)
    .matches(yupRegex.phone, {
      message: "Phone does not match the required pattern",
      excludeEmptyString: true,
    })
    .nullable()
    .length(10, "Phone must be 10 digits"),
  fax: Yup.string()
    .transform(yupTransformations.phone)
    .matches(yupRegex.phone, {
      message: "Fax does not match the required pattern",
      excludeEmptyString: true,
    })
    .nullable()
    .length(10, "Fax must be 10 digits"),

  email: Yup.string()
    .email("Email does not match the required pattern")
    .nullable(),
  url: Yup.string()
    .nullable()
    .transform(yupTransformations.nullableString)
    .matches(yupRegex.url, {
      message: "Invalid URL",
      excludeEmptyString: true,
    }),

  state: Yup.string()
    .length(2, "State must be 2 uppercase characters")
    .matches(yupRegex.state, {
      message: "State must be 2 uppercase letters",
      excludeEmptyString: true,
    }),

  zip: Yup.string()
    .length(5, "Zip must be 5 digits")
    .test(
      "zip",
      "Zip code must be 5 digits",
      yupTests.zip(INPUT_MASK_DEFAULT_CHAR)
    ),

  password: (required: boolean) =>
    Yup.string().test(
      "test password",
      "Password does not meet requirements",
      yupTests.password(required)
    ),
};

interface IGetYupSchema {
  nestedFormsToInclude?: GenericObject;
  removeRequiredFields?: string[];
  addRequiredFields?: string[];
}

export interface IEntityFormValidationClass {
  baseSchema: { [key: string]: Yup.AnySchema };
  nestedForms?: { [key: string]: any };
  defaultRequiredFields?: (string | [string, string])[];
  // getYupSchema?: (props: IGetYupSchema) => Yup.ObjectSchema<any>;
}

export class EntityFormValidationClass implements IEntityFormValidationClass {
  baseSchema: IEntityFormValidationClass["baseSchema"];
  nestedForms: IEntityFormValidationClass["nestedForms"];
  defaultRequiredFields: IEntityFormValidationClass["defaultRequiredFields"];

  constructor({
    baseSchema,
    nestedForms,
    defaultRequiredFields,
  }: IEntityFormValidationClass) {
    //
    this.baseSchema = baseSchema;
    this.nestedForms = nestedForms;
    this.defaultRequiredFields = defaultRequiredFields || [];
  }

  public getYupSchema = (props?: IGetYupSchema): any => {
    const {
      nestedFormsToInclude = {},
      addRequiredFields = [],
      removeRequiredFields = [],
    } = props || {};

    let schema = cloneDeep(this.baseSchema);

    this.defaultRequiredFields
      .concat(addRequiredFields)
      .filter(
        (field: string) =>
          !removeRequiredFields.includes(
            Array.isArray(field) ? field[0] : field
          )
      )
      .forEach((field: string) => {
        const fieldName = Array.isArray(field) ? field[0] : field;
        const message = Array.isArray(field) ? field[1] : "Required";

        schema[fieldName] = schema[fieldName].required(message);
      });

    if (nestedFormsToInclude && this.nestedForms) {
      Object.keys(nestedFormsToInclude).forEach((key) => {
        try {
          const nestedFormConfig = this.nestedForms[key];

          if (!!nestedFormConfig) {
            const nestedFormArgs: IGetYupSchema["nestedFormsToInclude"] = {};

            if (typeof nestedFormsToInclude[key] === "object") {
              nestedFormArgs.nestedFormsToInclude = nestedFormsToInclude[key];
            }

            const nestedFormSchema =
              nestedFormConfig?.form?.validation?.getYupSchema(nestedFormArgs);

            const finalNestedFormSchema = nestedFormConfig?.array
              ? Yup.array().of(nestedFormSchema)
              : nestedFormSchema;

            if (finalNestedFormSchema) {
              schema = {
                ...schema,
                [key]: finalNestedFormSchema,
              };
            }
          }
        } catch (error) {
          //
        }
      });
    }

    return Yup.object().shape(schema);
  };
}
