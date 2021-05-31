import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType,ChartDataSets } from 'chart.js';
import { Label,Color } from 'ng2-charts';


@Component({
  selector: 'app-bart-chart',
  templateUrl: './bart-chart.component.html',
  styleUrls: ['./bart-chart.component.css']
})
export class BartChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Circulatory', 'Digestive', 'Endocrine', 'Nervous', 'Renal', 'Respiratory'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [55, 55, 38, 85, 65, 52, 75, 65, 45], label: 'Inpatients' },
    { data: [80, 90, 55, 50, 58, 65, 55, 75, 0], label: 'Outpatients' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'blue' },
  ]


  constructor() { }
  
  

  ngOnInit(): void {
    
  }

}
