export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(args: any) {
    this.id = args.id || 0;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.email = args.email;
  }
}
