import { Injectable, EventEmitter, Output } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      "A test",
      "simple description",
      "http://sydneytimetocater.com.au/wp-content/uploads/2018/11/Meat-lamb-skewers.jpg"
    ),
    new Recipe(
      2,
      "A test 2",
      "simple description 2",
      "https://www.wallpaperup.com/uploads/wallpapers/2018/02/01/1199262/2c93886f34089d850ab0c838571d048b.jpg"
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    const recipe = this.recipes.find(r => {
      return r.id === id;
    });
    return recipe;
  }
}
