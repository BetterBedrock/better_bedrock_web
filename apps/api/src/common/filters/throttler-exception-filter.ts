import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
    catch(_: ThrottlerException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(429).json({
            statusCode: 429,
            message: "You are sending too many requests. Please slow down!",
        });
    }
}
