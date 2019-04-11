import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../assets/canvasjs.min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {  

  selected:string = 'option1';

  ngOnInit() {
		
    }
}
