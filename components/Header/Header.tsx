import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Authorization from "../Authorization";
import EnvironmentSwitcher from "../EnvironmentSwitcher/EnvironmentSwitcher";
import NavLinksMenu from "../NavLinksMenu";

const UserNavigationAction = (props: any) => {
  const { href, children, ...rest } = props;

  const linkClassName = "block text-sm w-full text-left p-2";

  if (!href) {
    return (
      <div role="button" className={linkClassName} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Link href={href} className={linkClassName} {...rest}>
      {children}
    </Link>
  );
};

const Brand = ({ light = false }) => {
  return (
    <span
      className={clsx(
        "rounded-circle",
        light ? "bg-primary text-white" : "bg-light text-primary"
      )}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        width: 45,
        borderRadius: 45,
        fontSize: "1.25rem",
        fontWeight: 700,
      }}
    >
      MC
    </span>
  );
};

export default function Header({ navigation, user }) {
  const router = useRouter();

  return (
    <>
      <Popover as="header" className="bg-primary py-9 lg:py-0">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex-shrink-0 py-4 lg:static">
                  <div
                    className="flex flex-row items-center space-x-6"
                    style={{
                      wordSpacing: "-2px",
                    }}
                  >
                    <Brand />

                    <div className="hidden lg:flex flex-row space-x-3">
                      {navigation.main.map((link) =>
                        "children" in link ? (
                          <NavLinksMenu
                            key={link.name}
                            title={link.name}
                            buttonClassName="px-3 py-2 hover:bg-white/10"
                            items={link.children.map((child) => (
                              <Authorization
                                key={`${link.name}__${child.href}`}
                                authorization={child.authorization}
                              >
                                <Link
                                  href={child.href}
                                  passHref
                                  className="w-full text-left p-2"
                                >
                                  {child.name}
                                </Link>
                              </Authorization>
                            ))}
                          />
                        ) : (
                          <Authorization
                            key={link.name}
                            authorization={link.authorization}
                          >
                            <NavLinksMenu
                              title={
                                <Link
                                  href={link.href}
                                  passHref
                                  className={clsx(
                                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10",
                                    router.pathname === link.href
                                      ? "bg-black/10"
                                      : "bg-primary"
                                  )}
                                >
                                  {link.name}
                                </Link>
                              }
                            />
                          </Authorization>
                        )
                      )}

                      <EnvironmentSwitcher showIcon={false} />
                    </div>
                  </div>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-4 lg:pr-0.5">
                  {/* Profile dropdown */}
                  <NavLinksMenu
                    menuClassName="ml-4"
                    buttonClassName="flex rounded-full overflow-hidden text-sm focus:outline-none focus:ring-opacity-100"
                    showDropdownIcon={false}
                    itemsPosition="right"
                    title={
                      <>
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="h-8 w-8 text-white" />
                      </>
                    }
                    items={navigation.user[0].children.map(
                      (link) =>
                        ({ active, ...rest }) => {
                          return (
                            <UserNavigationAction
                              key={link.name}
                              href={link.href}
                              onClick={link.onClick}
                              {...rest}
                            >
                              {link.name}
                            </UserNavigationAction>
                          );
                        }
                    )}
                  />
                </div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                  >
                    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <Brand light />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {navigation.main.map((link) =>
                            "children" in link ? (
                              <Disclosure key={link.name}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-3 py-2 text-left text-base font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                                      <span>{link.name}</span>

                                      <ChevronUpIcon
                                        className={`${
                                          open ? "" : "rotate-180 transform"
                                        } h-5 w-5 text-blue-500`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="text-gray-500 bg-gray-100 rounded-xl p-2">
                                      {link.children.map((childLink) => (
                                        <a
                                          key={childLink.name}
                                          href={childLink.href}
                                          className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900"
                                        >
                                          {childLink.name}
                                        </a>
                                      ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ) : (
                              <a
                                key={link.name}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                              >
                                {link.name}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                      <div className="pb-2">
                        <div className="mt-3 space-y-1 px-2">
                          {navigation.user[0].children.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                              onClick={item.onClick}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
    </>
  );
}
