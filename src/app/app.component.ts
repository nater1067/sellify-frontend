import { Component, OnInit } from '@angular/core';
import { mockSteps } from './mocks/mock-steps'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  steps = mockSteps

  constructor() { }

  ngOnInit() {

    if (typeof(EventSource) !== 'undefined') {
      console.info('Http2 Supported.');
      var source = new EventSource("http://localhost:8081/events");
      source.onmessage = (function(e) {
        if (e.data !== "") {
          const salesPipelineEvent = JSON.parse(e.data);
          console.log(salesPipelineEvent);
          console.log("this.steps", this.steps)
          let completedStep = this.steps.find(
            step => {
              return step.name == salesPipelineEvent.event_name
            }
          );
          if (completedStep !== undefined) {
            completedStep.completed = true;
            const keys = Object.keys(salesPipelineEvent.additionalInfo || {})
            completedStep.additionalInfo = keys.map(key => ({
              key,
              value: salesPipelineEvent.additionalInfo[key]
            }));
            completedStep.prospectId = salesPipelineEvent.prospectId;
            completedStep.productId = salesPipelineEvent.productId;
            completedStep.reportedTime = salesPipelineEvent.reportedTime;
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
