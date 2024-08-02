interface User {
  readonly id: number;
  name: String;
  age: number;
  address?: String; // Optional property
  readonly email: String; // Readonly property
  Phone: String;
}
interface teacher extends User {
  country: String;
}
interface Students extends User, teacher {
  mssv: String;
}
