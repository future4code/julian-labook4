export class Post {
  constructor(
    private id: string,
    private photo: string,
    private description: string,
    private creation_date: string,
    private type: string,
    private creator_user_id: string
    
  ){}

  getId(): string {
    return this.id;
  }

  getPhoto(): string {
    return this.photo;
  }

  getDescription(): string {
    return this.description;
  }

  getCreationDate(): string {
    return this.creation_date;
  }

  getType(): string {
    return this.type;
  }

  getCreatorUserId(): string {
    return this.creator_user_id;
  }
}