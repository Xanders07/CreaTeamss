export interface ProjectDTO {
    pseudo?: string;
    project_name?: string;
    users_id?: string;
    description?: string;
}

export interface UserDTO {
    pseudo?: string;
    mail?: string;
    surname?: string;
    name?: string;
    premium?: boolean;
    project?: ProjectDTO;
}