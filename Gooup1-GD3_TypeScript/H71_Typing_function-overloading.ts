function mul(a: number, b: number): number {
  return a * b;
}

let result = mul(5, 3);

//Typing Function
type SubFunction = (a: number, b: number) => number;

const sub: SubFunction = (x, y) => {
  return x - y;
};

console.log(sub(100, 20));

//Function Overloading

function add(a: string, b: string): string;

function add(a: number, b: number): number;

function add(a: any, b: any): any {
  return a + b;
}

add("Hello ", "phuc");
add(10, 20);
