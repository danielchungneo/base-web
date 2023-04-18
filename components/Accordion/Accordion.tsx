import { IAccordion } from "@/types/components/displayComponents";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const Accordion = ({
  className,
  items,
  keyExtractor,
  renderTitle,
  renderContent,
  showLineNumbers = true,
}: IAccordion) => {
  return (
    <div className={className}>
      {items.map((item: any, index: number) => (
        <Disclosure
          key={keyExtractor?.(item, index) ?? `accordion-item-${index}`}
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between bg-gray-100 px-4 py-4 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-200 focus-visible:ring-opacity-75 first:rounded-t-lg last:rounded-b-lg border-l-gray-100 border-r-gray-100">
                <div className="w-full flex flex-row">
                  {showLineNumbers && (
                    <span className="mr-2">{index + 1}.</span>
                  )}

                  {renderTitle(item, index)}
                </div>

                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="p-4 text-sm text-gray-500 border border-gray-100 last:rounded-b-lg">
                {renderContent(item, index)}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
