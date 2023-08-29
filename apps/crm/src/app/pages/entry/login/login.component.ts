import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServerService } from '@bits/crm-core';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  server =  inject(ServerService);
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  submit() {
    const data: any = this.loginForm.value;
    this.server.auth.login(data).subscribe(console.log);
  }

}
