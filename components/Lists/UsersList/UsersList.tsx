import AgGrid from "@/components/AgGrid";
import { ROLES } from "@/constants/role";
import api from "@/utils/api";
import useAuthorization from "@/utils/hooks/useAuthorization";
import useRequest from "@/utils/hooks/useRequest";
import { useRouter } from "next/router";

const columnDefs = [
  {
    headerName: "Name",
    field: "name",
    sort: "asc",
  },
  {
    headerName: "Email",
    field: "email",
  },
];

// Typescript Prop Definitions
type UsersListTypes = {
  //
};

function UsersList(props: UsersListTypes) {
  // Router control initialization
  const router = useRouter();

  // Check if Super Admin
  const isSuperAdmin = useAuthorization({
    roles: {
      values: [ROLES.SUPER_ADMIN],
    },
  });

  // API Calls
  const {
    data: users,
    loading,
    errors,
  } = useRequest(
    api.auth.users.getAll({
      query: {
        isSuperAdmin,
      },
    })
  );

  // Cell Click Routing
  function onCellClicked(e) {
    router.push(`/users/${e.data.id}`);
  }
  // Create routing
  function onCreate() {
    router.push("/users/create");
  }

  return (
    <AgGrid
      title="Users"
      idField="id"
      columnDefs={columnDefs}
      enableCellClick
      onCellClicked={onCellClicked}
      enableCreate
      onCreate={onCreate}
      loading={loading}
      {...users}
    />
  );
}

export default UsersList;
