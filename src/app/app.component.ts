import {AfterViewInit, Component, OnInit} from '@angular/core';
import { mockSteps } from './mocks/mock-steps.js';
import { Chart } from 'chart.js';
import funnel from 'chartjs-funnel';

Chart.plugins.register(funnel)

// chartFunnelPlugin(Chart);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,  OnInit {

  steps = mockSteps;
  chart = [];

  constructor() { }

  ngAfterViewInit() {
    const myChart = new Chart(document.getElementById('canvas'), {
      type: 'funnel',
      data: {
        datasets: [{
          data: [30, 60, 90],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }],
        labels: [
          "Red",
          "Blue",
          "Yellow"
        ]
      }
    });

    this.chart = myChart;
  }
  ngOnInit() {

    if (typeof(EventSource) !== 'undefined') {
      console.info('Http2 Supported.');
      const source = new EventSource('http://localhost:8081/events');
      source.onmessage = (function(e) {
        if (e.data !== '') {
          const salesPipelineEvent = JSON.parse(e.data);
          console.log(salesPipelineEvent);
          console.log('this.steps', this.steps);
          const completedStep = this.steps.find(
            step => {
              return step.name == salesPipelineEvent.event_name;
            }
          );
          if (completedStep !== undefined) {
            completedStep.completed = true;
          }
        }
        // document.getElementById("result").innerHTML += event.data + "<br>";
      }).bind(this);
    } else {
      console.info('Http2 Not Supported.');
      // Sorry! No server-sent events support..
    }

    let currentStep = 0;
    // For some reason we need this in order for angular to detect changes and update templates
    // TODO - find a better way
    const interval = setInterval(() => {

      currentStep++;
      // Uncomment this to mock behavior of working app
      // this.steps[currentStep]["completed"] = true;

      if (currentStep === 11) {
        clearInterval(interval);
      }
    }, 2000);
  }
}
