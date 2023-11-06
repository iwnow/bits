import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { useElementRef, CrmClientService } from '@bits/crm-core';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  elRef = useElementRef();
  crm = inject(CrmClientService);
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elRef.querySelector('input')?.focus();
    });
  }

  submit() {
    const data: any = this.loginForm.value;
    this.crm.auth.login(data);
  }
}
