import Card from "../ContentWrappers/Card";
import Label from "../Label";

type StatCardProps = {
  title: string;
  amount?: string;
  icon?: React.ReactNode;
  iconColor?: string;
};

function StatCard ({
  title,
  amount = "n/a",
  icon,
  iconColor = "primary",
}: StatCardProps) {
  return (
    <Card>
      <div className="w-full grid grid-cols-4">
        <div className="col-span-3">
          <Label variant="h5" className="text-gray-500">
            {title}
          </Label>
          <Label variant="h3">{amount}</Label>
        </div>

        <div className="flex flex-row justify-end">
          {icon && (
            <div
              className={`bg-${iconColor} text-light rounded-full`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 45,
                width: 45,
                fontSize: "1.25rem",
                fontWeight: 700,
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px",
              }}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
