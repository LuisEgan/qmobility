import { useState } from "react";
import Axios, { AxiosResponse } from "axios";

interface IEmailParams {
  email: string;
  emailValue: string;
}

type TSendEmail = (emailParams: IEmailParams) => void;

interface IUseSendEmail {
  loading: boolean;
  error: string;
  res: AxiosResponse | undefined;
}

export const useSendEmail = (): [TSendEmail, IUseSendEmail] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);

  const sendEmail = async (
    emailParams: IEmailParams,
  ): Promise<AxiosResponse | string> => {
    const { email, emailValue } = emailParams;

    setLoading(true);

    try {
      const response = await Axios.post(
        "https://cleverit-sendmails.azurewebsites.net/api/sendEmail",
        {
          personalizations: [
            {
              to: [{ email }],
              subject: "AYEE",
            },
          ],

          from: {
            email: "no-reply@cleveritgroup.com",
          },

          content: [
            {
              type: "text/plain",
              value: emailValue,
            },
          ],
        },
      );

      setRes(response);

      return response;
    } catch (e) {
      setError(e);
      return e;
    } finally {
      setLoading(false);
    }
  };

  return [sendEmail, { res, loading, error }];
};
