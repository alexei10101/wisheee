export type UserRelation = "owner" | "friend" | "stranger";

export type Permissions = {
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canReserve: boolean;
  canViewPrivate: boolean;
};

export function getUserRelation({ viewerId, ownerId }: { viewerId?: string; ownerId?: string }): UserRelation {
  if (!viewerId) return "stranger";
  if (viewerId === ownerId) return "owner";
  if (!!viewerId && !!ownerId && viewerId === ownerId) return "friend";
  return "stranger";
}

export function getPermissions(relation: UserRelation): Permissions {
  switch (relation) {
    case "owner":
      return {
        canAdd: true,
        canUpdate: true,
        canDelete: true,
        canReserve: false,
        canViewPrivate: true,
      };
    case "friend":
      return {
        canAdd: false,
        canUpdate: false,
        canDelete: false,
        canReserve: true,
        canViewPrivate: true,
      };
    default:
      return {
        canAdd: false,
        canUpdate: false,
        canDelete: false,
        canReserve: false,
        canViewPrivate: false,
      };
  }
}
