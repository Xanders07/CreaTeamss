import { ProjectDTO } from "./projects.model";

export class UserDTO {
  id?: number;
  name?: string;
  surname?: string;
  pseudo?: string;
  mail?: string;
  job?: string;
}

export class UserDataProfilDTO extends UserDTO {
  image?: string;
  mentor?: string;
  projects?: ProjectDTO[];
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
