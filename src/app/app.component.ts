import { Component } from '@angular/core';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba';

  icon = faGithub;
}
