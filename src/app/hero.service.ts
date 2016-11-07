import { Injectable } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes';

@Injectable() //TypeScript sees the @Injectable() decorator and emits metadata about our service
export class HeroService {
    private heroesUrl = 'app/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]>{
        //return Promise.resolve(HEROES);
        return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
        //The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows.
        //For now we get back on familiar ground by immediately by converting that Observable to a Promise using the toPromise operator.
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
                    .then(heroes => heroes.find(hero => hero.id === id));
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Add new Hero
    /*private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
                    .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
                    .toPromise() //this is and extension to angular prmise added above by the line import 'rxjs/add/operator/toPromise';
                    .then(response => response.json().data) //Pay close attention to the shape of the data returned by the server. This particular in-memory web API example happens to return an object with a data property. Your API might return something else. Adjust the code to match your web API.
                    .catch(this.handleError);
    }*/

    // Update existing Hero
    /*private put(hero: Hero): Promise<Hero> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                    .put(url, JSON.stringify(hero), {headers: headers})
                    .toPromise()
                    .then(() => hero)
                    .catch(this.handleError);
    }*/


    

    /*getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
    }*/

    
    /*save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }*/

    

    /*delete(hero: Hero): Promise<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                    .delete(url, {headers: headers})
                    .toPromise()
                    .catch(this.handleError);
    }*/

    

}
