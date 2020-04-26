import { Component, OnInit } from "@angular/core";
import { Inscripcion } from "../models/inscripcion";
import { Clientes } from "../models/cliente";
import { AngularFirestore } from "angularfire2/firestore";
import { Precios } from "../models/precios";
import { MensajesService } from "../services/mensajes.service";
@Component({
  selector: "app-inscripcion",
  templateUrl: "./inscripcion.component.html",
  styleUrls: ["./inscripcion.component.scss"],
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Clientes = new Clientes();
  PresioSeleccionado: Precios = new Precios();
  idPrecio: string = "null";
  precios: Precios[] = new Array<Precios>();
  constructor(private db: AngularFirestore, private msj: MensajesService) {}

  ngOnInit(): void {
    this.db
      .collection("precios")
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          let precio = item.data() as Precios;
          precio.id = item.id;
          precio.ref = item.ref;
          this.precios.push(precio);
        });
      });
  }

  asignarCliente(cliente: Clientes) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }
  eliminarCliente() {
    this.clienteSeleccionado = new Clientes();
    this.inscripcion.cliente = undefined;
  }
  guardar() {
    if (this.inscripcion.validar().esValido) {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        tipoIncripcionDePrecio: this.inscripcion.tipoIncripcionDePrecio,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total,
      };
      this.db
        .collection("incripcion")
        .add(inscripcionAgregar)
        .then((resultado) => {
          this.msj.mensajeCorrecto(
            "Correcto",
            "Inscripcion creada correctamente"
          );
          this.inscripcion = new Inscripcion();
          this.clienteSeleccionado = new Clientes();
          this.PresioSeleccionado = new Precios();
          this.idPrecio = "null";
        })
        .catch(() => {
          this.msj.mensajeError("Error", "Error a crear la Inscripcion");
        });
    } else {
      this.msj.mensajeError("Error", this.inscripcion.validar().mensaje);
    }
  }

  seleccionarPrecio(id: string) {
    if (id != "null") {
      this.PresioSeleccionado = this.precios.find((x) => x.id == id);
      this.inscripcion.tipoIncripcionDePrecio = this.PresioSeleccionado.ref;
      //Fecha actual
      this.inscripcion.fecha = new Date();

      this.inscripcion.subTotal = this.PresioSeleccionado.costo;
      this.inscripcion.iva = this.inscripcion.subTotal * 0.19;
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva;
      console.log(this.inscripcion.total);
      // TODO Fecha Final para dia
      if (this.PresioSeleccionado.tipoDuracion == 1) {
        let dias = this.PresioSeleccionado.duracion;
        let fechaFinalLet = new Date(
          this.inscripcion.fecha.getUTCFullYear(),
          this.inscripcion.fecha.getUTCMonth(),
          this.inscripcion.fecha.getDate() + dias
        );

        this.inscripcion.fechaFinal = fechaFinalLet;
      }
      //Fecha Final para semana
      if (this.PresioSeleccionado.tipoDuracion == 2) {
        let semana = this.PresioSeleccionado.duracion * 7;
        let fechaFinalLet = new Date(
          this.inscripcion.fecha.getUTCFullYear(),
          this.inscripcion.fecha.getUTCMonth(),
          this.inscripcion.fecha.getDate() + semana
        );
        this.inscripcion.fechaFinal = fechaFinalLet;
      }
      //Fecha Final para quincena
      if (this.PresioSeleccionado.tipoDuracion == 3) {
        let quincena = this.PresioSeleccionado.duracion * 15;
        let fechaFinalLet = new Date(
          this.inscripcion.fecha.getUTCFullYear(),
          this.inscripcion.fecha.getUTCMonth(),
          this.inscripcion.fecha.getDate() + quincena
        );
        this.inscripcion.fechaFinal = fechaFinalLet;
      }
      //Fecha Final para mes
      if (this.PresioSeleccionado.tipoDuracion == 4) {
        let meses = this.PresioSeleccionado.duracion;
        let fechaFinalLet = new Date(
          this.inscripcion.fecha.getUTCFullYear(),
          this.inscripcion.fecha.getUTCMonth() + meses,
          this.inscripcion.fecha.getDate()
        );
        this.inscripcion.fechaFinal = fechaFinalLet;
      }
      //Fecha Final para año
      if (this.PresioSeleccionado.tipoDuracion == 5) {
        let año = this.PresioSeleccionado.duracion;
        let fechaFinalLet = new Date(
          this.inscripcion.fecha.getUTCFullYear() + año,
          this.inscripcion.fecha.getUTCMonth(),
          this.inscripcion.fecha.getDate()
        );
        this.inscripcion.fechaFinal = fechaFinalLet;
      }
    } else {
      this.PresioSeleccionado = new Precios();
      this.inscripcion.tipoIncripcionDePrecio = null;
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }
}
