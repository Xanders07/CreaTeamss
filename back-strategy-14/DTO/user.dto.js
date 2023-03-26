export class ProjectDTO {
    pseudo?: string;
    project_name?: string;
    users_id?: string;
    description?: string;
}

export class UserDto {
    id?: number;
    pseudo?: string;
    mail?: string;
    password?: string;
    surname?: string;
    name?: string;
    premium?: boolean;
    project: ProjectDTO = new ProjectDTO;
}