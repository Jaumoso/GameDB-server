import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private darkTheme: boolean = false;
    private _themeEmitter = new EventEmitter<boolean>();

    get getTheme() {
        return this.darkTheme;
    }

    setDarkTheme() {
        this.darkTheme = !this.darkTheme;
        document.body.classList.toggle('dark-theme');
        this._themeEmitter.emit(this.darkTheme);
    }

    get themeChanges() {
        return this._themeEmitter.asObservable();
    }
}