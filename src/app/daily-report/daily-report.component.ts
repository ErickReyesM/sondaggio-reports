import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
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
  todayData:any[] = [];
  milliSecondsInADay:number = 86400000;

  constructor() { 
        /*let todayNow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
          let dayInSurvey = new Date(docSnapShot.data().created.toDate().getFullYear(), 
          docSnapShot.data().created.toDate().getMonth(),
          docSnapShot.data().created.toDate().getDate());
          if ( dayInSurvey.getTime() == todayNow.getTime() ){
            this.todayData.push(docSnapShot);
          }*/
  }

  ngOnInit() {
    let docsS:firebase.firestore.QueryDocumentSnapshot[];

    let chart = new CanvasJS.Chart("daily-chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Reporte Diario"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();

    
    docsS = this.getDocsFromFireBase();
    console.log(docsS);

  }

  private getDocsFromFireBase():firebase.firestore.QueryDocumentSnapshot[]{

    let docs:firebase.firestore.QueryDocumentSnapshot[] = [];

    firebase.firestore().collection(this.collection).where('surveyID', '==', this.surveyId).get().then(
      (querySnapShot) => {
        docs = docs.concat();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
    return docs;
  }

}
