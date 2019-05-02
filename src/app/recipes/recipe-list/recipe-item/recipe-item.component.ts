import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // case with @Output()
  // @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelected() {
    // case with @Output()
    // this.recipeSelected.emit();

    // case with using services
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
