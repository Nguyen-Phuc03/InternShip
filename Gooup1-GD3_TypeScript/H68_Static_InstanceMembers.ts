//Instance Members
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const person1 = new Person("Phuc", 21);
const person2 = new Person("Long", 22);
console.log(person1.name, person1.age);
console.log(person2.name, person2.age);

//Static Members
class subject {
  static chieudai: number = 10;

  static chuvi(chieurong: number): number {
    return subject.chieudai * chieurong;
  }
}

console.log(subject.chieudai);
console.log(subject.chuvi(10));
