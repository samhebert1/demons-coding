
// Interface for the Roles model
export interface Roles {
  learner?: boolean;
  helper?: boolean;
  admin?: boolean;
}

// Interface for the User model; uses the Roles model in its definition.
export interface User {
  uid: string;
  email: string;
  name?: string;
  roles?: Roles;
  meetings?: string[];
}
