import { Component } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.scss']
})
export class GamedetailsComponent {

  gameId: Number | undefined;
  gameInfo: any;
  loading: boolean = true;
  rating: number = 0;
  critic_rating: number = 0;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
  ){}

  async ngOnInit(){
    const token = localStorage.getItem('GameDB_token');
    
    if (this.jwtService.isTokenExpired(token!)) {
      this.router.navigateByUrl('/home');
      return;
    }

    this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
    })

    this.gameService.getCompleteGameInfo(this.gameId!).subscribe((gameInfo) => {
      console.log(gameInfo);
      this.gameInfo = gameInfo.gameInfo;
      this.loading = false;
    });

  }
}
