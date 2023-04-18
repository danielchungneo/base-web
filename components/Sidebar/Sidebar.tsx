import { ENV } from "@/constants/config";
import { ENVIRONMENTS } from "@/constants/environments";
import useAuthorization from "@/utils/hooks/useAuthorization";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Authorization from "../Authorization";
import Button from "../Buttons/Button";
import EnvironmentSwitcher from "../EnvironmentSwitcher";
import NavLinksMenu from "../NavLinksMenu";

const NavigationAction = (props: any) => {
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

const Brand = ({
  textColor = "text-primary",
  minimizeSidebar = false,
  setMinimizeSidebar,
}) => {
  return (
    <Button
      variant="light"
      className="rounded w-full text-center bg-light"
      onClick={() => setMinimizeSidebar?.(!minimizeSidebar)}
    >
      {minimizeSidebar ? (
        <span className={textColor}>
          <span className="font-bold">M</span>C
        </span>
      ) : (
        <span className={textColor}>
          <span className="font-bold">Moreland</span>Connect
        </span>
      )}
    </Button>
  );
};

const NavAuth = (auth) => {
  return useAuthorization(auth);
};

export default function Sidebar({
  className = "",
  navigation: navigationProp,
  user,
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bgColor = ENVIRONMENTS[ENV.toUpperCase()]?.bgColor || "bg-dev";
  const textColor = ENVIRONMENTS[ENV.toUpperCase()]?.textColor || "text-dev";
  const [minimizeSidebar, setMinimizeSidebar] = useLocalStorage(
    `MINIMIZE_SIDEBAR`,
    false
  );

  let navigation = [...navigationProp.user, ...navigationProp.main];

  navigation = navigation.map((item) => {
    if (item.children) {
      item.children = item.children?.filter((child) => {
        return NavAuth(child.authorization);
      });
    }
    return item;
  });

  return (
    <div className={`z-10 ${className}`}>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={`relative flex w-full max-w-xs flex-1 flex-col pt-5 pb-4 ${bgColor}`}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex px-5">
                  <Brand
                    textColor={textColor}
                    setMinimizeSidebar={setMinimizeSidebar}
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="px-3">
                    <div className="flex flex-col space-y-3">
                      {navigation.map((link) =>
                        "children" in link ? (
                          <NavLinksMenu
                            key={link.name}
                            title={link.name}
                            icon={link.icon}
                            showDropdownIcon
                            buttonClassName="px-3 py-2 hover:bg-white/10 justity-center"
                            items={link.children.map((child) => (
                              <Authorization
                                key={`${link.name}__${child.href}`}
                                authorization={child.authorization}
                              >
                                <NavigationAction
                                  href={child.href}
                                  onClick={child.onClick}
                                  className="w-full text-left p-2"
                                >
                                  {child.name}
                                </NavigationAction>
                              </Authorization>
                            ))}
                          />
                        ) : (
                          <Authorization
                            key={link.name}
                            authorization={link.authorization}
                          >
                            <NavLinksMenu
                              showDropdownIcon={!minimizeSidebar}
                              icon={link.icon}
                              buttonClassName="px-3 py-2 hover:bg-white/10 justity-center"
                              title={
                                !minimizeSidebar ? (
                                  <NavigationAction
                                    href={link.href}
                                    onClick={link.onClick}
                                    className="text-left"
                                  >
                                    {link.name}
                                  </NavigationAction>
                                ) : null
                              }
                            />
                          </Authorization>
                        )
                      )}
                      <EnvironmentSwitcher minimizeSidebar={false} />
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex ${
          minimizeSidebar ? "lg:w-20" : "lg:w-64"
        } lg:flex-col lg:pt-5 lg:pb-4 ${bgColor}`}
      >
        <div className={`flex ${minimizeSidebar ? "px-3" : "px-5"}`}>
          <Brand
            minimizeSidebar={minimizeSidebar}
            setMinimizeSidebar={setMinimizeSidebar}
            textColor={textColor}
          />
        </div>
        <div className="flex h-0 flex-1 flex-col">
          {/* Navigation */}
          <nav className="mt-5 px-3 z-0">
            <div className="flex flex-col space-y-3">
              {navigation.map((link) =>
                "children" in link ? (
                  <NavLinksMenu
                    key={link.name}
                    title={!minimizeSidebar ? link.name : null}
                    showDropdownIcon={!minimizeSidebar}
                    icon={link.icon}
                    buttonClassName="px-3 py-2 hover:bg-white/10 justity-center"
                    items={link.children.map((child) => (
                      <Authorization
                        key={`${link.name}__${child.href}`}
                        authorization={child.authorization}
                      >
                        <NavigationAction
                          href={child.href}
                          onClick={child.onClick}
                          className="w-full text-left p-2"
                        >
                          {child.name}
                        </NavigationAction>
                      </Authorization>
                    ))}
                  />
                ) : (
                  <Authorization
                    key={link.name}
                    authorization={link.authorization}
                  >
                    <NavLinksMenu
                      showDropdownIcon={!minimizeSidebar}
                      icon={link.icon}
                      buttonClassName="px-3 py-2 hover:bg-white/10 justity-center"
                      title={
                        !minimizeSidebar ? (
                          <NavigationAction
                            href={link.href}
                            onClick={link.onClick}
                            className="text-left"
                          >
                            {link.name}
                          </NavigationAction>
                        ) : null
                      }
                    />
                  </Authorization>
                )
              )}
              <EnvironmentSwitcher minimizeSidebar={minimizeSidebar} />
            </div>
          </nav>
        </div>
      </div>
      {/* Main column */}
      <div
        className={`flex flex-col w-full ${
          minimizeSidebar ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <div
          className={`sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 lg:hidden mb-2.5 ${bgColor}`}
        >
          <button
            type="button"
            className="px-4 text-white focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
