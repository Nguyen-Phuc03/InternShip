// so sánh null vs undefined là:
// Giống nhau:
// Cả hai khi bị phủ nhận đều tra về true, nhưng không có cái nào bằng true hoặc false.
// Chúng đều đại diện cho một cái gì đó không tồn tại…
// Khác nhau:
// null đại diện cho “nothing”, hoàn toàn không tồn tại, không xác định được thứ không được xác định.
// undefined thì có dạng data của riêng nó (undefined), null thì chỉ là một object
// null đưa về 0 khi vận hành bằng toán, undefined trả về NaN

let isActive: boolean = true;

// 2. Number
// Kiểu dữ liệu number trong TypeScript bao gồm cả số nguyên và số thập phân.
let age: number = 25;
let price: number = 19.99;

let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];

// 5. Tuple
// Tuple là một mảng với số lượng phần tử cố định và các phần tử có thể có kiểu dữ liệu khác nhau.
//let person: [string, number] = ["Alice", 30];
// 6. Enum
// Enum cho phép định nghĩa một tập hợp các hằng số có tên.
enum Color {
  Red,
  Green,
  Blue,
}

let color: Color = Color.Green;
// 7. Unknown
// Kiểu unknown là một loại dữ liệu chung chung hơn so với any, giúp kiểm tra kiểu an toàn hơn trước khi gán giá trị.
let value: unknown;
value = "hello"; // OK
value = 123; // OK

let str: string;
