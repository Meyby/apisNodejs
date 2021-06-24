type Products = {
  id: number;
  name: string,
  year: number,
  color: string,
  pantoneValue: string
}

const products: Products[] = [
  {
    "id": 1,
    "name": "cerulean",
    "year": 2000,
    "color": "#98B2D1",
    "pantoneValue": "15-4020"
  },
  {
    "id": 2,
    "name": "fuchsia rose",
    "year": 2001,
    "color": "#C74375",
    "pantoneValue": "17-2031"
  },
  {
    "id": 3,
    "name": "true red",
    "year": 2002,
    "color": "#BF1932",
    "pantoneValue": "19-1664"
  },
  {
    "id": 4,
    "name": "aqua sky",
    "year": 2003,
    "color": "#7BC4C4",
    "pantoneValue": "14-4811"
  },
  {
    "id": 5,
    "name": "tigerlily",
    "year": 2004,
    "color": "#E2583E",
    "pantoneValue": "17-1456"
  },
  {
    "id": 6,
    "name": "blue turquoise",
    "year": 2005,
    "color": "#53B0AE",
    "pantoneValue": "15-5217"
  },
  {
    "id": 7,
    "name": "Blanca",
    "year": 2006,
    "color": "#53B0AE",
    "pantoneValue": "15-5217"
  }
];

export { products, Products }