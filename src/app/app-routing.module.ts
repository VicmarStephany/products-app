import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductsComponent } from './pages/products/products.component';


const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent},
  { path: 'edit-product/:id', component: EditProductComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
