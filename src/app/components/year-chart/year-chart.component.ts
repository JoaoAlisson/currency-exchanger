import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-year-chart',
  templateUrl: './year-chart.component.html',
  styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements OnChanges {

  @Input()
  public data: number[] = [];

  @Input()
  public title = '';

  @Input()
  public seriesName = '';


  @ViewChild("chart") chart: ChartComponent | null = null;
  public chartOptions: ChartOptions = {
    chart: {
      height: 350,
      type: "bar"
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  } as ChartOptions;

  constructor() { }

  public ngOnChanges(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: this.seriesName,
          data: this.data
        }
      ],
      title: {
        text: this.title
      },
    } as any;
  }
}
