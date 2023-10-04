import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', (done: DoneFn) => {
    const expectedProducts: Product[] = [
      {
        brandList: [ {value: "", fullTypeName: "http://schema.org/Text"} ],
        skuList: [ {value: "", fullTypeName: "http://schema.org/Text"} ],
        productIDList: [ {value: "", fullTypeName: "http://schema.org/Text"} ],
        weightList: [ {value: "", fullTypeName: "http://schema.org/Text"} ],
        imageList: [ {value: "", fullTypeName: "http://schema.org/Text"} ],
        fullTypeName: "http://schema.org/Product",
        jsonLdReverseMap: { "empty": true }
      },
      {
        brandList: [ { fullTypeName: "http://schema.org/Text", value: "NegVoo" } ],
        fullTypeName: "http://schema.org/Product",
        imageList: [ { fullTypeName: "http://schema.org/Text", value: "/meds/grando.png" } ],
        jsonLdReverseMap: { "empty": true },
        productIDList: [ { fullTypeName: "http://schema.org/Text", value: "12345" } ],
        skuList: [ { fullTypeName: "http://schema.org/Text", value: "53234" } ],
        weightList: [ { fullTypeName: "http://schema.org/Text", value: "0.5 FlOz" } ]
      }
    ];
    httpClientSpy.get.and.returnValue(of(expectedProducts));
    service.getProducts().subscribe({
      next: (data: Product[]) => {
        expect(data).withContext('expected products')
        .toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);

  });
});
