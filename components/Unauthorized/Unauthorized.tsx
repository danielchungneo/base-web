import Label from "../Label";

type UnauthorizedProps = {
  //
};

function Unauthorized (props: UnauthorizedProps) {
  return (
    <div className="flex-1 text-center p-4 mt-5">
      <Label variant="h4">Unauthorized &#128274;</Label>
      <Label variant="s4" className="mt-4">
        You do not have permission to view this page.
      </Label>
    </div>
  );
}

export default Unauthorized;
