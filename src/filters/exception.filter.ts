import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60, // 1 minute
});

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Send the exception to Sentry
    const eventId = Sentry.captureException(exception);
    Sentry.captureMessage('Error captured', {
      level: 'debug',
      extra: {
        eventId,
      },
    });

    // Check if the rate limit has been exceeded
    rateLimiter
      .consume(request.ip, 1)
      .then()
      .catch(() => {
        // Send the exception to Slack if the rate limit is exceeded
        const slackMessage = {
          text: `Error: ${exception.message}`,
          attachments: [
            {
              fallback: `Error: ${exception.message}`, // Fallback text for notification
              color: 'danger', // Color of the attachment
              title: 'Stack Trace',
              text: `\`\`\`${exception.stack}\`\`\``,
            },
          ],
        };
        // slack.send(slackMessage);
      });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
