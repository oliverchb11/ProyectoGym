import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Inscripcion } from "../models/inscripcion";

@Component({
  selector: "app-listado-inscripciones",
  templateUrl: "./listado-inscripciones.component.html",
  styleUrls: ["./listado-inscripciones.component.scss"],
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db
      .collection("incripcion")
      .get()
      .subscribe((resultado) => {
        resultado.forEach((inscripcion) => {
          console.log(inscripcion.data());
          let incripcionNueva = inscripcion.data();
          incripcionNueva.id = inscripcion.id;
          // console.log(incripcionNueva);

          this.db
            .doc(inscripcion.data().cliente.path)
            .get()
            .subscribe((cliente) => {
              incripcionNueva.clienteObetnido = cliente.data();
              incripcionNueva.fecha = new Date(
                incripcionNueva.fecha.seconds * 1000
              );
              incripcionNueva.fechaFinal = new Date(
                incripcionNueva.fechaFinal.seconds * 1000
              );
              this.inscripciones.push(incripcionNueva);
            });
        });
      });
  }
}
