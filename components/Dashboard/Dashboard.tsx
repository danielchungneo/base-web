import Card from "@/components/ContentWrappers/Card";
import StatCard from "@/components/StatCard";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { BsBriefcaseFill, BsTelephoneFill } from "react-icons/bs";
import Label from "../Label";

type DashboardProps = {
  //
};

function Dashboard (props: DashboardProps) {
  return (
    <React.Fragment>
      <div className="w-full space-y-8">
        <Label variant="h4">
          Your Week In Review
        </Label>

        <div className="w-100 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div>
            <StatCard
              title="Example"
              amount="55"
              icon={<BsTelephoneFill />}
              iconColor="success"
            />
          </div>

          <div>
            <StatCard
              title="Example"
              amount="24"
              icon={<BsBriefcaseFill />}
              iconColor="info"
            />
          </div>

          <div>
            <StatCard
              title="Example"
              amount="31"
              icon={<BsBriefcaseFill />}
              iconColor="warning"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <Card className="flex-col">
              <Label variant="h4" className="text-gray-600">
                Example A
              </Label>

              <div className="text-center fw-bold" style={{ height: 500 }}>
                <ResponsivePie
                  data={[
                    {
                      id: "Closed",
                      value: 12,
                    },
                    {
                      id: "Open",
                      value: 5,
                    },
                    {
                      id: "In Progress",
                      value: 7,
                    },
                  ]}
                  colors={[
                    "rgba(13,110,253, 0.65)",
                    "rgb(69,189,9, 0.65)",
                    "rgba(247,185,40, 0.65)",
                  ]}
                  theme={{
                    fontSize: 16,
                  }}
                  margin={{ top: 48, right: 48, bottom: 48, left: 48 }}
                  sortByValue
                  activeOuterRadiusOffset={8}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="rgb(33, 37, 41)"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="h-100 flex-col">
              <Label variant="h4" className="text-gray-600">
                Example B
              </Label>

              <div className="text-center fw-bold" style={{ height: 500 }}>
                <ResponsiveBar
                  data={[
                    {
                      id: "October",
                      count: 2,
                    },
                    {
                      id: "November",
                      count: 7,
                    },
                  ]}
                  keys={["count"]}
                  isInteractive={false}
                  indexBy="id"
                  theme={{
                    fontSize: 16,
                  }}
                  margin={{ top: 24, right: 24, bottom: 48, left: 24 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={[
                    "rgba(13,110,253, 0.65)",
                    "rgb(69,189,9, 0.65)",
                    "rgba(247,185,40, 0.65)",
                  ]}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  axisLeft={null}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
