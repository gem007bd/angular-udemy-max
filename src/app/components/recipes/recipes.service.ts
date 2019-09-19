import { Subject } from "rxjs";
import { Ingredient } from "./../../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "A test",
      "simple description",
      "http://sydneytimetocater.com.au/wp-content/uploads/2018/11/Meat-lamb-skewers.jpg",
      [new Ingredient("Meat", 1), new Ingredient("Franch Fries", 20)]
    ),
    new Recipe(
      "A test 2",
      "simple description 2",
      "https://www.wallpaperup.com/uploads/wallpapers/2018/02/01/1199262/2c93886f34089d850ab0c838571d048b.jpg",
      [new Ingredient("Meat", 1), new Ingredient("Franch Fries", 20)]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}
