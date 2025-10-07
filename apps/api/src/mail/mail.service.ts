import { Injectable } from "@nestjs/common";
import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";
import { baseFrontendUrl } from "~/utils/url";

@Injectable()
export class MailService {
    async sendVoucherEmail(email: string, voucher: string) {
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

    async sendProjectDeclinedEmail(
        email: string,
        error: string,
        projectId: string,
        projectName: string,
    ) {
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

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient)
            .setReplyTo(sentFrom)
            .setSubject(`Update on ${projectName}`)
            .setText(
                `Dear Publisher,

Thank you for submitting your project, "${projectName}", for our review. 
After careful consideration, we are unable to move forward with it at this time. 

Reason: ${error}

We truly appreciate the time and effort you put into your submission and encourage you to consider revising and resubmitting in the future.

You can make revision for this project in your drafts: ${baseFrontendUrl}/project/edit/${projectId}

Best regards,
Better Bedrock Team`,
            );

        await mailerSend.email.send(emailParams);
    }

    async sendProjectApprovedEmail(email: string, projectId: string, projectName: string) {
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

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient)
            .setReplyTo(sentFrom)
            .setSubject(`Project Approved: ${projectName}`)
            .setText(
                `Dear Publisher,

We are pleased to inform you that your project, "${projectName}", has been approved after careful review. 

You can view published version of your project right here: ${baseFrontendUrl}/project/preview/${projectId}

Congratulations on this achievement! We wish you luck with your project, and hope you get loads of downloads!

If you haven't done it yet, you can start receiving 100% of the ad revenue. For more information visit ${baseFrontendUrl}/linkvertise

Best regards,
Better Bedrock Team`,
            );

        await mailerSend.email.send(emailParams);
    }
}
