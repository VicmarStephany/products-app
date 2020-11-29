import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel> = [];
  test: Array<ProductModel> = [];

  constructor(private db: FirebaseService, public modal: MatDialog) { }

  ngOnInit(): void {
    
    this.db.getProducts().then(colSnap => {
      colSnap.forEach(snap => {
        let product: any = snap.payload.doc.data();
        console.log(product);
        this.products.push(product);
      })
    })
  }

  openModal() {
    const modal = this.modal.open(CreateProductComponent);

    modal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    
    
/*
this.products = [
  { id: '1', name: 'Banana', description: 'Fruta amarilla', image: 'bananas' },
  { id: '4', name: 'Manzana', description: 'Fruta de forma redonda y sabor más o menos dulce, dependiendo de la variedad. ', image: 'manzana' },
  { id: '2', name: 'Coco', description: 'Fruta tropical obtenida del cocotero. Tiene una cáscara gruesa y un centro comestible blando', image: 'cocos' },
  { id: '3', name: 'Durazno', description: 'Fruta de piel aterciopelada, posee una carne amarilla o blanquecina de sabor dulce y aroma delicado.', image:'durazno' },
  { id: '5', name: 'Uvas', description: 'Frutos de la vid. De pulpa blanca o púrpura, sabor dulce, la uva se consume, además de sus usos en vinos y pasas, como fruta fresca y en zumos.', image: 'uvas' },

];*/
  

}
