  export class ProjectDTO {
    project_name?: string;
    users_id?: string;
    description?: string;
}

export class UserDataDTO {
    pseudo?: string;
    mail?: string;
    surname?: string;
    name?: string;
}

export class ProjectsDTO {
  project?: ProjectDTO = new ProjectDTO;

}

export class UserInscriptionDataDTO  {
    pseudo?: string;
    mail?: string;
    password?: string;
}

export class ConnexionDTO {
  mail?: string;
  password?: string;
}
