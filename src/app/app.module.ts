import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatDividerModule } from '@angular/material/divider'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { FirebaseService } from './services/firebase/firebase.service';
import { ValidateService } from './services/validate/validate.service';
import { StorageService } from './services/storage/storage.service';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component'


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    EditProductComponent,
    ProductCardComponent,
    CreateProductComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    //Material Moduls
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDividerModule
    
  ],
  exports: [
    ProductCardComponent,
  ],
  providers: [
    FirebaseService,
    ValidateService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
