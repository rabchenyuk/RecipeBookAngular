import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-636ab.firebaseio.com/recipes.json',
            this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://ng-recipe-book-636ab.firebaseio.com/recipes.json')
            .pipe(
                map((response: Recipe[]) => {
                    for (let r of response) {
                        if (!r['ingredients']) {
                            console.log(r);
                            r['ingredients'] = [];
                        }
                    }
                    return response;
                })
            )
            .subscribe(
                (response: Recipe[]) => {
                    this.recipeService.setRecipes(response);
                }
            )
    }
}