import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { of } from 'rxjs';
import { ProductComponent } from '../product/product.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ProductService;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(httpClientSpy);

    TestBed.configureTestingModule({
      declarations: [
        CatalogComponent,
        ProductComponent
      ],
      providers: [
        {
          provide: ProductService,
          useValue: service,
          multi: false
        }
      ]
    });
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    
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


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Products should load', () => {
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  })
});
