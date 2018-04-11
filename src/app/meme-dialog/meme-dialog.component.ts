import {Component, Input, OnInit} from '@angular/core';

import {MatDialogModule} from '@angular/material';
import {Utils} from '../utils';
import {MemeCardComponent} from '../meme-card/meme-card.component';

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  providers: [MatDialogModule],
  styleUrls: ['./meme-dialog.component.scss']
})
export class MemeDialogComponent implements OnInit {
  @Input() username: string;
  @Input() image: string;
  @Input() parent: MemeCardComponent;
  @Input() totalVote: number;
  @Input() myVote: number;

  constructor() {
  }

  ngOnInit() {
  }

  maxCardWidth(): number {
    return Utils.screenWidth * 0.70;
  }

  minCardWidth(): number {
    return Utils.screenWidth * 0.5;
  }

  maxDialogHeight(): number {
    return Utils.screenHeight * 0.9;
  }

  // I'd rather do these in a more natural way, e.g. property binding but I can't seem to get it to work properly
  onClickUpVote() {
    this.parent.onClickUpVote();
    this.totalVote = this.parent.totalVote;
    this.myVote = this.parent.myVote;
  }

  onClickDownVote() {
    this.parent.onClickDownVote();
    this.totalVote = this.parent.totalVote;
    this.myVote = this.parent.myVote;
  }

}