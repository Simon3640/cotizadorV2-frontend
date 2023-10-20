import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@interfaces/auth';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private fb : UntypedFormBuilder,
    private authSvc : AuthService,
    private loaderSvc : LoaderService,
    private router: Router,
  ) {
    if (this.authSvc.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
   }
   form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit(): void {
  }

  submit(){
    this.authSvc.login(this.form.value as Auth).subscribe({
      next: () => {
       this.router.navigate(['/home']);
      }
    }
    )
  }


}
