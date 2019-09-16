import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormArrayName } from '@angular/forms';
import { RecipeService } from '../recipes.service';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editModde: boolean = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editModde = params['id'] != null;
      this.inintForm();
    });
  }
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }
  private inintForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editModde) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
          for ( let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name),
                'amount': new FormControl(ingredient.amount)
              })
            );
          }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImg),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }
}
