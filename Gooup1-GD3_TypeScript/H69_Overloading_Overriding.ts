// các điểm chính về Overloading và overriding:
// -Overloading là dạng Compiletime polymorphism còn Overriding là Runtime polymorphism
// -Overloading cần khác đối số còn Overriding khi muốn khác cách thực thi bên trong phương thức
// -Overloading thực hiện trong cùng 1 class còn Overriding thực hiện thông qua class kế thừa
// -Nếu chúng ta sai Overloading sẽ dễ nhận thấy vì chúng được quyết định vào
// thời điểm compile - các IDE sẽ báo lỗi nhưng nếu chúng ta sai Overriding vì quyết định vào thời
// điểm runtime - khi chương trình chạy nên sẽ gây ra nhiều vấn đề không dễ giải quyết
// Overloading:
// Xảy ra trong cùng một lớp
// Liên quan đến cùng tên phương thức với các chữ ký khác nhau (số lượng và kiểu tham số khác nhau).

// overriding:
// Xảy ra giữa lớp cha và lớp con.
// Liên quan đến việc cung cấp một triển khai cụ thể cho một phương thức trong lớp con mà đã được định nghĩa trong lớp cha.
// Overriding

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
