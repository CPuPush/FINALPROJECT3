function balanceFormat(balance) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(parseInt(balance));
  }
  
  module.exports = { balanceFormat };