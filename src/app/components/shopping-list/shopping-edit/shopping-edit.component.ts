import { Subscription } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from './../../../shared/ingredient.model';
import { ShoppingService } from './../shopping.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.startedEditing.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.editItem = this.shoppingService.getIngredient(id);
        this.slForm.setValue({
          nameInput: this.editItem.name,
          amountInput: this.editItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    if (!form.value.nameInput || !form.value.amountInput) {
      return;
    }
    const newIngredient = new Ingredient(form.value.nameInput, form.value.amountInput);
    if (this.editItem) {
      this.shoppingService.updateIngredient(this.editedItemId, newIngredient);
    } else {
      this.shoppingService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemId);
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
