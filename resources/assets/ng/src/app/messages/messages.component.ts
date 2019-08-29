import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: string[];

  constructor(public messageService: MessageService, public bar: MatSnackBar) { }

  ngOnInit() {
    this.messages = this.messageService.messages;
  }

}
