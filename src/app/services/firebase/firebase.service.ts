import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireObject, AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { ProductModel } from 'src/app/models/product.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  products: Array<ProductModel> = [];

  constructor(private db: AngularFirestore, private fireDb: AngularFireDatabase, private storageService: StorageService) { }

  /**Get all products */
  getProducts() {

    return new Promise<any>((resolve, reject) => {
      this.db.collection(`products`).snapshotChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
    })
  }

  /**Create product */
  createProduct(product, image){
    let id = this.db.createId();
    return this.db.collection('products').doc(id).set({
      id : id,
      name: product.name.toLowerCase(),
      description: product.description,
      image: image
    }).then(res =>{
      console.log(res)
    });
  }

  /**Update product information */
  updateUser(id, data){
    return this.db.collection('products').doc(id).set(data);
  }

  /**Delete product from database */
  deleteProduct(id){
    return this.db.collection<any>('products').doc(id).delete();
  }
  
  
}
