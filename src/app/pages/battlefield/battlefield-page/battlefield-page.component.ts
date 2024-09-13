import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserListBottomsheetComponent } from '../components/user-list-bottomsheet/user-list-bottomsheet.component';
import { CurrentBattleBottomsheetComponent } from '../components/current-battle-bottomsheet/current-battle-bottomsheet.component';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { Pair } from '../../../models/pair';
import { users } from '../../../data/users';
import { pairs } from '../../../data/pairs';


@Component({
  selector: 'app-battlefield-page',
  templateUrl: './battlefield-page.component.html',
  styleUrl: './battlefield-page.component.css'
})
export class BattlefieldPageComponent {
  onlineUsers: User[] = users;
  pairs: Pair[] = pairs;
  messages: Message[] = [];
  newMessage: string = '';
  gridCols: number | undefined;
  elevation: any = null;
  hoveredPair: any = null;

  constructor(private breakpointObserver: BreakpointObserver, private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
            this.gridCols = 2;
          } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
            this.gridCols = 3;
          } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
            this.gridCols = 4;
          } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
            this.gridCols = 5;
          } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
            this.gridCols = 6;
          }
        }
      });
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
        const chatWindow = document.querySelector('.chat-window');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 100);
    }
  }

  onMouseEnter(pair: any): void {
    this.hoveredPair = pair;
  }

  onMouseLeave(): void {
    this.hoveredPair = null;
  }

  openBottomSheetForUserList(user: any): void {
    console.log(user)

    this.bottomSheet.open(UserListBottomsheetComponent, {
      data: user,
    });
  }

  openBottomSheetForBattle(pair: any): void {
    this.bottomSheet.open( CurrentBattleBottomsheetComponent, {
      data: pair,
    });
  }

}
