class Animal {
  makeSound(): void {
    console.log("hu hu hu");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("go go go");
  }
}

const myDog = new Dog();
myDog.makeSound();

//Overloading
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    throw new Error("Invalid arguments");
  }
}

const calculator = new Calculator();
console.log(calculator.add(2, 3));
console.log(calculator.add("Hello, ", "world!"));
