import Button from "@/components/Buttons/Button/Button";
import { IButton } from "@/types/components/inputComponents";

type AddLineItemButtonProps = {
  onAppend: () => void;
  label?: string;
  disabled?: boolean;
  buttonProps?: IButton;
};

function AddLineItemButton ({
  onAppend,
  disabled,
  label,
  buttonProps,
}: AddLineItemButtonProps) {
  return (
    <Button
      variant="neutral"
      {...buttonProps}
      onClick={onAppend}
      disabled={disabled}
    >
      {label || "Add Line Item"}
    </Button>
  );
}

export default AddLineItemButton;
