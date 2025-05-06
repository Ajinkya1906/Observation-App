import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservationService } from '../../services/observation.service';
import { Observation, Data, Property } from '../../models/observation.model';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  observation: Observation | null = null;
  selectedData: Data | null = null;
  form: FormGroup;
  samplingTimes: string[] = [];

  constructor(
    private observationService: ObservationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.observationService.getObservations().subscribe((data: Observation) => {
      this.observation = data;
      this.samplingTimes = data.Datas.map(d => d.SamplingTime);
      if (this.samplingTimes.length > 0) {
        this.onSamplingTimeSelect(this.samplingTimes[0]);
      }
    });
  }

  onSamplingTimeSelect(samplingTime: string) {
    if (!this.observation) return;

    this.selectedData = this.observation.Datas.find(d => d.SamplingTime === samplingTime) || null;
    if (this.selectedData) {
      const formGroup: { [key: string]: any } = {};
      this.selectedData.Properties.forEach(prop => {
        formGroup[prop.Label] = [prop.Value];
      });
      this.form = this.fb.group(formGroup);
    }
  }

  getInputType(value: any): string {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    return 'text';
  }

  onSubmit() {
    if (!this.observation || !this.selectedData) return;

    const updatedProperties: Property[] = Object.keys(this.form.value).map(key => ({
      Label: key,
      Value: this.form.value[key]
    }));

    const updatedData: Data = {
      ...this.selectedData,
      Properties: updatedProperties
    };

    const updatedObservation: Observation = {
      ...this.observation,
      Datas: this.observation.Datas.map(d => 
        d.SamplingTime === this.selectedData?.SamplingTime ? updatedData : d
      )
    };

    this.observationService.updateObservation(updatedObservation).subscribe(
      response => {
        console.log('Data updated successfully');
        this.loadData();
      },
      error => {
        console.error('Error updating data:', error);
      }
    );
  }
}
