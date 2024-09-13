import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Freestyler';
  isHandset = false;
  showSidenav: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
      });

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showSidenav = !(event.url === '/login' || event.url === '/signup');
        }
      });
  }
}
