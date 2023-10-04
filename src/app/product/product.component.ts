import { Component, Input, OnInit, signal } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;

  constructor() {
    this.product = {
      brandList: [],
      fullTypeName: '',
      imageList: [],
      productIDList: [],
      jsonLdReverseMap: { empty: false },
      skuList: [],
      weightList: []
    }
  }

  ngOnInit() {
  }

}
