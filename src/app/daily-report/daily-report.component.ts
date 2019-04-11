import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import * as firebase from 'firebase';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  collection:string = 'userInput';
  surveyId:string = 'HgtFAndYZm1uYHdcEPk8';
  today:Date = new Date();
  dataTime:number[] = [];
  milliSecondsInADay:number = 86400000;

  constructor() { }

  ngOnInit() {

    let dataObject = {
      animationEnabled: true,
      exportEnabled: true,
      title: { text: "Reporte Diario" },
      data:[
        {
          type: "column",
          name: this.today.toDateString(),
          showInLegend: true,
          dataPoints: []
        }
      ]
    };

    let todayNow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    let dayInSurvey:Date;
    this.getDocsFromFireBase(this.collection, this.surveyId).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        dayInSurvey = 
        new Date(doc.data().created.toDate().getFullYear(), doc.data().created.toDate().getMonth(), doc.data().created.toDate().getDate());
        if ( dayInSurvey.getTime() == todayNow.getTime() ){
          //console.log(doc.data().created.toDate().getTime());
          //console.log(doc.data().input);
          dataObject.data[0].dataPoints.push({ label: doc.data().created.toDate().getHours(), y: 4 });
        }
      });
    }).catch( (err) => {
      //TODO
    });

    console.log(dataObject);
    let chart = new CanvasJS.Chart("daily-chartContainer", dataObject);

    chart.render();
  }

  private getDocsFromFireBase(collection:string, surveyId:string):Promise<firebase.firestore.QuerySnapshot>{
    return firebase.firestore().collection(collection).where('surveyID', '==', surveyId).get();
  }

}
