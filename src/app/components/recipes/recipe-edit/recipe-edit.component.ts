import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormArrayName,
  Validators
} from "@angular/forms";
import { RecipeService } from "../recipes.service";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editModde: boolean = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editModde = params["id"] != null;
      this.inintForm();
    });
  }
  get controls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }
  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );

    if (this.editModde) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancle();
  }

  onAddIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancle() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private inintForm() {
    let recipeName = "";
    let recipeImg = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editModde) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }


}
