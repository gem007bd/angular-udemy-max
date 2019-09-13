import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./components/recipes/recipes-detail/recipes-detail.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  { path: "", redirectTo: 'recipe', pathMatch: "full" },
  {
    path: "recipe",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      { path: ":id", component: RecipesDetailComponent },
      { path: ":id/edit", component: RecipeEditComponent }
    ]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "**", component: RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
