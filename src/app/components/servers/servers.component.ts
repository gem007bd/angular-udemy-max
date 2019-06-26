import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  secrectPassword = false;
  log = [];
  clickCount = 0;
  constructor() { }

  ngOnInit() {
  }

  onDetailClicked() {
    this.secrectPassword = !this.secrectPassword;
    this.clickCount ++;
    this.log.push(new Date());
  }

}
