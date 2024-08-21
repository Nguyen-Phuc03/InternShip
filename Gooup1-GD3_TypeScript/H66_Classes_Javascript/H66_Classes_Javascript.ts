class Warehouse {
  private name: string;
  private storage: number;
  private address: string;
  public owner: string;

  constructor(name: string, storage: number, address: string, owner: string) {
    this.name = name;
    this.storage = storage;
    this.address = address;
    this.owner = owner;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getStorage(): number {
    return this.storage;
  }

  public setStorage(storage: number): void {
    this.storage = storage;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }
}

// Khởi tạo đối tượng thuộc lớp Warehouse
let warehouse = new Warehouse(
  "Main Warehouse",
  500,
  "123 Warehouse St",
  "John Doe"
);

// Truy xuất các thuộc tính
console.log(warehouse.getName());
console.log(warehouse.getStorage());
console.log(warehouse.getAddress());

// Thay đổi các thuộc tính
warehouse.setName("New Warehouse");
warehouse.setStorage(600);
warehouse.setAddress("456 New St");

// Truy xuất lại các thuộc tính sau khi thay đổi
console.log(warehouse.getName());
console.log(warehouse.getStorage());
console.log(warehouse.getAddress());
