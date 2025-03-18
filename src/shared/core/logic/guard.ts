import UniqueEntityID from '../domain/UniqueEntityID';

import { areEqualDates } from '@/shared/utils/dateHelpers';

export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument<T = unknown> {
  argument: T;
  argumentName: string;
}

export type GuardArgumentCollection<T = unknown> = IGuardArgument<T>[];

export interface DatetimeIntervalDates {
  initialDate: Date;
  endDate: Date;
  initialHour?: Date | null;
  endHour?: Date | null;
}

export default class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }
    return { succeeded: true };
  }

  public static greaterThan(minValue: number, actualValue: number, argumentName: string): IGuardResult {
    return actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `${argumentName} must be greater than ${minValue}`,
        };
  }

  public static greaterThanBulk(minValue: number, args: GuardArgumentCollection<number>): IGuardResult {
    for (const arg of args) {
      const result = this.greaterThan(minValue, arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }
    return { succeeded: true };
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text must have at least ${numChars} characters`,
        };
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text must not exceed ${numChars} characters`,
        };
  }

  public static againstNullOrUndefined(argument: unknown, argumentName: string): IGuardResult {
    if (
      argument instanceof UniqueEntityID &&
      (argument.toValue() === null || argument.toValue() === undefined)
    ) {
      return { succeeded: false, message: `${argumentName} is required` };
    }

    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is required` };
    }
    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }
    return { succeeded: true };
  }

  public static isOneOf<T>(value: T, validValues: T[], argumentName: string): IGuardResult {
    const isValid = validValues.includes(value);
    return isValid
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `${argumentName} (${value}) is not one of the allowed values (${validValues.join(', ')})`,
        };
  }

  public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
    return num >= min && num <= max
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `${argumentName} must be between ${min} and ${max}`,
        };
  }

  public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) return numIsInRangeResult;
    }
    return { succeeded: true };
  }

  public static isValidDatetimeInterval(dates: DatetimeIntervalDates): IGuardResult {
    if (dates.initialDate > dates.endDate) {
      return { succeeded: false, message: 'Initial date cannot be greater than end date' };
    }

    if (areEqualDates(dates.initialDate, dates.endDate)) {
      if (dates.initialHour && dates.endHour && dates.initialHour > dates.endHour) {
        return {
          succeeded: false,
          message: 'Initial date/time cannot be greater than end date/time',
        };
      }
    }
    return { succeeded: true };
  }
}
