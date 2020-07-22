export enum PostType {
    NORMAL = "Normal",
    EVENTO = "Evento"
}

export class Post {

    constructor(
        private id: string,
        private photo: string,
        private description: string,
        private creationDate: Date,
        private type: PostType
    ) {
        switch (this.type) {
            case "Normal":
                this.type = PostType.NORMAL;
                break
            case "Evento":
                this.type = PostType.EVENTO;
                break
            default:
                this.type = PostType.NORMAL;
        }
    }

    public getId = () => this.id
    public getPhoto = () => this.photo
    public getDescription = () => this.description
    public getCreationDate = () => this.creationDate
    public getType = () => this.type
}

export interface GetPostByTypeDTO {
    type: string,
    orderBy: string,
    orderType: string
}