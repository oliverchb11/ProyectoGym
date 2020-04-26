import { DocumentReference } from "angularfire2/firestore";

export class Clientes {
  id: string;
  nombre: string;
  apellido: string;
  cedula: number;
  email: string;
  telefono: number;
  fechaNacimiento: string;
  ImgUrl: string;
  ref: DocumentReference;
  visible: boolean;
  constructor() {}
}
