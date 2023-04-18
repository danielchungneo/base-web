import { ENV } from "@/constants/config";
import { ENVIRONMENTS } from "@/constants/environments";
import { ComputerDesktopIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import Authorization from "../Authorization";
import NavLinksMenu from "../NavLinksMenu";

// @ts-ignore
const { version } = require("../../package.json");

type EnvironmentSwitcherProps = {
  minimizeSidebar?: boolean;
  showIcon?: boolean;
};

function EnvironmentSwitcher({
  minimizeSidebar = false,
  showIcon = true,
}: EnvironmentSwitcherProps) {
  const { asPath } = useRouter();
  const isProduction = ENV.toLowerCase() === "production";

  if (isProduction) {
    return null;
  }

  return (
    <Authorization>
      <NavLinksMenu
        title={
          !minimizeSidebar ? (
            <span className="capitalize">{`${ENV} (${version})`}</span>
          ) : null
        }
        showDropdownIcon={!minimizeSidebar}
        icon={showIcon ? ComputerDesktopIcon : null}
        buttonClassName="px-3 py-2 hover:bg-white/10"
        items={Object.keys(ENVIRONMENTS).map((environment) => (
          <Link
            key={`${ENVIRONMENTS[environment].name}`}
            href={`${ENVIRONMENTS[environment].href}${asPath}`}
            passHref
            className="w-full text-left p-2"
          >
            {ENVIRONMENTS[environment].name}
            {ENV.toLowerCase() ===
              ENVIRONMENTS[environment].name.toLowerCase() && " (active)"}
          </Link>
        ))}
      />
    </Authorization>
  );
}

export default EnvironmentSwitcher;
