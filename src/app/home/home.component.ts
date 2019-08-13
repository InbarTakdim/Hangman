import { Component, OnInit, NgZone } from '@angular/core';
import moviesJson from "../../assets/data/movies.json";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: string[];
  movieName: string[];
  letters: any;
  guess: number = 0;
  gameOver: boolean = false;
  finished: boolean = false;
  msgText:string='';
  constructor(public zone: NgZone) { }

  ngOnInit() {
    //get JSON
    this.letters = {
      'A': true,
      'B': true,
      'D': true,
      'C': true,
      'E': true,
      'F': true,
      'G': true,
      'H': true,
      'I': true,
      'J': true,
      'K': true,
      'L': true,
      'M': true,
      'N': true,
      'O': true,
      'P': true,
      'Q': true,
      'R': true,
      'S': true,
      'T': true,
      'U': true,
      'V': true,
      'W': true,
      'X': true,
      'Y': true,
      'Z': true,

    };

    this.movies = moviesJson.map(movie => movie.title);
    this.movieName = this.randomMovie().split("");
    this.showSomeLetters();
    console.log(this.movieName)
  }

  getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v.toUpperCase() === value && count++));
    return count;
  }

  randomMovie() {
    return this.movies[Math.floor(Math.random() * this.movies.length)];
  }

  showSomeLetters() {
    let counter = 0;
    let letterOccurrence;
    let arr = [];
    let removeSpaced = this.movieName.join(" ").split(" ").join("");
    let quarter = Math.floor(removeSpaced.length * 0.25);
    for (let key in this.letters) {
      if (counter < quarter) {
        letterOccurrence = this.getOccurrence(this.movieName, key);
        if (letterOccurrence > 0 && counter + letterOccurrence <= quarter) {
          this.letters[key] = false;
          counter += letterOccurrence;
        }
      }

    }

  }

  checkLetter(letter) {
    this.zone.run(() => {
      if (this.letters[letter]) {
        this.letters[letter] = false;
        if (!this.movieName.includes(letter) && !this.movieName.includes(letter.toLowerCase())) {
          this.guess++
        }
        if (this.guess == 8) {
          //game over
          this.gameOver = true;
          this.msgText="Game over!"
          for (let key in this.letters) {
            this.letters[key] = false;
  
          }
          return;
        }
        for (let item of this.movieName) {
          if (this.letters[item.toUpperCase()]) {
            return;
          }

        }
        this.finished = true;
        this.msgText="Great Job!"

      }
    })

  }

}
