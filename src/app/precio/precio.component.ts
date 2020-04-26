import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { MensajesService } from "../services/mensajes.service";
import { Precios } from "../models/precios";

@Component({
  selector: "app-precio",
  templateUrl: "./precio.component.html",
  styleUrls: ["./precio.component.scss"],
})
export class PrecioComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: Precios[] = new Array<Precios>();
  esEditar: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private msj: MensajesService
  ) {}

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ["", Validators.required],
      costo: ["", Validators.required],
      duracion: ["", Validators.required],
      tipoDuracion: ["", Validators.required],
    });
    this.mostrarPrecios();
  }
  mostrarPrecios() {
    this.afs
      .collection<Precios>("precios")
      .get()
      .subscribe((resultado) => {
        this.precios.length = 0;
        resultado.docs.forEach((dato) => {
          let precio = dato.data() as Precios;
          precio.id = dato.id;
          precio.ref = dato.ref;
          this.precios.push(precio);
        });
      });
  }

  agregar() {
    this.afs
      .collection<Precios>("precios")
      .add(this.formularioPrecio.value)
      .then(() => {
        this.msj.mensajeCorrecto("Agrego", "Precio agregado correctamente");
        this.formularioPrecio.reset();
        this.mostrarPrecios();
      })
      .catch(() => {
        this.msj.mensajeError("Error", "Error al cargar el precio");
      });
  }
  editar() {
    this.afs
      .doc("precios/" + this.id)
      .update(this.formularioPrecio.value)
      .then(() => {
        this.msj.mensajeCorrecto("Edito", "Datos Editador correctamente");
        this.formularioPrecio.reset();
        this.esEditar = false;
        this.mostrarPrecios();
      })
      .catch(() => {
        this.msj.mensajeError("Error", "Error al editar cliente");
      });
  }
  mostrarPreciosEditados(precio: Precios) {
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion,
    });
    this.id = precio.id;
  }
}
