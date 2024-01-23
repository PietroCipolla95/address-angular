import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  credentials = {
    name: '',
    password: ''
  };
  user: object = {};

  constructor(private http: HttpClient, private auth: AuthService) { }

  loginUser() {
    this.auth.login(this.credentials).subscribe(() => {
    });
  }

}
