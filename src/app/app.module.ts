import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
//import { AngularFireModule } from "@angular/fire";
import {
  AngularFirestoreModule,
  AngularFirestore,
} from "angularfire2/firestore";
import { environment } from "src/environments/environment";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from "./header/header.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ListadoClientesComponent } from "./listado-clientes/listado-clientes.component";
import { AgregarClienteComponent } from "./agregar-cliente/agregar-cliente.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { AngularFireStorageModule } from "angularfire2/storage";
import { MensajesService } from "./services/mensajes.service";
import { PrecioComponent } from './precio/precio.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PrecioComponent,
    InscripcionComponent,
    SelecionarClienteComponent,
    ListadoInscripcionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AngularFireStorageModule,
  ],
  providers: [AngularFireAuth, AngularFirestore, MensajesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
