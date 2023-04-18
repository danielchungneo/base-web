import { ENV } from "@/constants/config";
import clsx from "clsx";
import capitalize from "lodash/capitalize";

// @ts-ignore
const { version } = require("../../package.json");

const AppVersion = ({ padding, light }: any) => {
  return (
    <div
      className={clsx("text-center", padding && "p-2", light && "text-white")}
    >
      <div className="d-flex flex-column">
        <div style={{ fontSize: "12px" }}>{`${capitalize(
          ENV
        )} ${version}`}</div>
      </div>
    </div>
  );
};

AppVersion.defaultProps = {
  padding: true,
  light: false,
};
export default AppVersion;
