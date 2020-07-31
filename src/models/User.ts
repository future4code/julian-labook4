export enum UserType {
  NORMAL = "NORMAL",
  EVENTO = "EVENTO"
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private type: UserType
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getType(): string {
    return this.type;
  }

  setId(id: string) {
    this.id = id;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setName(name: string) {
    this.name = name;
  }
 }
