export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });
};
