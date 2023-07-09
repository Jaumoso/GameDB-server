import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {
  form: FormGroup | undefined;
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  image = new FormControl('', [Validators.required]);
  released = new FormControl('', [Validators.required]);
  developer = new FormControl('', [Validators.required]);
  publisher = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  franchise = new FormControl('', [Validators.required]);
  platform = new FormControl('', [Validators.required]);
  decodedToken: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public location: Location,
    ) { 
      this.form = this.formBuilder.group({
        title: this.title,
        descripction: this.description,
        image: this.image,
        released: this.released,
        developer: this.developer,
        publisher: this.publisher,
        genre: this.genre,
        franchise: this.franchise,
        platform: this.platform,
      });
    }

  ngOnInit() {
    // Vacío de forma intencional
  }

  onSubmit() {

  }

}
