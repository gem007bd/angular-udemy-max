import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test', 'simple description', 'http://sydneytimetocater.com.au/wp-content/uploads/2018/11/Meat-lamb-skewers.jpg'),
    new Recipe('A test 2', 'simple description 2', 'https://www.wallpaperup.com/uploads/wallpapers/2018/02/01/1199262/2c93886f34089d850ab0c838571d048b.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
