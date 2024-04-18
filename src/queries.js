import { HttpError } from 'wasp/server'

export const getUser = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const user = await context.entities.User.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      wallet: true,
      notifications: true
    }
  });
  if (!user) { throw new HttpError(404, 'User with id ' + userId + ' not found') }
  return user;
}

export const getTransactions = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Transaction.findMany({
    where: { userId }
  })
}

export const getWallet = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Wallet.findUnique({
    where: { userId }
  });
}

export const getReport = async ({ reportId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const report = await context.entities.Report.findUnique({
    where: { id: reportId },
    include: { transactionData: true }
  });

  if (!report) throw new HttpError(404, 'No report with id ' + reportId);

  return report;
}