import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'b-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent implements OnInit {

  readonly layout = inject(LayoutService);

  ngOnInit() {
  }

}
