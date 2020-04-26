import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";
import { Clientes } from "../models/cliente";
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: "app-selecionar-cliente",
  templateUrl: "./selecionar-cliente.component.html",
  styleUrls: ["./selecionar-cliente.component.scss"],
})
export class SelecionarClienteComponent implements OnInit {
  clientes: Clientes[] = new Array<Clientes>();
  @Input("nombre") nombre: string;
  @Input("apellido") apellido: string;
  @Output("seleccionoCliente") seleccionoCliente = new EventEmitter();
  @Output("canceloCliente") canceloCliente = new EventEmitter();
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db
      .collection<any>("clientes")
      .get()
      .subscribe((resultado) => {
        this.clientes.length = 0;
        resultado.docs.forEach((item) => {
          let cliente: any = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          cliente.visible = false;
          this.clientes.push(cliente);
        });
      });
  }

  buscarCliente(nombre: string) {
    this.clientes.forEach((cliente) => {
      if (
        cliente.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase())
      ) {
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    });
  }

  seleccionarCliente(cliente: Clientes) {
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.clientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.seleccionoCliente.emit(cliente);
  }

  cancelarCliente() {
    this.nombre = undefined;
    this.apellido = undefined;
    this.canceloCliente.emit();
  }
}
