export type Role =
  | "super_admin"
  | "manager"
  | "inventory"
  | "support"
  | "marketing"
  | "customer";

export type Permission =
  | "products:read"
  | "products:write"
  | "inventory:read"
  | "inventory:write"
  | "orders:read"
  | "orders:write"
  | "orders:refund"
  | "customers:read"
  | "marketing:read"
  | "marketing:write"
  | "settings:read"
  | "settings:write"
  | "audit:read";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    "products:read",
    "products:write",
    "inventory:read",
    "inventory:write",
    "orders:read",
    "orders:write",
    "orders:refund",
    "customers:read",
    "marketing:read",
    "marketing:write",
    "settings:read",
    "settings:write",
    "audit:read",
  ],
  manager: [
    "products:read",
    "products:write",
    "inventory:read",
    "inventory:write",
    "orders:read",
    "orders:write",
    "orders:refund",
    "customers:read",
    "marketing:read",
    "marketing:write",
    "settings:read",
    "audit:read",
  ],
  inventory: [
    "products:read",
    "products:write",
    "inventory:read",
    "inventory:write",
    "orders:read",
  ],
  support: [
    "orders:read",
    "orders:write",
    "customers:read",
    "products:read",
  ],
  marketing: [
    "products:read",
    "marketing:read",
    "marketing:write",
    "customers:read",
  ],
  customer: [],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role as Role] || [];
  return permissions.includes(permission);
}

export function requirePermission(role: string, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Forbidden: Role '${role}' lacks permission '${permission}'`);
  }
}
