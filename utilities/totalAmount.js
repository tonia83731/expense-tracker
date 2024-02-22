export const totalAmount = (records) => {
  let totalAmount = 0;
   records.map((record) => {
     totalAmount += record.amount;
   });
   return totalAmount
}