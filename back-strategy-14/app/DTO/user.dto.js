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
class UserDto {
  constructor(pseudo, mail, surname, name, premium, projects, createdAt) {
    this.pseudo = pseudo;
    this.mail = mail;
    this.surname = surname;
    this.name = name;
    this.premium = premium;
    this.projects = projects;
    this.createdAt = createdAt;
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
  UserDto: UserDto,
  UserProjectListDTO: UserProjectListDTO
};