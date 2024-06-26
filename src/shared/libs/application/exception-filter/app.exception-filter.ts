import {inject, injectable} from 'inversify';
import {ExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {HttpError} from '../errors/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ApplicationError} from '../types/application-error.enum';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error | HttpError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
