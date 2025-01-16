import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleData, VehicleInfo } from '../interfaces';

@Component({
  selector: '[app-bars]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let vehicle of vehicles; let vehicleIndex = index">
      <!-- Value line -->
      <svg:line 
        [attr.x1]="-30"
        [attr.y1]="220 - (vehicle.stackPosition + vehicle.normalizedHeight)"
        [attr.x2]="90"
        [attr.y2]="220 - (vehicle.stackPosition + vehicle.normalizedHeight)"
        stroke="#999"
        stroke-width="1"/>
      
      <!-- Value label -->
      <svg:text 
        [attr.x]="-35"
        [attr.y]="216 - (vehicle.stackPosition + vehicle.normalizedHeight)"
        text-anchor="end"
        class="value-label">
        {{vehicle.value[selectedProperty]}}
      </svg:text>

      <!-- Bar -->
      <svg:g (click)="onBarClick(vehicle.key)">
        <svg:rect 
          class="bar"
          [class.selected]="isSelected(vehicle.key)"
          [attr.x]="0"
          [attr.y]="220 - (vehicle.stackPosition + vehicle.normalizedHeight)"
          width="60"
          [attr.height]="vehicle.normalizedHeight"
          [attr.fill]="getBrightness(baseColor, vehicleIndex)"/>
      </svg:g>
    </ng-container>
  `
})
export class BarsComponent {
  @Input() vehicles: VehicleInfo[] = [];
  @Input() selectedProperty!: keyof VehicleData;
  @Input() baseColor!: string;
  @Input() selectedBar?: string;
  @Output() barClick = new EventEmitter<string>();

  onBarClick(vehicleKey: string) {
    this.barClick.emit(vehicleKey);
  }

  isSelected(vehicleKey: string): boolean {
    return this.selectedBar === vehicleKey;
  }

  getBrightness(baseColor: string, index: number): string {
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    const factor = 1 + index * 0.15;

    const newR = Math.min(Math.round(r * factor), 255);
    const newG = Math.min(Math.round(g * factor), 255);
    const newB = Math.min(Math.round(b * factor), 255);

    return `#${newR.toString(16).padStart(2, '0')}${newG
      .toString(16)
      .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
}