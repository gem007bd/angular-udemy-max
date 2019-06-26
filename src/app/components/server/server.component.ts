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
serverStatus = 'offline';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);

    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  ngOnInit() {}

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreateStatus = 'Server was created! Name is  ' + this.serverName + ' ' + this.serverStatus;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  onResetUserName() {
    this.username = null;
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
