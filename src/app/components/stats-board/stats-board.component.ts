import {Component, Input} from '@angular/core';
import {FIELDS_NAMES} from '../../constants/twitter-stats.constants';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-stats-board',
  templateUrl: './stats-board.component.html',
  styleUrls: ['./stats-board.component.css']
})
export class StatsBoardComponent {
  @Input() stats: any;
  @Input() header: string;
  @Input() requireKeyChange: boolean;
  fieldsNames = FIELDS_NAMES;
}


