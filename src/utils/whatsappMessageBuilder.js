/**
 * Builds a professional WhatsApp booking confirmation message
 * @param {Object} order - Complete order object with customer, workshop, and murtiItems
 * @returns {string} Formatted WhatsApp message
 */
const buildOrderConfirmationMessage = (order) => {
  const customer = order.customer || {};
  const workshop = order.workshop || {};
  const murtiItems = order.murtiItems || [];

  // Calculate balance amount
  const totalPrice = parseFloat(order.totalPrice) || 0;
  const advancePaid = parseFloat(order.advancePaid) || 0;
  const balanceAmount = totalPrice - advancePaid;

  // Format murti items
  const murtiDetailsText = murtiItems
    .map((item) => {
      let details = `${item.murtiName || ""}`;
      if (item.heightInches) {
        details += ` - ${item.heightInches} Inches`;
      }
      if (item.murtiType) {
        details += ` (${item.murtiType})`;
      }
      return details;
    })
    .join("\n");

  const message = `🙏 Ganpati Booking Confirmed at ${workshop.name || ""}🙏

Dear ${customer.name || "Valued Customer"},

Your booking has been successfully registered with us.

Booking Details:
Bill No: ${order.billNo}

Murti Details:
${murtiDetailsText}

Payment Summary:
Total Amount: ₹${totalPrice.toFixed(2)}
Advance Paid: ₹${advancePaid.toFixed(2)}
Balance Amount: ₹${balanceAmount.toFixed(2)}

For any queries, contact us:
${workshop.name || ""}
${workshop.phone ? `Phone: ${workshop.phone}` : ""}

Thank you for choosing us! 🙏`;

  return message;
};

module.exports = {
  buildOrderConfirmationMessage,
};
