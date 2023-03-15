/**
 * Errors can exist in an errors object, or nested in a data field.
 */
export function assertApiErrors(data: Record<string, any> | null | undefined) {
  const errorMessage = data?.customerUserErrors?.[0]?.message
  if (errorMessage) {
    throw new Error(errorMessage)
  }
}

export function statusMessage(status: string) {
  const translations: Record<string, string> = {
    attemptedDelivery: 'Attempted delivery',
    canceled: 'Canceled',
    confirmed: 'Confirmed',
    delivered: 'Delivered',
    failure: 'Failure',
    fulfilled: 'Fulfilled',
    inProgress: 'In Progress',
    inTransit: 'In transit',
    labelPrinted: 'Label printed',
    labelPurchased: 'Label purchased',
    labelVoided: 'Label voided',
    markedAsFulfilled: 'Marked as fulfilled',
    notDelivered: 'Not delivered',
    onHold: 'On Hold',
    open: 'Open',
    outForDelivery: 'Out for delivery',
    partiallyFulfilled: 'Partially Fulfilled',
    pendingFulfillment: 'Pending',
    pickedUp: 'Displayed as Picked up',
    readyForPickup: 'Ready for pickup',
    restocked: 'Restocked',
    scheduled: 'Scheduled',
    submitted: 'Submitted',
    unfulfilled: 'Unfulfilled',
  }
  try {
    return translations?.[status]
  } catch (error) {
    return status
  }
}
