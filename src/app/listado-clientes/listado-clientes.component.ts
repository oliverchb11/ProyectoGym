import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: "app-listado-clientes",
  templateUrl: "./listado-clientes.component.html",
  styleUrls: ["./listado-clientes.component.scss"],
})
export class ListadoClientesComponent implements OnInit {
  clientes: Array<any> = new Array<any>();
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    // this.db
    //   .collection("clientes")
    //   .valueChanges()
    //   .subscribe((resultado) => {
    //     this.clientes = resultado;
    //   });
    this.clientes.length = 0;
    this.db
      .collection("clientes")
      .get()
      .subscribe((resultado) => {
        console.log(resultado.docs);

        resultado.docs.forEach((item) => {
          let cliente = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          this.clientes.push(cliente);
        });
      });
  }
}
