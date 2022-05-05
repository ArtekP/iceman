import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
  exports: [MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]
})

export class MaterialModule { }
