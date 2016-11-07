import { Component } from '@angular/core';
import './rxjs-extensions';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',  
  styleUrls:  ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
