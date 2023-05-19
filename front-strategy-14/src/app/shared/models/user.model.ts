  export class ProjectDTO {
    project_name?: string;
    users_id?: string;
    description?: string;
}

export class UserDataDTO  {
    pseudo?: string;
    mail?: string;
    password?: string;
    surname?: string;
    name?: string;
    premium?: boolean;
    project: ProjectDTO = new ProjectDTO;
}

export class ConnexionDTO {
  pseudoOrEmail?: string;
  password?: string;
}
