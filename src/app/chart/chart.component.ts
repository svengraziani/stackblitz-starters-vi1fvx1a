import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleData, VehicleInfo, ScenarioInfo } from '../interfaces';
import { ScaleComponent } from '../scale/scale.component';
import { BarsComponent } from '../bars/bars.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, ScaleComponent, BarsComponent],
  template: `
    <svg class="chart-svg" [attr.viewBox]="'0 0 800 250'" preserveAspectRatio="xMinYMin meet">
      <!-- Scale -->
      <svg:g app-scale
        [scaleValues]="scaleValues"
        [maxValue]="maxValue">
      </svg:g>

      <!-- Bars -->
      <svg:g *ngFor="let scenario of scenarios; let scenarioIndex = index" 
         [attr.transform]="'translate(' + (40 + scenarioIndex * 140) + ', 0)'">
        
        <svg:g app-bars
          [vehicles]="getVehicles(scenario.key)"
          [selectedProperty]="selectedProperty"
          [baseColor]="scenario.baseColor"
          [selectedBar]="selectedBars[scenario.key]"
          (barClick)="onBarClick(scenario.key, $event)">
        </svg:g>

        <!-- Scenario label -->
        <svg:text 
          x="30"
          y="240"
          text-anchor="middle"
          class="scenario-label">
          {{scenario.key}}
        </svg:text>
      </svg:g>
    </svg>
  `
})
export class ChartComponent {
  @Input() scenarios: ScenarioInfo[] = [];
  @Input() selectedProperty!: keyof VehicleData;
  @Input() maxValue!: number;
  @Input() scaleValues: number[] = [];
  @Input() vehiclesByScenario!: { [key: string]: VehicleInfo[] };
  @Input() selectedBars: { [scenarioKey: string]: string } = {};

  readonly CHART_HEIGHT = 180;

  onBarClick(scenarioKey: string, vehicleKey: string) {
    if (this.selectedBars[scenarioKey] === vehicleKey) {
      delete this.selectedBars[scenarioKey];
    } else {
      this.selectedBars[scenarioKey] = vehicleKey;
    }
  }

  getVehicles(scenarioKey: string): VehicleInfo[] {
    return this.vehiclesByScenario[scenarioKey] || [];
  }
}