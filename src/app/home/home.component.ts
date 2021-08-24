import { GetMessageService } from './../get-message.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message$!: Observable<any>;

  constructor(private getMessageService: GetMessageService) { }

  ngOnInit(): void {
    this.message$ = this.getMessageService.message$;
  }

}
