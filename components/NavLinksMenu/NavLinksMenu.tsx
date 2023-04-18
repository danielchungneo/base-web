import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";

const NavLinksMenu = ({
  title,
  items = [],
  itemsClassName = "",
  itemActiveClassName = "bg-slate-200",
  itemInactiveClassName = "text-gray-900",
  buttonClassName = "",
  menuClassName = "",
  showDropdownIcon = true,
  itemsPosition = "left",
  icon: Icon,
}) => {
  return (
    <Menu as="div" className={clsx("relative text-left", menuClassName)}>
      <Menu.Button
        className={clsx(
          `flex ${
            title ? "justify-between" : "justify-center"
          }  w-full rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
          buttonClassName
        )}
      >
        <span className="flex items-center">
          {Icon && <Icon className={`h-5 w-5 ${title ? "mr-2" : "mr-0"}`} />}
          {title}
        </span>
        {!!items.length && showDropdownIcon && (
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
        )}
      </Menu.Button>

      {!!items.length && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={clsx(
              "absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
              itemsPosition === "left"
                ? "left-0"
                : itemsPosition === "right"
                ? "right-0"
                : "",
              itemsClassName
            )}
          >
            <div className="px-1 py-1 ">
              {items.map((item, itemIndex) => {
                return (
                  <Menu.Item key={`menu-item-index-${itemIndex}`}>
                    {(props) => {
                      const { active } = props;

                      return (
                        <button
                          className={clsx(
                            "group flex w-full items-center rounded-md text-sm",
                            active ? itemActiveClassName : itemInactiveClassName
                          )}
                        >
                          {typeof item === "function" ? item(props) : item}
                        </button>
                      );
                    }}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default NavLinksMenu;
