export interface TranslationInterface {
  fr: {
    inscription: {
      input_form: {
        pseudo: string;
        mail: string;
        password: string;
        confirmPassword: string;
      };
      error_message: {
        err_msg_confirm_password: string;
        err_msg_password_regex: string;
        err_msg_mail_regex: string;
      };
    };
  };
  en: {
    inscription: {
      input_form: {
        pseudo: string;
        mail: string;
        password: string;
        confirmPassword: string;
      };
      error_message: {
        err_msg_confirm_password: string;
        err_msg_password_regex: string;
        err_msg_mail_regex: string;
      };
    };
  };

  [key: string]: any; // Ajout de la signature d'indexation
}
