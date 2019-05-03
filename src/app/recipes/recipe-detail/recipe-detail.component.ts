import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  isOpen = false;

  constructor(private slService: ShoppingListService,
              private recipeService: RecipeService) { }

  ngOnInit() {
  }

  toShoppingList() {
    // this.recipe.ingredients.forEach((ingredient: Ingredient) => this.slService.addIngredient(ingredient));
    // or
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  openModal() {
    this.isOpen = !this.isOpen;
  }
}
