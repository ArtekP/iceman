import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSidenavModule
} from '@angular/material/sidenav';
import {
  MatToolbarModule
} from '@angular/material/toolbar';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatListModule
} from '@angular/material/list';
import {
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  MatSelectModule
} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  imports: [CommonModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
  exports: [MatFormFieldModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]
})

export class MaterialModule {}