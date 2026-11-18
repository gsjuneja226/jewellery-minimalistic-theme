export type OrderStatus =
  | "PENDING_PAYMENT"
  | "COD_VERIFICATION"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED"
  | "REFUNDED";

export const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_PAYMENT: ["CONFIRMED", "CANCELLED"],
  COD_VERIFICATION: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PACKED", "CANCELLED"],
  PACKED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["RETURN_REQUESTED"],
  RETURN_REQUESTED: ["RETURNED", "DELIVERED"], // DELIVERED if return is rejected
  RETURNED: ["REFUNDED"],
  CANCELLED: ["REFUNDED"], // If payment was already collected before cancellation
  REFUNDED: [],
};

export function canTransitionOrder(
  currentStatus: OrderStatus,
  targetStatus: OrderStatus
): boolean {
  if (currentStatus === targetStatus) return true;
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  return allowed.includes(targetStatus);
}

export function transitionOrder(
  currentStatus: OrderStatus,
  targetStatus: OrderStatus
): OrderStatus {
  if (!canTransitionOrder(currentStatus, targetStatus)) {
    throw new Error(
      `Invalid order state transition: Cannot change status from '${currentStatus}' to '${targetStatus}'`
    );
  }
  return targetStatus;
}
