export const INPUT_STYLE_CLASSES =
  'appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline'

export const getInputStyleClasses = (isError?: string | null) => {
  return `${INPUT_STYLE_CLASSES} ${isError ? 'border-red-500' : 'border-primary/20'}`
}

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
