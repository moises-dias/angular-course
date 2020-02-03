import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // Instead of creating that service with new, 
  // you'll rely on Angular dependency injection 
  // to inject it into the HeroesComponent constructor.

  // Add a private heroService parameter of type HeroService to the constructor.
  // The parameter simultaneously defines a 
  // private heroService property and identifies it 
  // as a HeroService injection site.
  // When Angular creates a HeroesComponent, 
  // the Dependency Injection system sets the heroService 
  // parameter to the singleton instance of HeroService.

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    // Observable.subscribe()
    
    // The new version waits for the Observable to 
    // emit the array of heroes—which could happen now or 
    // several minutes from now. The subscribe() method passes the 
    // emitted array to the callback, which sets the 
    // component's heroes property.
    // This asynchronous approach will work when the HeroService requests heroes from the server.
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
