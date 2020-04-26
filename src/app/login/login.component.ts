import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = "";
  constructor(
    private validadorFormulario: FormBuilder,
    public afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.formulario = this.validadorFormulario.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required],
    });
  }

  ingresar() {
    if (this.formulario.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.afAuth.auth
        .signInWithEmailAndPassword(
          this.formulario.value.email,
          this.formulario.value.password
        )
        .then((usuario) => {
          console.log(usuario);
          this.spinner.hide();
        })
        .catch((error) => {
          this.datosCorrectos = false;
          this.textoError = error.message;
          this.spinner.hide();
        });
    } else {
      this.datosCorrectos = false;
      this.textoError = "Por favor validar que los datos son correctos";
    }
  }
}
