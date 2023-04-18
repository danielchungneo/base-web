import Accordion from "@/components/Accordion";
import AddLineItemButton from "@/components/Buttons/Button/AddLineItemButton";
import Label from "@/components/Label";

interface IFormFieldArray {
  title: string;
  className?: string;
  items: any[];
  renderAccordionTitle: (item: any, index: number) => any;
  renderAccordionContent: (item: any, index: number) => any;
  appendTitle?: string;
  appendDisabled?: boolean;
  onAppend: () => void;
}

const FormFieldArray = ({
  title,
  className,
  items,
  renderAccordionTitle,
  renderAccordionContent,
  //
  appendTitle,
  appendDisabled,
  onAppend,
}: IFormFieldArray) => {
  return (
    <div className={className}>
      <Label variant="h5">{title}</Label>
      {items.length === 0 && <Label variant="s5">None</Label>}

      <Accordion
        className="mt-1"
        items={items}
        renderTitle={renderAccordionTitle}
        renderContent={renderAccordionContent}
      />

      <div className="mt-2 text-center">
        <AddLineItemButton
          onAppend={onAppend}
          disabled={appendDisabled}
          label={appendTitle}
        />
      </div>
    </div>
  );
};

export default FormFieldArray;
