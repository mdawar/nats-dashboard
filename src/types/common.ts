/**
 * Type to be extended by the information endpoint options interfaces.
 *
 * Used for compatibility with `URLSearchParams`.
 */
export type SearchParams = Record<string, any>;

/** Boolean argument that accepts 0 and 1 as values. */
export type BoolOrNumber = boolean | 0 | 1;

/** Subscriptions options (Boolean that also accepts a string value of 'detail'). */
export type SubsOption = BoolOrNumber | 'detail';

/** Connection state. */
export type ConnState = 'open' | 'closed' | 'any';
