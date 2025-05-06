import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { Observation, Data } from '../../models/observation.model';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss']
})
export class SummaryViewComponent implements OnInit {
  displayedColumns: string[] = ['samplingTime', 'projectName', 'constructionCount', 'isCompleted', 'roadLength'];
  dataSource: any[] = [];

  constructor(private observationService: ObservationService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.observationService.getObservations().subscribe((data: Observation) => {
      this.dataSource = data.Datas.map(item => {
        const row: any = {
          samplingTime: new Date(item.SamplingTime).toLocaleString(),
          projectName: '',
          constructionCount: '',
          isCompleted: '',
          roadLength: ''
        };

        item.Properties.forEach(prop => {
          switch(prop.Label) {
            case 'Project Name':
              row.projectName = prop.Value;
              break;
            case 'Construction Count':
              row.constructionCount = prop.Value;
              break;
            case 'Is Construction Completed':
              row.isCompleted = prop.Value;
              break;
            case 'Length of the road':
              row.roadLength = prop.Value;
              break;
          }
        });

        return row;
      });
    });
  }
}
