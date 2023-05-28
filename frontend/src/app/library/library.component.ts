import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../shared/game';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  games: Game[] = [];
  view: 'grid' | 'list' = 'list';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('GameDB_token');

    if (this.jwtService.isTokenExpired(token!)) {
      this.router.navigateByUrl('/home');
      return;
    }

    const decodedToken = this.jwtService.decodeToken(token!);

      this.userService.getUser(decodedToken._id)
      .then((user) => {
        // TODO: retrieve games
      })
  }

  toggleView(view: 'grid' | 'list') {
    this.view = view;
  }

}
