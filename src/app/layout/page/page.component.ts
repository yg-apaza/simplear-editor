import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/security/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: []
})
export class PageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
