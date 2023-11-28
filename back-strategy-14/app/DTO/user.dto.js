// Project Data
class ProjectDTO {
  constructor(pseudo, project_name, description, createdAt) {
    this.pseudo = pseudo;
    this.project_name = project_name;
    this.description = description;
    this.createdAt =createdAt;
  }
}

// user Data
class UserDTO {
  constructor(id, pseudo, mail, surname, name, premium, projects, createdAt) {
    this.id = id;
    this.pseudo = pseudo;
    this.mail = mail;
    this.surname = surname;
    this.name = name;
    this.premium = premium;
    this.projects = projects;
    this.createdAt = createdAt;
  }
}

// Create User Data DTO
class UserCreateDTO {
  constructor(pseudo, mail, password, premium) {
    this.pseudo = pseudo;
    this.mail = mail;
    this.password = password;
    this.premium = premium;
  }
}

// Update User Data DTO
class UserUpdateDTO {
  constructor(pseudo, name, surname, mail, password, premium) {
    this.pseudo = pseudo;
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.password = password;
    this.premium = premium;
  }
}

// projects list of User
class UserProjectListDTO {
  constructor(pseudo, project_name, description, createdAt) {
    this.pseudo = pseudo;
    this.project_name = project_name;
    this.description = description;
    this.createdAt = createdAt;
  }
}

module.exports = {
  ProjectDTO: ProjectDTO,
  UserDTO: UserDTO,
  UserProjectListDTO: UserProjectListDTO,
  UserCreateDTO: UserCreateDTO,
  UserUpdateDTO: UserUpdateDTO,
};