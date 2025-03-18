import { differenceInDays, isBefore } from 'date-fns';

const DEFAULT_MAX_INTERVAL_DAYS = 90;

export function validateDateRange(
  from: Date | string | null | undefined,
  to: Date | string | null | undefined,
  maxIntervalDays = DEFAULT_MAX_INTERVAL_DAYS,
): { success: true } | { success: false; error: string } {
  if (!from || !to) {
    return { success: false, error: 'Intervalo de Datas incompleto' };
  }

  if (isBefore(to, from)) {
    return {
      success: false,
      error: 'Data de inicio do intervalo deve ser anterior a data final',
    };
  }

  if (differenceInDays(to, from) > maxIntervalDays) {
    return {
      success: false,
      error: `Limite de ${maxIntervalDays} dias ultrapassado`,
    };
  }

  return { success: true };
}
