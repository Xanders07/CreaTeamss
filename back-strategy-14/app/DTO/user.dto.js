// Project Data
class ProjectDTO {
  constructor(pseudo, project_name, description) {
    this.pseudo = pseudo;
    this.project_name = project_name;
    this.description = description;
  }
}

// user Data
class UserDto {
  constructor(pseudo, mail, surname, name, premium, projects) {
    this.pseudo = pseudo;
    this.mail = mail;
    this.surname = surname;
    this.name = name;
    this.premium = premium;
    this.projects = projects;
  }
}
// projects list of User
class UserProjectListDTO {
  constructor(pseudo, project_name, description) {
    this.pseudo = pseudo;
    this.project_name = project_name;
    this.description = description;
  }
}

module.exports = {
  ProjectDTO: ProjectDTO,
  UserDto: UserDto,
  UserProjectListDTO: UserProjectListDTO
};