import { Rol } from "@/interfaces/empelado-interfaces";
import { rolServiceApi } from "@/services";
import { useRolStore } from "@/store/RoleStore";
import Swal from "sweetalert2";
import { shallow } from "zustand/shallow";

export const useFetchRoles = () => {


  //* Zustand store
  const { setRoles, roles, setSelectedRol, selectedRol } = useRolStore((state) => state, shallow);

  const getAllRoles = async () => {
    await rolServiceApi.getAllRoles()
      .then((res) => {
        setRoles(res);
      })
  }

  const selectRolById = (id_rol: string) => {
    const rol = roles?.find((r) => r.id_rol === id_rol)
    if (rol !== undefined) {
      setSelectedRol(rol)
    } else {
      Swal.fire({
        icon: 'error',
        text: 'El rol no fue encontrado'
      })
    }
  }

  return {
    roles,
    selectedRol,
    getAllRoles,
    selectRolById
  }

}