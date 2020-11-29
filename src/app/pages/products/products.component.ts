import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel> = [];

  constructor() { }

  ngOnInit(): void {

    this.products = [
      { id: '1', name: 'Banana', description: 'Fruta amarilla', image: 'bananas' },
      { id: '4', name: 'Manzana', description: 'Fruta de forma redonda y sabor más o menos dulce, dependiendo de la variedad. ', image: 'manzana' },
      { id: '2', name: 'Coco', description: 'Fruta tropical obtenida del cocotero. Tiene una cáscara gruesa y un centro comestible blando', image: 'cocos' },
      { id: '3', name: 'Durazno', description: 'Fruta de piel aterciopelada, posee una carne amarilla o blanquecina de sabor dulce y aroma delicado.', image:'durazno' },
      { id: '5', name: 'Uvas', description: 'Frutos de la vid. De pulpa blanca o púrpura, sabor dulce, la uva se consume, además de sus usos en vinos y pasas, como fruta fresca y en zumos.', image: 'uvas' },
    
    ];
  }

}
