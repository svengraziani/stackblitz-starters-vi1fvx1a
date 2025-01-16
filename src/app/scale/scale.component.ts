import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-scale]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let value of scaleValues">
      <svg:line 
        x1="40" 
        [attr.y1]="220 - (value / maxValue * 180)" 
        x2="800" 
        [attr.y2]="220 - (value / maxValue * 180)" 
        stroke="#ddd" 
        stroke-width="1"
        stroke-dasharray="4,4"/>
      <svg:text 
        x="35" 
        [attr.y]="224 - (value / maxValue * 180)" 
        text-anchor="end"
        class="scale-label">
        {{value}}
      </text>
    </ng-container>
  `
})
export class ScaleComponent {
  @Input() scaleValues: number[] = [];
  @Input() maxValue!: number;
}