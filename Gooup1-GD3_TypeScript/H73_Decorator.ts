//class decorator

// function classDecorator(constructor: Function) {
//   console.log("Class Decorator Called");
//   constructor.prototype.classDecorated = true;
// }

// @classDecorator
// class ExampleClass {
//   constructor() {
//     console.log("Instance Created");
//   }
// }

// const instance = new ExampleClass();
// console.log(instance.classDecorated); // true

//method decorator

// function methodDecorator(
//   target: Object,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   const originalMethod = descriptor.value;
//   descriptor.value = function (...args: any[]) {
//     console.log("Method Decorator Called");
//     return originalMethod.apply(this, args);
//   };
// }

// class ExampleClass {
//   @methodDecorator
//   exampleMethod() {
//     console.log("Original Method Called");
//   }
// }

// const instance = new ExampleClass();
// instance.exampleMethod();

//Property Decorator

// function propertyDecorator(target: Object, propertyKey: string) {
//   console.log("Property Decorator Called");
// }

// class ExampleClass {
//   @propertyDecorator
//   exampleProperty: string;

//   constructor() {
//     this.exampleProperty = "Hello";
//   }
// }

// const instance = new ExampleClass();

//Parameter Decorator

// function parameterDecorator(
//   target: Object,
//   propertyKey: string,
//   parameterIndex: number
// ) {
//   console.log(
//     `Parameter Decorator Called for parameter at index ${parameterIndex}`
//   );
// }

// class ExampleClass {
//   exampleMethod(
//     @parameterDecorator param1: string,
//     @parameterDecorator param2: number
//   ) {
//     console.log(`Param1: ${param1}, Param2: ${param2}`);
//   }
// }

// const instance = new ExampleClass();
// instance.exampleMethod("Hello", 123);
