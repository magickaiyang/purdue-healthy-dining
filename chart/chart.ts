import { Component, OnInit, ApplicationRef } from '@angular/core';
import { NavController, TabButton } from 'ionic-angular';
import Chart from 'chart.js';
import { HomePage } from '../home/home';


@Component({
     selector: 'page-chart',
     templateUrl: 'chart.html'
     //templateUrl: './chart.component.html'
})
export class ChartPage implements OnInit {

  constructor(public navCtrl: NavController) {
       //console.log(('Im here'));
  }

  ngOnInit() {
     //logging does not work when I save the menu page last 
     //BARCHART
   var bar = document.getElementById("barChart");
   document.getElementById("barChart").onclick = function(evt){
     try{
       var activePoints = barChart.getElementsAtEvent(evt);
       var point = activePoints[0];
       var label = barChart.data.labels[point._index];
       var value = barChart.data.datasets[point._datasetIndex].data[point._index];
       alert(label + ": " + value);
       //window.location. = "../Info/info"

       
     } catch (e){
         //don't do anything if bar not clicked
         alert('Please click on a valid bar. If the bar is too small, click on ' +
                     'the label to learn more!');
     }
   };
    var barChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels: ["Carbs", "Sugar", "Protein", "Salt", "Calories"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#e145f6", "#f6e145","#f36a15","#9ef315","#15f3d9"],
            data: [150,300,200,110,300]
          }
        ]
      },
      options: {
        legend: { display: true },
         
        title: {
          display: true,
          text: 'Nutrients in Aglarabaa'
        }, 
        responsive: false,

        layout: {
          padding: {
             top: 30,
             x: 10,
             y: 10
          }
        }
      }
     });
      

      
      //PIE CHART
     var pie = document.getElementById("pieChart");
     var pieChart = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Carbs", "Sugar", "Protein", "Salt", "Calories"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#e145f6", "#f6e145","#f36a15","#9ef315","#15f3d9"],
            data: [150,300,200,110,300]
          }
        ] 
      },
      options: {
        //legend: { display: true },
      
        title: {
          display: true,
          text: 'Nutrients in Aglarabaa'
        }, 
       responsive: false, 
       layout: {
         padding: {
            top: 90
         }
       }
      }
     });

     //POLAR
     var polar = document.getElementById("polarChart");
     var polarChart = new Chart(polar, {
      type: 'polarArea',
      data: {
        labels: ["Carbs", "Sugar", "Protein", "Salt", "Calories"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#e145f6", "#f6e145","#f36a15","#9ef315","#15f3d9"],
            data: [150,300,200,110,300]
          }
        ] 
      },
      options: {
        //legend: { display: true },
      
        title: {
          display: true,
          text: 'Nutrients in Aglarabaa'
        },
       //responsive: false, 
       layout: {
         padding: {
            top: 90
         }
       }
      }
     });


     //DONUT CHART 
     var donut = document.getElementById("donutChart");
     var donutChart = new Chart(donut, {
      type: 'doughnut',
      data: {
        labels: ["Carbs", "Sugar", "Protein", "Salt", "Calories"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#e145f6", "#f6e145","#f36a15","#9ef315","#15f3d9"],
            data: [150,300,200,110,300]
          }
        ] 
      },
      options: {
        //legend: { display: true },
      
        title: {
          display: true,
          text: 'Nutrients in Aglarabaa'
        },
       //responsive: false, 
       layout: {
         padding: {
            top: 90
         }
       }
      }
     });

     var bubble = document.getElementById("bubChart");
     var bubChart = new Chart(bubble, {
      type: 'bubble',
      data: {
        labels: ["Carbs", "Sugar", "Protein", "Salt", "Calories"],
        datasets: [
          {
            label: ["Carbs"],
            backgroundColor: "rgba(255,221,50,0.2)",
            borderColor: "rgba(255,221,50,1)",
            data: [{
              x: 200,
              y: 5.245,
              r: 30
            }]
          }, {
            label: ["Sugar"],
            backgroundColor: "rgba(60,186,159,0.2)",
            borderColor: "rgba(60,186,159,1)",
            data: [{
              x: 200,
              y: 7.526,
              r: 30
            }]
          }, {
            label: ["Protein"],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "#000",
            data: [{
              x: 300,
              y: 6.994,
              r: 15
            }]
          }, {
            label: ["Salt"],
            backgroundColor: "rgba(193,46,12,0.2)",
            borderColor: "rgba(193,46,12,1)",
            data: [{
              x: 100,
              y: 5.921,
              r: 10
            }]
          }, {
            label: ["Calories"],
            backgroundColor: "rgba(339,80,61,0.43)",
            borderColor: "rgba(193,46,12,1)",
            data: [{
            x: 325,
            y: 5.921,
            r: 20
          }]
          }
        ]
      },
      options: {
        //legend: { display: true },
      
        title: {
          display: true,
          text: 'Nutrients in Aglarabaa'
        },
       //responsive: false, 
       layout: {
         padding: {
           top: 60
         }
       }
      }
     });

  }

  


}
