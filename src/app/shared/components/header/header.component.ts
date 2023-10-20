import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { prefix } from '@shared/data/ruta.api';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  public prefix = prefix;

  public isLoged = this.authSvc.Logged;

  private subscriptionName!: Subscription;

  constructor(
    private authSvc: AuthService,
  ) { 

  }

  ngOnInit(): void {
    // this.authSvc.isLoggedIn()
  }

  ngAfterViewChecked(): void {
    this.authSvc.isLoggedIn()
  }

  logOut(){
    this.authSvc.logOut();
  }

  toggleMenu(e:any) {
    let menu = document.getElementById('navbarBasicExample')
    let burger = document.getElementById('burger')
    if(menu && burger) {
      menu.classList.remove('is-active');
      burger.classList.remove('is-active');
    }
  }

}
