import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements AfterViewInit {
  isFixed = false;
  // TODO: Volver dinamico
  type = 'header-login';
  navbarOriginalPosition: number = 0;

  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    this.navbarOriginalPosition =
      this.el.nativeElement.querySelector('#navbar').offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const currentScrollPosition = window.pageYOffset;
    this.isFixed = currentScrollPosition > this.navbarOriginalPosition;
  }

  navigateToLogin(page: string) {
    this.router.navigate(['/auth']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
