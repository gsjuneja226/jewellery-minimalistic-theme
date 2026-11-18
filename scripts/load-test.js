import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 },  // Ramp up to 50 concurrent shoppers
    { duration: "1m", target: 100 },  // Sustained load simulating high festive traffic
    { duration: "30s", target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests under 500ms
    http_req_failed: ["rate<0.01"],   // Less than 1% errors
  },
};

const BASE_URL = __ENV.TARGET_URL || "http://localhost:3000";

export default function () {
  group("Storefront Browsing", function () {
    // 1. Visit homepage
    const homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, {
      "homepage status is 200": (r) => r.status === 200,
    });
    sleep(1);

    // 2. Browse collection
    const colRes = http.get(`${BASE_URL}/collections/rings`);
    check(colRes, {
      "collection status is 200": (r) => r.status === 200,
    });
    sleep(1);

    // 3. Search query
    const searchRes = http.get(`${BASE_URL}/search?q=choker`);
    check(searchRes, {
      "search status is 200": (r) => r.status === 200,
    });
    sleep(1);

    // 4. View product detail
    const pdpRes = http.get(`${BASE_URL}/products/kundan-jadau-choker-set`);
    check(pdpRes, {
      "product detail status is 200": (r) => r.status === 200,
    });
    sleep(2);
  });

  group("Cart & Checkout Flow", function () {
    // 5. View cart
    const cartRes = http.get(`${BASE_URL}/cart`);
    check(cartRes, {
      "cart status is 200": (r) => r.status === 200,
    });
    sleep(1);

    // 6. View checkout
    const checkoutRes = http.get(`${BASE_URL}/checkout`);
    check(checkoutRes, {
      "checkout status is 200": (r) => r.status === 200,
    });
    sleep(2);
  });
}
