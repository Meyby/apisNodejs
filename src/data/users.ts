type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

const users: User[] = [
  {
    id: 1,
    email: 'george.bluth@reqres.in',
    firstName: 'George',
    lastName: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    id: 2,
    email: 'janet.weaver@reqres.in',
    firstName: 'Janet',
    lastName: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    id: 3,
    email: 'emma.wong@reqres.in',
    firstName: 'Emma',
    lastName: 'Wong',
    avatar: 'https://reqres.in/img/faces/3-image.jpg',
  },
  {
    id: 4,
    email: 'eve.holt@reqres.in',
    firstName: 'Eve',
    lastName: 'Holt',
    avatar: 'https://reqres.in/img/faces/4-image.jpg',
  },
  {
    id: 5,
    email: 'charles.morris@reqres.in',
    firstName: 'Charles',
    lastName: 'Morris',
    avatar: 'https://reqres.in/img/faces/5-image.jpg',
  },
  {
    id: 6,
    email: 'tracey.ramos@reqres.in',
    firstName: 'Tracey',
    lastName: 'Ramos',
    avatar: 'https://reqres.in/img/faces/6-image.jpg',
  },
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    firstName: 'Michael',
    lastName: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  },
  {
    id: 8,
    email: 'lindsay.ferguson@reqres.in',
    firstName: 'Lindsay',
    lastName: 'Ferguson',
    avatar: 'https://reqres.in/img/faces/8-image.jpg',
  },
  {
    id: 9,
    email: 'tobias.funke@reqres.in',
    firstName: 'Tobias',
    lastName: 'Funke',
    avatar: 'https://reqres.in/img/faces/9-image.jpg',
  },
  {
    id: 10,
    email: 'byron.fields@reqres.in',
    firstName: 'Byron',
    lastName: 'Fields',
    avatar: 'https://reqres.in/img/faces/10-image.jpg',
  },
  {
    id: 11,
    email: 'george.edwards@reqres.in',
    firstName: 'George',
    lastName: 'Edwards',
    avatar: 'https://reqres.in/img/faces/11-image.jpg',
  },
  {
    id: 12,
    email: 'rachel.howell@reqres.in',
    firstName: 'Rachel',
    lastName: 'Howell',
    avatar: 'https://reqres.in/img/faces/12-image.jpg',
  },
];

export {
  User,
  users
};
