import { IEntityId, IFontSizeVariant, IRequest } from "./common";

export interface IForm extends React.HTMLAttributes<HTMLFormElement> {
  //
}

export interface IFormLabel {
  id?: IEntityId;
  children: React.ReactNode;
  variant?: IFontSizeVariant;
}

export interface IFormActions {
  id?: IEntityId;
  request?: IRequest;
  loading?: boolean;
  saving?: boolean;
  onDeleteSuccess?: (response: any) => void;
  onDeleteError?: (error: any) => void;
  onCancel?: () => void;
  cancelButtonText?: string;
  saveButtonText?: string;
  deleteButtonText?: string;
}
