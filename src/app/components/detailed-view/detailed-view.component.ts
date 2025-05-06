import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../app/services/data.service';
import { ObservationData, Property } from '../../../app/models/observation-data.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class DetailedViewComponent implements OnInit {
  form: FormGroup;
  selectedData: ObservationData | null = null;
  samplingTimes: string[] = [];
  isSubmitting = false;
  errorMessage = '';
  selectedSamplingTime: string | null = null; // Track the selected sampling time

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.loadData(id);
    }
  }


  loadData(id: string): void {
    this.dataService.getData().subscribe({
      next: (data: ObservationData[]) => {
        // Update samplingTimes with the available sampling times
        this.samplingTimes = data.map(item => item.SamplingTime);

        // Filter data based on id
        this.selectedData = data.find(item => item.id === id) || null;
        console.log('Selected Data:', this.selectedData);


        if (this.selectedData) {
          this.initializeForm();
        } else {
          this.errorMessage = 'Sample data not found.';
        }
      },
      error: (error: any) => {
        console.error('Error loading data:', error);
        this.errorMessage = 'Failed to load data. Please try again.';
      }
    });
  }

  onSamplingTimeSelect(samplingTime: string): void {
    this.selectedSamplingTime = samplingTime; // Update the selected sampling time
    this.dataService.getData().subscribe(
      (data: ObservationData[]) => {
        this.selectedData = data.find(item => item.SamplingTime === samplingTime) || null;
        if (this.selectedData) {
          this.initializeForm();
        }
      },
      (error: Error) => {
        console.error('Error loading selected data:', error);
        this.errorMessage = 'Failed to load selected data. Please try again.';
      }
    );
  }

  initializeForm(): void {
    if (!this.selectedData) return;

    const formGroup: { [key: string]: any } = {};
    if (this.selectedData.Properties) {
      this.selectedData.Properties.forEach((prop: Property) => {
        formGroup[prop.Label] = [prop.Value];
      });
    }
    this.form = this.fb.group(formGroup);
  }

  getInputType(value: any): string {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    return 'text';
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedData) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Create the updated data object with the same 'id' as the original
      const updatedData: ObservationData = {
        ...this.selectedData,
        id: this.selectedData.id, // Make sure 'id' is passed
        Properties: this.selectedData.Properties.map((prop: Property) => ({
          ...prop,
          Value: this.form.get(prop.Label)?.value
        }))
      };

      // Call the update method with the updated data object
      this.dataService.updateData(updatedData).subscribe(
        () => {
          this.isSubmitting = false;
          this.router.navigate(['/']);
        },
        (error: Error) => {
          console.error('Error updating data:', error);
          this.isSubmitting = false;
          this.errorMessage = 'Failed to save changes. Please try again.';
        }
      );
    }
  }
}
