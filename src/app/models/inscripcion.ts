import { DocumentReference } from "angularfire2/firestore";

export class Inscripcion {
  fecha: Date;
  fechaFinal: Date;
  cliente: DocumentReference;
  tipoIncripcionDePrecio: DocumentReference;
  subTotal: number;
  iva: number;
  total: number;
  constructor() {
    this.fecha = this.fecha;
    this.fechaFinal = this.fechaFinal;
    this.cliente = this.cliente;
    this.tipoIncripcionDePrecio = this.tipoIncripcionDePrecio;
    this.subTotal = this.subTotal;
    this.iva = this.iva;
    this.total = this.total;
  }

  validar(): any {
    let respuesta = {
      esValido: false,
      mensaje: "",
    };
    if (this.cliente == null || this.cliente == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No tiene Un Cliente Seleccionado";
      return respuesta;
    }
    if (
      this.tipoIncripcionDePrecio == null ||
      this.tipoIncripcionDePrecio == undefined
    ) {
      respuesta.esValido = false;
      respuesta.mensaje = "No ha seleccionado un precio";
      return respuesta;
    }
    if (this.fecha == null || this.fecha == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No tiene fecha de incio";
      return respuesta;
    }
    if (this.fechaFinal == null || this.fechaFinal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No tiene fecha final de incio";
      return respuesta;
    }

    if (this.subTotal <= 0 || this.subTotal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No ha podido calcular subtotal";
      return respuesta;
    }
    if (this.iva <= 0 || this.iva == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No ha podido calcular iva";
      return respuesta;
    }
    if (this.total <= 0 || this.total == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = "No ha podido calcular total";
      return respuesta;
    }
    respuesta.esValido = true;
    return respuesta;
  }
}
