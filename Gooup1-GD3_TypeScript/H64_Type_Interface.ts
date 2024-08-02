// 4. So sánh Types và Interface
// Types:
// Có thể dùng để định nghĩa các loại dữ liệu phức tạp, như union, intersection, hoặc tuple.
// Không thể được mở rộng sau khi khai báo.
// Thường được sử dụng để khai báo kiểu của dữ liệu.
// Interface:
// -Chủ yếu được sử dụng để định nghĩa hình dạng của một đối tượng.
// -Có thể mở rộng thông qua từ khóa extends.
// -Cung cấp tính năng "declaration merging" cho phép mở rộng thêm các thuộc tính hoặc phương thức trong nhiều lần khai báo.
// -Ưu điểm của Interface:
// -Dễ dàng mở rộng.
// -Cung cấp sự rõ ràng hơn khi định nghĩa các hình dạng phức tạp của đối tượng.
// Ưu điểm của Type:
// -Linh hoạt hơn trong việc định nghĩa các kiểu phức tạp.
// -Thích hợp cho việc định nghĩa các union hoặc intersection types.

// Khi nào nên dùng Type và khi nào nên dùng Interface?
// -Sử dụng Interface khi bạn cần định nghĩa hình dạng của một đối tượng, đặc biệt khi cần mở rộng nó sau này
// hoặc sử dụng với các thư viện hoặc framework.
// -Sử dụng Type khi bạn cần định nghĩa các kiểu dữ liệu phức tạp, hoặc khi bạn muốn tận dụng các tính năng của type
// alias như union hoặc intersection.

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
