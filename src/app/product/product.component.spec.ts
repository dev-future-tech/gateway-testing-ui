import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    const product = {
      brandList: [ { fullTypeName: "http://schema.org/Text", value: "NegVoo" } ],
      fullTypeName: "http://schema.org/Product",
      imageList: [ { fullTypeName: "http://schema.org/Text", value: "/meds/grando.png" } ],
      jsonLdReverseMap: { "empty": true },
      productIDList: [ { fullTypeName: "http://schema.org/Text", value: "12345" } ],
      skuList: [ { fullTypeName: "http://schema.org/Text", value: "53234" } ],
      weightList: [ { fullTypeName: "http://schema.org/Text", value: "0.5 FlOz" } ]
    };

    TestBed.configureTestingModule({
      declarations: [ProductComponent]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
