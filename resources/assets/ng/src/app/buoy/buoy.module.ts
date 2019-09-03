import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApolloModule,
    HttpClientModule
  ],
  exports: [
    ApolloModule
  ]
})
export class BuoyModule { }
