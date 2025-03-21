import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet],
  template: `
    <app-navigation></app-navigation> 
    <router-outlet></router-outlet>  
  `,
})
export class AppComponent {
  title: string = 'My Angular App';
}
