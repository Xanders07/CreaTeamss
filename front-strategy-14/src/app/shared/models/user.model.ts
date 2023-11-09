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
    project?: ProjectDTO = new ProjectDTO;
}

export class UserInscriptionDataDTO  {
    pseudo?: string;
    mail?: string;
    password?: string;
}

export class ConnexionDTO {
  pseudoOrEmail?: string;
  password?: string;
}
