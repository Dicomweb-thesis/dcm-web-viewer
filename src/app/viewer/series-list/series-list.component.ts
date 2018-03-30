import { Component, OnInit } from '@angular/core';
import { SeriesListService } from "./series-list.service";
import { SeriesModel } from "./series.model";
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css'],
  providers: [SeriesListService]
})
export class SeriesListComponent implements OnInit {
  public series: SeriesModel[];
  errorMessage: String;
  private studyID: string;

  settings = {
    columns: {
      Manufacturer: {
        title: 'Manufacturer',
        type: 'string',
      },
      Modality: {
        title: 'Modality',
        type: 'string',
      },
      ProtocolName: {
        title: 'ProtocolName',
        type: 'string',
      },
      SeriesInstanceUID: {
        title: 'SeriesInstanceUID',
        type: 'string',
      },
      NumberOfSeries: {
        title: 'SeriesNumber',
        type: 'number'
      }
    },
  };
  dataSource = this.series;
  constructor(private seriesListServiec: SeriesListService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id;
    // Get patientID from url for loading study list
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.LoadServies(id);
    });
    this.studyID = id;
  }

  async LoadServies(studyID) {
    try {
      this.series = await this.seriesListServiec.getListViewModel(studyID);
      this.dataSource = this.series;
      console.log(this.dataSource);
    } catch (error) {
      this.errorMessage = error;
    }
  }
}
