export class ProjectDTO {
  id?: number;
  project_name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  // Autres propriétés si nécessaire
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
  projects?: ProjectDTO[];
}

export class UpdateUserDTO {
  name?: string;
  surname?: string;
  pseudo?: string;
  mail?: string;
  job?: string;
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
