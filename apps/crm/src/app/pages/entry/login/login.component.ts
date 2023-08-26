import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  submit() {
    alert('pl')
  }

}
