export const contructErrorMessage = (err: unknown, defaultMsg?: string) => {
  return err instanceof Error ? err.message : (defaultMsg ?? 'An unexpected error occurred ')
}
