import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Utils } from '../utils';
import { MemeService } from '../api/meme.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MemeDialogComponent } from '../meme-dialog/meme-dialog.component';
import { UserService } from '../api/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit, OnDestroy {
  @Input() imageHeight: number;
  @Input() imageWidth: number;
  @Input() memeId: number;
  @Input() frontPage = false;

  utils = Utils;


  imageLink = 'data:image/png;base64,ffff';  // ensures no null request being sent
  username: string;
  communityName: string;
  totalVote = 0;
  myVote = 0;

  loggedInSubscription: Subscription;

  constructor(private memeService: MemeService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loggedInSubscription = this.userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // get new vote amount by refetching the meme
        this.fetchMemeDetails();
      } else if (this.myVote !== 0) {
        // Reset my vote and add it to the total
        this.totalVote += this.myVote;
        this.myVote = 0;
      }
    });

    this.fetchMemeDetails();
  }

  fetchMemeDetails() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.Image.link;
      this.username = meme.creator.username;
      this.totalVote = meme.totalVote || 0;
      this.communityName = meme.Community && meme.Community.name;

      if (meme.myVote) {
        this.myVote =  meme.myVote.diff;
        this.totalVote -= this.myVote; // we represent the total as myVote + totalVote
      }
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

  dialogPage() {
    if (!Utils.isMobile) {
      const dialogRef = this.dialog.open(MemeDialogComponent, {
        data: { memeId: this.memeId },
        autoFocus: false,
      });
      const dialogInstance = dialogRef.componentInstance;
      dialogInstance.notifyCard.subscribe((vote: number) => {
        this.myVote = vote;
      });
    }
  }

  maxCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return this.imageWidth;
    }
  }

  minCardWidth(): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return 0;
    }
  }

  checkHeight(height: number): number {
    if (Utils.isMobile) {
      return null;
    } else {
      return height;
    }
  }

  async onClickUpVote() {
    try {
      const promise = (this.myVote === 1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.upvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === 1) ? 0 : 1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

  async onClickDownVote() {
    try {
      const promise = (this.myVote === -1) ? this.memeService.deleteMemeVote(this.memeId) : this.memeService.downvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === -1) ? 0 : -1;
    } catch (e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

}
