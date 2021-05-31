import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DoctorsService } from '../doctors.service';
import { ChartOptions, ChartType,ChartDataSets } from 'chart.js';
import { Label,Color } from 'ng2-charts';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private ds:DoctorsService) { }

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  docsArray;
  docArray;
  selctedDoc = 'Please Select Patient';

  BarChart:any=[];

  //patient name
  pId = 101;
  pName = 'Nancy Davolio';
  pEmail = 'ndavolio@msn.com';
  pDate = '2021-05-26';
  pUrl = 'https://www.htmlelements.com/demos/images/people/nancy.jpg';
  pDiagnosis = 'Areophobia';
  pSymptoms = 'Fear Of Flying';
  pStatus='InPatient';

  //updated details of patient
  // newName;
  // newDate;
  // newEmail;



  ngOnInit() {
    this.ds.getDoctors().subscribe((res) => {
      this.docsArray = res;
      // console.log(this.docsArray);
      for( let i=0;i<this.docsArray.length;i++){
        // console.log(this.docsArray[i].name);
        this.options.push(this.docsArray[i].name)
      }
      // console.log(this.options);

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
    
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  //this function will give me selected Patient Id and Index Value of docsArray Of that Patient Object
  onSelect(id,index){
    console.log(' Id of selcted Patient is ' + id + ' and that patient details is in ' + index + '  th index in docsArray');
    this.docArray = this.docsArray[index];
    // console.log(this.docArray);
    console.log(this.docArray.name);
    this.pName = this.docArray.name;
    this.pEmail = this.docArray.email;
    this.pDate = this.docArray.date;
    this.pUrl = this.docArray.imageUrl;
    this.pId = this.docArray.id;
    this.pDiagnosis = this.docArray.diagnosis;
    this.pSymptoms = this.docArray.symptoms;
    this.pStatus = this.docArray.status;
    console.log(this.pName, this.pEmail, this.pDate, this.pUrl,this.pDiagnosis,this.pSymptoms);
  }

  onSave(newName,newDate,newEmail,newStatus){
    let newData = {"id":this.pId,"name":newName,"date":newDate,"email":newEmail,"diagnosis":this.pDiagnosis,"symptoms":this.pSymptoms,"imageUrl":this.pUrl,"status":newStatus}
    console.log(newData);
    
    this.ds.updatePatient(this.pId,newData).subscribe((res) => {
      console.log(res);
      
    })
  }


//canvas Section
    // this Is Canvas Section
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

}
