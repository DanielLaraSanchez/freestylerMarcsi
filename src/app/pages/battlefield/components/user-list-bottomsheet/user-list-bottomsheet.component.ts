import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Message } from '../../../../models/message';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { BattleDialogComponent } from '../battle-dialog/battle-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list-bottomsheet',
  templateUrl: './user-list-bottomsheet.component.html',
  styleUrl: './user-list-bottomsheet.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserListBottomsheetComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  private breakpointSubscription: Subscription | any;
  private width: string = '75vw';
  private height: string = '75vh';

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<UserListBottomsheetComponent>, private dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .subscribe(result => {
      if (result.matches) {
        this.width = '100vw';
        this.height = '100vh';
        console.log("mobile", this.width, this.height)
      }
  });

}

  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  sendMessage() {
    if (this.newMessage.trim().length > 0) {
      this.messages.push({
        user: 'You',
        text: this.newMessage.trim(),
      });
      this.newMessage = '';
      // Scroll to bottom after adding message
      setTimeout(() => {
        const chatWindow = document.querySelector('.chat-window2');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 100);
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    // this.closeSheet();
    console.log(this.data)
    this.dialog.open(BattleDialogComponent, {
      data: this.data,
      minWidth: this.width,
      minHeight: this.height,
      width: this.width,
      height: this.height,
      maxWidth: this.width,
      maxHeight: this.height,
      panelClass: 'custom-dialog-container',
      disableClose: true,
      hasBackdrop: true,
      ariaLabel: 'Battle dialog',
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
      restoreFocus: true
    }).afterClosed().subscribe(() => {
      // Re-subscribe after the dialog is closed
      if (this.breakpointSubscription) {
        this.breakpointSubscription.unsubscribe();
      }
    });
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  watchBattle(): void {
    this.closeSheet();


        this.dialog.open(BattleDialogComponent, {
          data: { user1: this.data.user1, user2: this.data.user2 },
          minWidth: this.width,
          minHeight: this.height,
          width: this.width,
          height: this.height,
          maxWidth: this.width,
          maxHeight: this.height,
          panelClass: 'custom-dialog-container',
          disableClose: true,
          hasBackdrop: true,
          ariaLabel: 'Battle dialog',
          autoFocus: false,
          backdropClass: 'dialog-backdrop',
          restoreFocus: true
        }).afterClosed().subscribe(() => {
          // Re-subscribe after the dialog is closed
          if (this.breakpointSubscription) {
            this.breakpointSubscription.unsubscribe();
          }
        });


    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

}
