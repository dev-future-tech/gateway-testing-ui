type ObjectAttribute = {
    value: string;
    fullTypeName: string;
};

export type Product = {
    brandList: ObjectAttribute[];
    skuList: ObjectAttribute[];
    productIDList: ObjectAttribute[];
    weightList: ObjectAttribute[];
    fullTypeName: string;
    imageList: ObjectAttribute[];
    jsonLdReverseMap: { empty: boolean }
};
