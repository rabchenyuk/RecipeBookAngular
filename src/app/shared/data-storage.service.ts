import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://ng-recipe-book-636ab.firebaseio.com/recipes.json?auth='
         + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://ng-recipe-book-636ab.firebaseio.com/recipes.json?auth=' + token)
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