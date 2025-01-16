import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PropertySelectorComponent } from './app/property-selector/property-selector.component';
import { ChartComponent } from './app/chart/chart.component';
import { VehicleData, PropertyOption, Scenarios, VehicleInfo, ScenarioInfo } from './app/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PropertySelectorComponent, ChartComponent],
  template: `
    <div class="chart-container">
      <app-property-selector
        [properties]="availableProperties"
        [selectedProperty]="selectedProperty"
        (propertySelected)="selectProperty($event)">
      </app-property-selector>

      <app-chart
        [scenarios]="getScenarios()"
        [selectedProperty]="selectedProperty"
        [maxValue]="getMaxValue()"
        [scaleValues]="getScaleValues()"
        [vehiclesByScenario]="getVehiclesByScenario()"
        [selectedBars]="selectedBars">
      </app-chart>
    </div>
  `
})
export class App {
  selectedProperty: keyof VehicleData = 'umlauftage';
  selectedBars: { [scenarioKey: string]: string } = {};

  availableProperties: PropertyOption[] = [
    { label: 'Umlauftage', value: 'umlauftage' },
    { label: 'Produktivkilometer', value: 'produktivkilometer' },
    { label: 'Leerkilometer', value: 'leerkilometer' },
  ];

  szenarios: Scenarios = {
    szenario_0a: {
      baseColor: '#6ea0b9',
      vehicles: {
        '1016': {
          umlauftage: 12,
          produktivkilometer: 1234,
          leerkilometer: 123,
        },
        '1116_TR': {
          umlauftage: 8,
          produktivkilometer: 345,
          leerkilometer: 9,
        },
        '1116_Ws': {
          umlauftage: 26,
          produktivkilometer: 5234,
          leerkilometer: 5,
        },
      },
    },
    szenario_0b: {
      baseColor: '#87af28',
      vehicles: {
        '1016': {
          umlauftage: 7,
          produktivkilometer: 2345,
          leerkilometer: 80,
        },
        '1116_TR': {
          umlauftage: 16,
          produktivkilometer: 765,
          leerkilometer: 123,
        },
        '1116_Ws': {
          umlauftage: 26,
          produktivkilometer: 3234,
          leerkilometer: 800,
        },
      },
    },
  };

  selectProperty(property: keyof VehicleData) {
    this.selectedProperty = property;
  }

  getMaxValue(): number {
    const max = Math.max(
      ...Object.values(this.szenarios).map((scenario) => {
        const values = Object.values(scenario.vehicles).map(
          (vehicle) => vehicle[this.selectedProperty]
        );
        return values.reduce((a, b) => a + b, 0);
      })
    );
    return Math.ceil(max * 1.1);
  }

  getScaleValues(): number[] {
    const maxValue = this.getMaxValue();
    const step = Math.ceil(maxValue / 5);
    return Array.from({ length: 6 }, (_, i) => i * step);
  }

  getScenarios(): ScenarioInfo[] {
    return Object.entries(this.szenarios).map(([key, value]) => ({
      key,
      baseColor: value.baseColor,
    }));
  }

  getVehiclesByScenario(): { [key: string]: VehicleInfo[] } {
    const result: { [key: string]: VehicleInfo[] } = {};
    
    Object.entries(this.szenarios).forEach(([scenarioKey, scenario]) => {
      let stackPosition = 0;
      result[scenarioKey] = Object.entries(scenario.vehicles).map(([key, value], index) => {
        const currentValue = value[this.selectedProperty];
        const maxValue = this.getMaxValue();
        const normalizedHeight = Math.min(
          (currentValue / maxValue) * 180,
          180
        );

        const vehicleInfo = {
          key,
          value,
          index,
          stackPosition,
          normalizedHeight,
        };

        stackPosition += normalizedHeight;
        return vehicleInfo;
      });
    });

    return result;
  }
}

bootstrapApplication(App, {
  providers: [],
});