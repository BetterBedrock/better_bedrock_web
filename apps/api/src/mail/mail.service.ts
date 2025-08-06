import { Injectable } from "@nestjs/common";
import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";

@Injectable()
export class MailService {
    async createVoucherEmail(email: string, voucher: string) {
        const secret = process.env.MAILERSEND_SECRET;
        const senderEmail = process.env.MAILERSEND_SENDER_EMAIL;
        const template = process.env.MAILERSEND_TEMPLATE_ID;

        if (!secret || !senderEmail || !template) {
            return;
        }

        const mailerSend = new MailerSend({
            apiKey: secret ?? "",
        });

        const sentFrom = new Sender(senderEmail ?? "", "Better Bedrock Team");

        const recipient = [new Recipient(email, email)];
        const personalization = [
            {
                email: email,
                data: {
                    voucher_code: voucher,
                },
            },
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient)
            .setReplyTo(sentFrom)
            .setSubject("Voucher Code")
            .setTemplateId(template ?? "")
            .setPersonalization(personalization);

        await mailerSend.email.send(emailParams);
    }
}
