import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'b-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent implements OnInit {


  ngOnInit() {
  }

}
