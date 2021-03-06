/**
 * The general shape of an Entity.
 */
export interface Entity {
	id?: string
}

/**
 * The general shape of an "add" action.
 */
export interface AddEntityAction<TAction> {
	type: TAction,
	payload: Entity
}

/**
 * The general shape of a "remove" action.
 */
export interface RemoveEntityAction<TAction> {
	type: TAction,
	meta: {
		id: string
	}
}

/**
 * The general shape of a "remove all" action.
 */
export interface RemoveAllEntityAction<TAction> {
	type: TAction
}

/**
 * The general shape of a socket action. If an entity action
 * extends this interface, the action will be intercepted by
 * the socket middleware.
 *
 */
export interface SocketEntityAction<TAction, TSocketPayload> {
	type: TAction,
	meta: {
		socket: {
			event: string,
			payload: TSocketPayload
		}
	}
}