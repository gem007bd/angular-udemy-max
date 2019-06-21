import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
serverId = 10;
serverCreateStatus = 'No server was created';
allowNewServer = false;
serverName = 'test server';
username = '';
serverCreated = false;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {

  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreateStatus = 'Server was created! Name is  ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  onResetUserName() {
    this.username = null;
  }
}
