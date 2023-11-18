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
        let gameIds: Number[] = [];

        this.user.library?.forEach((libraryGame) => {
          // Get all the IDs from the games in the library
          gameIds.push(libraryGame.gameId!)
          // Save total number of games
          this.totalGames++;
          // Save total cost for all the games
          this.totalCost += libraryGame.acquisitionPrice!;
          // Save total hours for all the games
          this.totalHours += libraryGame.time!;
        });

        // Search for the games in IGDB
        this.gameService.getGamesById(gameIds).subscribe((retrievedGames) => {
          // Combine the properties 
          this.user?.library.forEach((game) => {
            const retrievedGame = retrievedGames.find(
              (retrieved) => retrieved.id === game.gameId
            );
            
            if (retrievedGame) {
              const combinedGame = {
                gameId: game.gameId,
                name: retrievedGame.name,
                releaseDate: retrievedGame.first_release_date,
                cover: retrievedGame.cover,
                own: game.own,
                format: game.format,
                state: game.state,
                platforms: game.platform,
                storefronts: game.storefront,
                acquisitionDate: game.acquisitionDate,
                acquisitionPrice: game.acquisitionPrice,
                rating: game.rating,
                time: game.time,
                comment: game.comment
              };
              
              // Step 4: Store the combined objects in the new array
              this.gameList.push(combinedGame);

              // Save game in platform counter
              if(combinedGame.platforms){
                this.processPlatforms(combinedGame, true);
              }

              // Save game in storefront counter
              if(combinedGame.storefronts){
                this.processStorefronts(combinedGame, true);
              }

              // Save game in State counter
              this.processStates(combinedGame.state!, 1);
            }
          });
        });
      })
  }

  processPlatforms(combinedGame: any, add: boolean) {
    combinedGame.platforms.forEach((platformName: string) => {
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

  processStorefronts(combinedGame: any, add: boolean) {
    combinedGame.storefronts.forEach((storefrontName: string) => {
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

  addGame() {
    if (this.user && this.user.library) {
      const dialogRef = this.addGameDialog.open(AddGameComponent, {
        // data: { library: this.user.library }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user?.library.push(result);
          // console.log(this.user);
          this.userService.updateUserContent(this.user?._id!, this.user!)
          .then(() => {
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
              this.gameList.push(combinedGame);
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
                verticalPosition: 'top',
                duration: 4000,
                panelClass: ['snackbar']
              }
            );
          })
          .catch(error => {
            console.error("Error updating user content:", error);
          });
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
            // Actualiza el juego en la lista de la biblioteca del usuario
            this.user?.library.splice(library_index!, 1, result);
  
            this.userService.updateUserContent(this.user?._id!, this.user!)
            .then(() => {
              // Recupera los datos del juego
              this.gameService.getGamesById([result.gameId]).subscribe((retrievedGame) => {
                // Combina las propiedades del juego actualizado con las propiedades del juego existente
                const updatedGame = {
                  ...this.gameList[gameList_index],
                  ...result,
                  name: retrievedGame[0].name,
                  releaseDate: retrievedGame[0].first_release_date,
                  cover: retrievedGame[0].cover,
                };
                // Actualiza el juego en la lista de juegos

                this.processStates(game.state, -1);
                if(game.platforms){this.processPlatforms(game, false);}
                if(game.storefronts){this.processStorefronts(game, false);}

                this.gameList.splice(gameList_index, 1, updatedGame);

                this.processStates(updatedGame.state, 1);
                if(updatedGame.platforms){this.processPlatforms(updatedGame, true);}
                if(updatedGame.storefronts){this.processStorefronts(updatedGame, true);}
              });
  
              this.snackBar.open(
                "Juego modificado.", 
                "OK",
                {
                  verticalPosition: 'top',
                  duration: 4000,
                  panelClass: ['snackbar']
                }
              );
            })
            .catch(error => {
              console.error("Error al actualizar el contenido del usuario:", error);
            });
          }
        }
      });
    }
  }

  deleteGame(game: any) {
    if(this.user && this.user.library){
      const dialogRef = this.deleteGameDialog.open(DeleteGameComponent, {
        data: { gameId: game.gameId, gameName: game.name, deleteGame: false }
      });

      dialogRef.afterClosed().subscribe((result => {
        if(result) {
          const index = this.user?.library.findIndex(g => g.gameId === game.gameId);
          if (index !== -1) {
            this.user?.library.splice(index!, 1);
            this.userService.updateUserContent(this.user?._id!,this.user!)
            .then(() => {
              this.gameList.splice(index!, 1);

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
                  verticalPosition: 'top',
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
