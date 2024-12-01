import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  @Input() progress: number = 0;
  // cyclicProgress: number = 10;

  ngOnInit(){
    // this.CyclicProgress();
  }
  
  // CyclicProgress(){
  //   while (this.cyclicProgress < 100) {
  //     this.cyclicProgress += 10;
  //   }
  // }
}
