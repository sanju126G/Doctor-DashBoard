import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DoctorsService } from '../doctors.service';
// import { Chart } from 'node_modules/chart.js';

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
    
    // this Is Canvas Section
    
//     var ctx = document.getElementById('myChart').getContext('2d')
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
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


}
