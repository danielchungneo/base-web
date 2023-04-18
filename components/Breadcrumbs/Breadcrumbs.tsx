import startCase from "lodash/startCase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";

type BreadcrumbsProps = {
  //
};

type BreadcrumbType = {
  name: string;
  href: string;
};

function Breadcrumbs(props: BreadcrumbsProps) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbType> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      let pathBreadcrumbs = null;
      const path = router.asPath.split("?")[0].split("/");
      path.shift();

      if (path[0] === "users" || path[1] === "users") {
        pathBreadcrumbs = path.map((breadcrumb, i) => {
          return {
            name: breadcrumb === "users" ? "Users" : "Detail",
            href: `/${path.slice(0, i + 1).join("/")}`,
          };
        });
      } else {
        pathBreadcrumbs = path.map((breadcrumb, i) => {
          return {
            name: Number(breadcrumb) ? "Detail" : startCase(breadcrumb),
            href: `/${path.slice(0, i + 1).join("/")}`,
          };
        });
      }

      setBreadcrumbs(pathBreadcrumbs);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      className="flex border-b border-gray-200 bg-white"
      aria-label="Breadcrumb"
    >
      <ol className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <a
                href={breadcrumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {breadcrumb.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
