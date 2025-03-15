import { MailerSend } from "mailersend";

const { mailerSendKey } = useRuntimeConfig();

export const mailersend = new MailerSend({
	apiKey: mailerSendKey,
});
