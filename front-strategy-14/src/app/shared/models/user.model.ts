  export class ProjectDto {
    pseudo?: string;
    project_name?: string;
    users_id?: string;
    description?: string;
}

export class UserDto {
    pseudo?: string;
    mail?: string;
    password?: string;
    surname?: string;
    name?: string;
    premium?: boolean;
    project: ProjectDto = new ProjectDto;
}
