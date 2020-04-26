import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFirestore } from "angularfire2/firestore";
import { ActivatedRoute } from "@angular/router";
import { MensajesService } from "../services/mensajes.service";

@Component({
  selector: "app-agregar-cliente",
  templateUrl: "./agregar-cliente.component.html",
  styleUrls: ["./agregar-cliente.component.scss"],
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeCarga: number = 0;
  urlImagen: string = "";
  editar: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msj: MensajesService
  ) {}

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      correo: ["", Validators.compose([Validators.required, Validators.email])],
      cedula: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      telefono: ["", Validators.required],
      ImgUrl: ["", Validators.required],
    });

    this.id = this.activeRoute.snapshot.params.clienteID;
    if (this.id != undefined) {
      this.editar = true;
      this.afs
        .doc<any>("clientes" + "/" + this.id)
        .valueChanges()
        .subscribe((cliente) => {
          this.formularioCliente.setValue({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            cedula: cliente.cedula,
            fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000)
              .toISOString()
              .substr(0, 10),
            telefono: cliente.telefono,
            ImgUrl: "",
          });
          this.urlImagen = cliente.ImgUrl;
        });
    }
  }
  agregar() {
    this.formularioCliente.value.ImgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );
    this.afs
      .collection("clientes")
      .add(this.formularioCliente.value)
      .then((termino) => {
        this.msj.mensajeCorrecto("Agrego", "Cliente Agregado Coreectamente");
      });
    this.formularioCliente.reset();
  }
  editarCliente() {
    this.formularioCliente.value.ImgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );

    this.afs
      .doc("clientes/" + this.id)
      .update(this.formularioCliente.value)
      .then(() => {
        console.log(
          this.msj.mensajeCorrecto("Editar", "Cliente Editado correctamente")
        );
      })
      .catch(() => {
        this.msj.mensajeError(
          "Error",
          "Error al editar Cliente intenta de nuevo"
        );
      });
  }

  subirImagen(evento) {
    let nombre = new Date().getTime().toString();
    let archivo = evento.target.files[0];
    let extencion = archivo.name
      .toString()
      .substring(archivo.name.toString().lastIndexOf("."));
    let ruta = "clientes/" + nombre + extencion;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    tarea.then((objeto) => {
      referencia.getDownloadURL().subscribe((url) => {
        this.urlImagen = url;
      });
    });
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeCarga = parseInt(porcentaje.toString());
    });
  }
}
