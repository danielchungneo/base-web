import Footer from "@/components/Footer";
import { PERMISSIONS } from "@/constants/permission";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import {
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import Header from "../Header";
import Sidebar from "../Sidebar";

type LayoutProps = {
  breadcrumbs: boolean;
  children: React.ReactNode;
  className: string;
  header: boolean;
  footer: boolean;
  fullWidth: boolean;
  sidebar: boolean;
};

function Layout({
  breadcrumbs,
  children,
  className,
  header,
  footer,
  fullWidth,
  sidebar,
}: LayoutProps) {
  const router = useRouter();
  const loginPage = "/auth/login";
  const { data: session } = useSession();

  const { submitRequest: logout } = useRequest(api.auth.session.logout(), {
    onSuccess: onSuccessLogout,
  });

  async function onSuccessLogout() {
    await signOut();
    router.push(loginPage);
  }

  const navigation = {
    main: [
      { name: "Home", href: `/`, icon: HomeIcon },
      { name: "Customers", href: `/demo/customers`, icon: UsersIcon },
      {
        name: "Products",
        href: `/demo/products`,
        icon: BuildingStorefrontIcon,
      },
      {
        name: "Sales Orders",
        href: `/demo/sales-orders`,
        icon: CurrencyDollarIcon,
      },
      {
        name: "Settings",
        href: `/settings`,
        icon: Cog6ToothIcon,
        children: [
          // Plop Pattern: Append to Header Settings Links
          {
            name: "Sales Order Statuses",
            href: `/demo/sales-order-statuses`,
          },
          {
            name: "Sales Order Types",
            href: `/demo/sales-order-types`,
          },
          {
            authorization: {
              permissions: {
                values: [PERMISSIONS.MANAGE_PERMISSIONS],
              },
            },
            name: "Permissions",
            href: `/permissions`,
          },
          {
            authorization: {
              permissions: {
                values: [PERMISSIONS.MANAGE_USERS],
              },
            },
            name: "Users",
            href: `/users`,
          },
        ]
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name)),
      },
    ],
    user: [
      {
        name: session?.user.name,
        href: `/profile`,
        icon: UserCircleIcon,
        children: [
          { name: "Profile", href: "/profile" },
          {
            name: "Sign out",
            onClick: () => {
              logout(session.user);
            },
          },
        ]
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name)),
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-row">
      {sidebar && (
        <Sidebar
          className="hidden lg:flex"
          navigation={navigation}
          user={session.user}
        />
      )}

      <div className="w-full h-full flex flex-col">
        {sidebar && (
          <Sidebar
            className="flex w-full min-h-0 lg:hidden"
            navigation={navigation}
            user={session.user}
          />
        )}
        {header && <Header navigation={navigation} user={session.user} />}

        {breadcrumbs && <Breadcrumbs />}

        <div
          className={clsx(
            "w-full",
            !fullWidth &&
              "flex flex-1 flex-col mx-auto lg:max-w-7xl p-4 sm:p-6 lg:p-8",
            className
          )}
        >
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </div>
  );
}

export default Layout;
