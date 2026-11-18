import { describe, it, expect } from "vitest";
import {
  canTransitionOrder,
  transitionOrder,
  type OrderStatus,
} from "@/lib/commerce/stateMachine";

describe("Order State Machine", () => {
  it("allows standard lifecycle progression", () => {
    expect(canTransitionOrder("PENDING_PAYMENT", "CONFIRMED")).toBe(true);
    expect(transitionOrder("PENDING_PAYMENT", "CONFIRMED")).toBe("CONFIRMED");

    expect(canTransitionOrder("CONFIRMED", "PACKED")).toBe(true);
    expect(transitionOrder("CONFIRMED", "PACKED")).toBe("PACKED");

    expect(canTransitionOrder("PACKED", "SHIPPED")).toBe(true);
    expect(transitionOrder("PACKED", "SHIPPED")).toBe("SHIPPED");

    expect(canTransitionOrder("SHIPPED", "OUT_FOR_DELIVERY")).toBe(true);
    expect(transitionOrder("SHIPPED", "OUT_FOR_DELIVERY")).toBe("OUT_FOR_DELIVERY");

    expect(canTransitionOrder("OUT_FOR_DELIVERY", "DELIVERED")).toBe(true);
    expect(transitionOrder("OUT_FOR_DELIVERY", "DELIVERED")).toBe("DELIVERED");

    expect(canTransitionOrder("DELIVERED", "RETURN_REQUESTED")).toBe(true);
    expect(transitionOrder("DELIVERED", "RETURN_REQUESTED")).toBe("RETURN_REQUESTED");

    expect(canTransitionOrder("RETURN_REQUESTED", "RETURNED")).toBe(true);
    expect(transitionOrder("RETURN_REQUESTED", "RETURNED")).toBe("RETURNED");

    expect(canTransitionOrder("RETURNED", "REFUNDED")).toBe(true);
    expect(transitionOrder("RETURNED", "REFUNDED")).toBe("REFUNDED");
  });

  it("blocks illegal transitions", () => {
    // Cannot skip from pending payment to delivered directly
    expect(canTransitionOrder("PENDING_PAYMENT", "DELIVERED")).toBe(false);
    expect(() => transitionOrder("PENDING_PAYMENT", "DELIVERED")).toThrow();

    // Cannot transition from refunded to confirmed
    expect(canTransitionOrder("REFUNDED", "CONFIRMED")).toBe(false);
    expect(() => transitionOrder("REFUNDED", "CONFIRMED")).toThrow();

    // Cannot transition from delivered directly to refunded without return
    expect(canTransitionOrder("DELIVERED", "REFUNDED")).toBe(false);
    expect(() => transitionOrder("DELIVERED", "REFUNDED")).toThrow();
  });
});
