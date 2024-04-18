import { HttpError } from 'wasp/server'

export const registerUser = async ({ username, password, email, role, status, profileInfo }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.User.create({
    data: {
      username,
      password,
      email,
      role,
      status,
      profile: {
        create: {
          info: profileInfo
        }
      }
    }
  });
}

export const updateUser = async ({ userId, fields }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const updatedUser = await context.entities.User.update({
    where: { id: userId },
    data: fields
  });

  return updatedUser;
}

export const createTransaction = async ({ userId, type, amount, status }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Transaction.create({
    data: {
      userId,
      type,
      amount,
      status
    }
  });
}

export const updateWallet = async ({ walletId, newBalance }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const wallet = await context.entities.Wallet.findUnique({
    where: { id: walletId }
  });
  if (wallet.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Wallet.update({
    where: { id: walletId },
    data: { balance: newBalance }
  });
}

export const generateReport = async ({ userId, transactionData, dateRange }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Report.create({
    data: {
      userId,
      transactionData,
      dateRange
    }
  });
}