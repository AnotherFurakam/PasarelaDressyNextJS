import { Rol } from "@/interfaces/empelado-interfaces"
import { useEffect, useState } from "react"
import { rolService } from "@/services";

interface Props {
  setFieldValue: (field: string, value: any) => void
}

const RoleCombo: React.FC<Props> = ({ setFieldValue }) => {

  const [roleList, setRoleList] = useState<Rol[]>()

  const [selectedRoles, setSelectedRoles] = useState<string[]>()

  const getRoles = async () => {
    const roles = await rolService.getAllRoles()
    console.log(roles)
    setRoleList(roles)
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <div>
      <label className="mb-1 text-md text-slate-800">Roles</label>
      {
        roleList ?
          roleList.map(r => (
            <div key={r.id_rol}>
              <input type="checkbox" />
              <label>{r.nombre}</label>
            </div>
          ))
          : null
      }
    </div>
  )
}

export default RoleCombo