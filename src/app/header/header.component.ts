import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "firebase";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  usuario: User;
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.afAuth.auth.signOut();
  }
}
