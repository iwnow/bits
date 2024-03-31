import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  useElementRef,
  CrmClientService,
  useDestroyStream,
} from 'crm-core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  elRef = useElementRef();
  crm = inject(CrmClientService);
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  destroy$ = useDestroyStream();
  router = inject(Router);

  ngOnInit(): void {
    this.crm.auth
      .loginError()
      .pipe(takeUntil(this.destroy$))
      .subscribe(console.error);
    this.crm.auth
      .loginSuccess()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

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
