
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RelayArguments {
    after?: Nullable<string>;
    first?: Nullable<number>;
}

export interface Edge {
    cursor: string;
    node: NodeRelay;
}

export interface NodeRelay {
    id: string;
}

export interface Relay {
    edges: Nullable<Edge>[];
    pageInfo: PageInfo;
}

export class PageInfo {
    hasNextPage: boolean;
}

export abstract class IQuery {
    abstract users(first?: Nullable<number>, after?: Nullable<string>): Nullable<UserRelay> | Promise<Nullable<UserRelay>>;
}

export class UserEdge implements Edge {
    cursor: string;
    node: User;
}

export class UserRelay {
    edges: Nullable<UserEdge>[];
    pageInfo: PageInfo;
}

export class User implements NodeRelay {
    id: string;
    login?: Nullable<string>;
    avatar?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
}

type Nullable<T> = T | null;
