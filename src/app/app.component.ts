import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  step1Complete = false;
  step2Complete = false;
  step3Complete = false;
  step4Complete = false;
  step5Complete = false;
  step6Complete = false;
  step7Complete = false;
  step8Complete = false;
  step9Complete = false;
  step10Complete = false;
  step11Complete = false;

  constructor() { }

  ngOnInit() {


    if (typeof(EventSource) !== 'undefined') {
      console.info('Http2 Supported.');
      var source = new EventSource("http://localhost:8080/events");
      source.onmessage = function(event) {
        console.log(event);
        // document.getElementById("result").innerHTML += event.data + "<br>";
      };
    } else {
      console.info('Http2 Not Supported.');
      // Sorry! No server-sent events support..
    }

    let currentStep = 0;
    const interval = setInterval(() => {

      currentStep++;
      this[`step${currentStep}Complete`] = true;

      if (currentStep === 11) {
        clearInterval(interval);
      }
    }, 2000);
  }
}
