import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: ProductModel;

  constructor() { }

  ngOnInit(): void {
  }

}
