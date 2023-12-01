  export class ProjectDTO {
    project_name?: string;
    users_id?: string;
    description?: string;
}

export class UserDataDTO {
    id?: number;
    pseudo?: string;
    mail?: string;
    surname?: string;
    name?: string;
    job?: string;
    image?: string;
    mentor?: string;
}

export class ProjectsDTO {
  projects: ProjectDTO[] = [];
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
