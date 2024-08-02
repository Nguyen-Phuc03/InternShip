// class Person {
//   public name: string;

//   private age: number;

//   protected address: string;

//   constructor(name: string, age: number, address: string) {
//     this.name = name;
//     this.age = age;
//     this.address = address;
//   }

//   public getName(): string {
//     return this.name;
//   }
//   private getAge(): number {
//     return this.age;
//   }
//   protected getAddress(): string {
//     return this.address;
//   }
// }

// class Employee extends Person {
//   private employeeId: number;

//   constructor(name: string, age: number, address: string, employeeId: number) {
//     super(name, age, address);
//     this.employeeId = employeeId;
//   }

//   public getEmployeeInfo(): string {
//     return `${this.employeeId}`;
//   }
// }

// const person = new Person("phuc", 21, "123 Đường xyz");
// console.log(person.name);
// console.log(person.getName());

// //console.log(person.age);

// //console.log(person.address);

// const employee = new Employee("Long", 21, "456 đường mng", 101);
// console.log(employee.getEmployeeInfo());
