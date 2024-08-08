// Tính đóng gói (Encapsulation)

// class Car {
//   private make: string;
//   private model: string;
//   private year: number;

//   constructor(make: string, model: string, year: number) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }

//   public getMake(): string {
//     return this.make;
//   }

//   public setMake(make: string): void {
//     this.make = make;
//   }

//   public getModel(): string {
//     return this.model;
//   }

//   public setModel(model: string): void {
//     this.model = model;
//   }

//   public getYear(): number {
//     return this.year;
//   }

//   public setYear(year: number): void {
//     this.year = year;
//   }
// }

// Tính kế thừa (Inheritance)
// class Vehicle {
//   protected make: string;
//   protected model: string;

//   constructor(make: string, model: string) {
//     this.make = make;
//     this.model = model;
//   }

//   public displayInfo(): void {
//     console.log(`Make: ${this.make}, Model: ${this.model}`);
//   }
// }

// class Car extends Vehicle {
//   private year: number;

//   constructor(make: string, model: string, year: number) {
//     super(make, model);
//     this.year = year;
//   }

//   public displayCarInfo(): void {
//     console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
//   }
// }

// Tính đa hình (Polymorphism)
// class User {
//   protected name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   public displayInfo(): void {
//     console.log(`Name: ${this.name}`);
//   }
// }

// class Admin extends User {
//   private role: string;

//   constructor(name: string, role: string) {
//     super(name);
//     this.role = role;
//   }

//   public displayInfo(): void {
//     console.log(`Name: ${this.name}, Role: ${this.role}`);
//   }
// }

// const users: User[] = [
//   new User("John Doe"),
//   new Admin("Jane Doe", "Administrator"),
// ];

// users.forEach((user) => user.displayInfo());

// Tính trừu tượng (Abstraction)

// abstract class Vehicle {
//   protected make: string;
//   protected model: string;

//   constructor(make: string, model: string) {
//     this.make = make;
//     this.model = model;
//   }

//   abstract displayInfo(): void;
// }

// class Car extends Vehicle {
//   private year: number;

//   constructor(make: string, model: string, year: number) {
//     super(make, model);
//     this.year = year;
//   }

//   public displayInfo(): void {
//     console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
//   }
// }
