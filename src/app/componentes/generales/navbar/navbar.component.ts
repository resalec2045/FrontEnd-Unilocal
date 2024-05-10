import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements AfterViewInit {
  navbarOriginalPosition: number = 0;
  isFixed = false;
  isLogged = false;

  @Input() type: string = 'header-login';

  constructor(
    private tokenService: TokenService,
    private el: ElementRef,
    private router: Router
  ) {
    this.isLogged = this.tokenService.isLogged();
  }

  ngAfterViewInit() {
    this.navbarOriginalPosition =
      this.el.nativeElement.querySelector('#navbar').offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const currentScrollPosition = window.pageYOffset;
    this.isFixed = currentScrollPosition > this.navbarOriginalPosition;
  }

  navigateToLogin() {
    this.tokenService.logout();
    this.router.navigate(['/auth']);
  }

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
}
