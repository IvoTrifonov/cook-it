import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('dropdownRecipes') dropdown: ElementRef;
  get user() { return this.userService.user }
  
  isSticky: boolean;
  isHomeCompenent: boolean;

  private stickyHeaderSubscription: Subscription;
  private isHomeComponentSubscription: Subscription;

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.stickyHeaderSubscription = fromEvent(window, 'scroll').subscribe(() => {
      window.scrollY > 0 ? this.isSticky = true : this.isSticky = false;
    });

    this.isHomeComponentSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((value: NavigationEnd) => {
      value.url === '/' ? this.isHomeCompenent = true : this.isHomeCompenent = false;
    });

  }

  ngOnDestroy(): void {
    this.stickyHeaderSubscription.unsubscribe();
    this.isHomeComponentSubscription.unsubscribe();
  }
}
