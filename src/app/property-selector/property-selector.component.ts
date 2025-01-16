import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyOption, VehicleData } from '../interfaces';

@Component({
  selector: 'app-property-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="property-buttons">
      <button 
        *ngFor="let prop of properties" 
        class="property-button"
        [class.active]="selectedProperty === prop.value"
        (click)="onSelect(prop.value)">
        {{prop.label}}
      </button>
    </div>
  `
})
export class PropertySelectorComponent {
  @Input() properties: PropertyOption[] = [];
  @Input() selectedProperty!: keyof VehicleData;
  @Output() propertySelected = new EventEmitter<keyof VehicleData>();

  onSelect(property: keyof VehicleData) {
    this.propertySelected.emit(property);
  }
}