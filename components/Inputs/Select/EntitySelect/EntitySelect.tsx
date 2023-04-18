import { IEntityComboBox } from "@/types/components/inputComponents";
import useRequest from "@/utils/hooks/useRequest";
import ComboBox from "../ComboBox";

function EntitySelect({
  request,
  valueField = "id",
  labelField = "name",
  ...props
}: IEntityComboBox) {
  const { data, loading } = useRequest(request);

  return (
    <ComboBox
      options={data?.results}
      loading={loading}
      autoComplete="off"
      clearable
      valueField={valueField}
      labelField={labelField}
      {...props}
    />
  );
}

export default EntitySelect;
