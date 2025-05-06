import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../app/services/data.service';
import { ObservationData, Property } from '../../../app/models/observation-data.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

interface TableRow {
  id: string;
  samplingTime: string;
  projectName: string;
  constructionCount: string;
  isCompleted: string;
  roadLength: string;
}

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class SummaryViewComponent implements OnInit {
  displayedColumns: string[] = [
    'samplingTime',
    'projectName',
    'constructionCount',
    'isCompleted',
    'roadLength'
  ];
  dataSource: TableRow[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe({
      next: (data: ObservationData[]) => {
        this.dataSource = data.map(item => {
          const row: TableRow = {
            id: item.id,
            samplingTime: item.SamplingTime,
            projectName: '',
            constructionCount: '',
            isCompleted: '',
            roadLength: ''
          };

          if (item.Properties && Array.isArray(item.Properties)) {
            item.Properties.forEach((prop: Property) => {
              
              switch (prop.Label) {
                case 'Project Name':
                  row.projectName = String(prop.Value);
                  break;
                case 'Construction Count':
                  row.constructionCount = String(prop.Value);
                  break;
                case 'Is Construction Completed':
                  row.isCompleted = String(prop.Value);
                  break;
                case 'Length of the road':
                  row.roadLength = String(prop.Value);
                  break;
              }
              
            });
          }

          return row;
        });
      },
      error: (error: Error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  onRowClick(element: TableRow): void {
  this.router.navigate([`/detailed/${element.id}`]);
}
}
