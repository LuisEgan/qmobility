export class SendEmailDto {
  from?: string;
  to: Tos[];
  html?: string;
  text?: string;
  subject?: string;
  templateId?: string;
  dynamic_template_data?: { [key: string]: any };
  categories?: string[];
  cb?: Function;
}

export class Tos {
  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  email: string;
  name: string;
}
