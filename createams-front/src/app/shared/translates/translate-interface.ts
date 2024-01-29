export interface TranslationInterface {
  fr: {
    // Inscription Form
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
    // Update Profil Form
    profilUpdate: {
      input_form: {
        name: string;
        surname: string;
        pseudo: string;
        job: string;
        mail: string;
        confirmMail: string;
        password: string;
        confirmPassword: string;
      };
      error_message: {
        err_msg_confirm_password: string;
        err_msg_password_regex: string;
        err_msg_confirm_mail: string;
        err_msg_mail_regex: string;
      };
      buttonText: {
        updateModif: string;
      };
    };
  };
  en: {
    // Inscription Form
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
    // Update Profil Form
    profilUpdate: {
      input_form: {
        name: string;
        surname: string;
        pseudo: string;
        job: string;
        mail: string;
        confirmMail: string;
        password: string;
        confirmPassword: string;
      };
      error_message: {
        err_msg_confirm_password: string;
        err_msg_password_regex: string;
        err_msg_confirm_mail: string;
        err_msg_mail_regex: string;
      };
      buttonText: {
        updateModif: string;
      };
    };
  };

  [key: string]: any;
}
