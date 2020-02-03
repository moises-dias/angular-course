import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// When you provide the service at the root level, 
// Angular creates a single, shared instance of HeroService and 
// injects into any class that asks for it. 
// Registering the provider in the @Injectable metadata also allows 
// Angular to optimize an app by removing the service if it 
// turns out not to be used after all.
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService) { }

  // retorno assíncrono
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
