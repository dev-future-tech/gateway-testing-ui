import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products = signal<Product[]>([]);


  constructor(private service: ProductService) {}

  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products.set(products);
      }
    });
  }

}
