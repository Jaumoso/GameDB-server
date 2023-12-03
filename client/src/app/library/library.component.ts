import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from '../dialogs/add-game/add-game.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteGameComponent } from '../dialogs/delete-game/delete-game.component';
import { Storefront } from '../shared/storefront';
import { ModifyGameComponent } from '../dialogs/modify-game/modify-game.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  gameList: any[] = [];
  platforms: any[] = [];
  storefronts: any[] = [];
  states: number[] = [0,0,0,0,0,0,0,0,0,0];
  private user: User | undefined;
  isGridView: Boolean = false;
  viewType: String = 'list';
  storefrontInfo: Storefront[] | undefined;
  searchText: String = '';
  filteredGames: any[] | undefined;

  // Total variables
  totalGames: number = 0;
  totalCost: number = 0;
  totalHours: number = 0;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private gameService: GameService,
    private router: Router,
    private addGameDialog: MatDialog,
    private deleteGameDialog: MatDialog,
    private snackBar: MatSnackBar,
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
        this.user = user;
        
        this.user.library?.forEach((libraryGame) => {
          // Save total number of games
          this.totalGames++;
          // Save total cost for all the games
          this.totalCost += libraryGame.acquisitionPrice!;
          // Save total hours for all the games
          this.totalHours += libraryGame.time!;
        });

        this.gameList = this.user.library;
        this.filteredGames = this.user.library;

        this.user.library.forEach((game) => {
          // Save game in platform counter
          if(game.platforms){
            this.processPlatforms(game, true);
          }

          // Save game in storefront counter
          if(game.storefronts){
            this.processStorefronts(game, true);
          }

          // Save game in State counter
          this.processStates(game.state!, 1);
        });
      });
  }

  processPlatforms(game: any, add: boolean) {
    game.platforms.forEach((platformName: string) => {
      const index = this.platforms.findIndex(p => p.name === platformName);
      if (index !== -1) {
        if(add){
          this.platforms[index].counter++;
        }
        else {
          this.platforms[index].counter--;
        }
      } else {
        this.platforms.push({ name: platformName, counter: 1});
      }
    });
  }

  processStorefronts(game: any, add: boolean) {
    game.storefronts.forEach((storefrontName: string) => {
      const index = this.storefronts.findIndex(s => s.name === storefrontName);
      if (index !== -1) {
        if(add){
          this.storefronts[index].counter++;
        }
        else{
          this.storefronts[index].counter--;
        }
      } else {
        this.storefronts.push({name: storefrontName, counter: 1});
      }
    });
  }

  processStates(state: string, change: number) {
    if(state == 'Not Interested') { this.states[0] = this.states[0]+change}
    if(state == 'Wishlist') { this.states[1] = this.states[1]+change}
    if(state == 'Backlog') { this.states[2] = this.states[2]+change}
    if(state == 'Tried') { this.states[3] = this.states[3]+change}
    if(state == 'Playing') { this.states[4] = this.states[4]+change}
    if(state == 'Played') { this.states[5] = this.states[5]+change}
    if(state == 'Completed') { this.states[6] = this.states[6]+change}
    if(state == 'Retired') { this.states[7] = this.states[7]+change}
    if(state == 'Shelved') { this.states[8] = this.states[8]+change}
    if(state == 'Abandoned') { this.states[9] = this.states[9]+change}
  }

  searchGames(): any[] {
    // If no search text is provided, return all games
    if (!this.searchText) {
      this.filteredGames = this.gameList; // Update the filteredGames array
      return this.filteredGames;
    }
  
    // Filter the collections based on the search text and category
    const filteredGames = this.gameList.filter((game) => {
      const match = game.name && this.isMatch(game.name);
      return match;
    });
  
    this.filteredGames = filteredGames;
    return filteredGames;
  }

  isMatch(str: string): boolean {
    const normalizedStr = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedSearchText = this.searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return normalizedStr.includes(normalizedSearchText);
  }

  deleteSearch() {
    this.searchText = '';
    this.filteredGames = this.gameList;
  }

  addGame() {
    if (this.user && this.user.library) {
      const dialogRef = this.addGameDialog.open(AddGameComponent, {
        data: { library: this.user.library }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.gameService.getGamesById([result.gameId]).subscribe((retrievedGame) =>{

            const combinedGame = {
              gameId: result.gameId,
              name: retrievedGame[0].name,
              releaseDate: retrievedGame[0].first_release_date,
              cover: retrievedGame[0].cover,
              own: result.own,
              format: result.format,
              state: result.state,
              platforms: result.platform,
              storefronts: result.storefront,
              acquisitionDate: result.acquisitionDate,
              acquisitionPrice: result.acquisitionPrice,
              rating: result.rating,
              time: result.time,
              comment: result.comment
            };
            // this.gameList.push(combinedGame);
            this.user!.library.push(combinedGame);
            this.userService.updateUserContent(this.user?._id!, this.user!)
            .then(() => {
              console.log('Game added to library.')
            });
            this.processStates(combinedGame.state, 1);
            if(combinedGame.platforms){this.processPlatforms(combinedGame, true);}
            if(combinedGame.storefronts){this.processStorefronts(combinedGame, true);}
          });

          this.totalGames++;
          this.totalCost += result.acquisitionPrice;
          this.totalHours += result.time;

          this.snackBar.open(
            "Game added to the library.",
            "OK",
            {
              verticalPosition: 'bottom',
              duration: 4000,
              panelClass: ['snackbar']
            }
          );
        }
      });
    }
  }

  modifyGame(game: any) {
    if (this.user && this.user.library) {
      const dialogRef = this.addGameDialog.open(ModifyGameComponent, {
        data: { game: game }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Encuentra el juego en la lista de la biblioteca del usuario
          const library_index = this.user?.library.findIndex(g => g.gameId === result.gameId);
          // Encuentra el juego en la lista de juegos
          const gameList_index = this.gameList.findIndex(g => g.gameId === result.gameId);
  
          if (library_index !== -1 && gameList_index !== -1) {
            // Actualiza el juego en la lista de juegos
            this.user?.library.splice(library_index!, 1, result);
            // Actualiza el juego en la lista de la biblioteca del usuario
            this.userService.updateUserContent(this.user?._id!, this.user!);

            this.processStates(game.state, -1);
            if(game.platforms){this.processPlatforms(game, false);}
            if(game.storefronts){this.processStorefronts(game, false);}

            // this.gameList.splice(gameList_index, 1, result);

            this.processStates(result.state, 1);
            if(result.platforms){this.processPlatforms(result, true);}
            if(result.storefronts){this.processStorefronts(result, true);}

          this.snackBar.open(
            "Game modified.", 
            "OK",
            {
              verticalPosition: 'bottom',
              duration: 4000,
              panelClass: ['snackbar']
            }
          );
          }
        }
      });
    }
  }

  deleteGame(game: any) {
    if(this.user && this.user.library){
      const dialogRef = this.deleteGameDialog.open(DeleteGameComponent, {
        data: { gameName: game.name, deleteGame: false }
      });

      dialogRef.afterClosed().subscribe((result => {
        if(result) {
          const index = this.user?.library.findIndex(g => g.gameId === game.gameId);
          if (index !== -1) {
            this.user?.library.splice(index!, 1);
            this.userService.updateUserContent(this.user?._id!,this.user!)
            .then(() => {
              // this.gameList.splice(index!, 1) 

              // Decrease counters
              this.totalGames--;
              this.processStates(game.state, -1);
              if(game.platforms){this.processPlatforms(game, false);}
              if(game.storefronts){this.processStorefronts(game, false);}
              this.totalCost = this.totalCost - result.acquisitionPrice;
              if(result.time){this.totalHours = this.totalHours - result.time;}

              this.snackBar.open(
                "Game deleted from library.", 
                "OK",
                {
                  verticalPosition: 'bottom',
                  duration: 4000,
                  panelClass: ['snackbar']
                }
                );
            })
            .catch(error => {
              console.error("Error updating user content:", error);
            });
          }
        }
      }))
    }
  }
}
