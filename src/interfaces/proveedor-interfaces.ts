// Generated by https://quicktype.io

export interface PaginateProveedor {
  data:       Proveedor[] | null;
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
  prevPage:   number | null;
  nextPage:   number | null;
}

export interface Proveedor {
  id_proveedor: string;
  nombre:       string;
  direccion:    string;
  telefono:     string;
  creado_el:    string;
  message?: string
}

export interface ProveedorForm {
  nombre: string
  direccion: string
  telefono: string
}
