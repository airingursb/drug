
interface WilddogAuthResult {
	auth: any;
	expires: number;
}

interface WilddogDataSnapshot {
	/**
	 * Returns true if this DataSnapshot contains any data.
	 * It is slightly more efficient than using snapshot.val() !== null.
	 */
	exists(): boolean;
	/**
	 * Gets the JavaScript object representation of the DataSnapshot.
	 */
	val(): any;
	/**
	 * Gets a DataSnapshot for the location at the specified relative path.
	 */
	child(childPath: string): WilddogDataSnapshot;
	/**
	 * Enumerates through the DataSnapshot’s children (in the default order).
	 */
	forEach(childAction: (childSnapshot: WilddogDataSnapshot) => void): boolean;
	forEach(childAction: (childSnapshot: WilddogDataSnapshot) => boolean): boolean;
	/**
	 * Returns true if the specified child exists.
	 */
	hasChild(childPath: string): boolean;
	/**
	 * Returns true if the DataSnapshot has any children.
	 */
	hasChildren(): boolean;
	/**
	 * Gets the key name of the location that generated this DataSnapshot.
	 */
	key(): string;
	/**
	 * @deprecated Use key() instead.
	 * Gets the key name of the location that generated this DataSnapshot.
	 */
	name(): string;
	/**
	 * Gets the number of children for this DataSnapshot.
	 */
	numChildren(): number;
	/**
	 * Gets the Wilddog reference for the location that generated this DataSnapshot.
	 */
	ref(): Wilddog;
	/**
	 * Gets the priority of the data in this DataSnapshot.
	 * @returns {string, number, null} The priority, or null if no priority was set.
	 */
	getPriority(): any; // string or number
	/**
	 * Exports the entire contents of the DataSnapshot as a JavaScript object.
	 */
	exportVal(): Object;
}

interface WilddogOnDisconnect {
	/**
	 * Ensures the data at this location is set to the specified value when the client is disconnected 
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	set(value: any, onComplete?: (error: any) => void): void;
	/**
	 * Ensures the data at this location is set to the specified value and priority when the client is disconnected 
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	setWithPriority(value: any, priority: string, onComplete?: (error: any) => void): void;
	setWithPriority(value: any, priority: number, onComplete?: (error: any) => void): void;
	/**
	 * Writes the enumerated children at this Wilddog location when the client is disconnected 
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	update(value: Object, onComplete?: (error: any) => void): void;
	/**
	 * Ensures the data at this location is deleted when the client is disconnected 
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	remove(onComplete?: (error: any) => void): void;
	/**
	 * Cancels all previously queued onDisconnect() set or update events for this location and all children.
	 */
	cancel(onComplete?: (error: any) => void): void;
}

interface WilddogQuery {
	/**
	 * Listens for data changes at a particular location.
	 */
	on(eventType: string, callback: (dataSnapshot: WilddogDataSnapshot, prevChildName?: string) => void, cancelCallback?: (error: any) => void, context?: Object): (dataSnapshot: WilddogDataSnapshot, prevChildName?: string) => void;
	/**
	 * Detaches a callback previously attached with on().
	 */
	off(eventType?: string, callback?: (dataSnapshot: WilddogDataSnapshot, prevChildName?: string) => void, context?: Object): void;
	/**
	 * Listens for exactly one event of the specified event type, and then stops listening.
	 */
	once(eventType: string, successCallback: (dataSnapshot: WilddogDataSnapshot) => void, context?: Object): void;
	once(eventType: string, successCallback: (dataSnapshot: WilddogDataSnapshot) => void, failureCallback?: (error: any) => void, context?: Object): void;
	/**
	 * Generates a new Query object ordered by the specified child key.
	 */
	orderByChild(key: string): WilddogQuery;
	/**
	 * Generates a new Query object ordered by key name.
	 */
	orderByKey(): WilddogQuery;
	/**
	 * Generates a new Query object ordered by child values.
	 */
	orderByValue(): WilddogQuery;
	/**
	 * Generates a new Query object ordered by priority.
	 */
	orderByPriority(): WilddogQuery;
	/**
	 * @deprecated Use limitToFirst() and limitToLast() instead.
	 * Generates a new Query object limited to the specified number of children.
	 */
	limit(limit: number): WilddogQuery;
	/**
	 * Creates a Query with the specified starting point. 
	 * The generated Query includes children which match the specified starting point.
	 */
	startAt(value: string, key?: string): WilddogQuery;
	startAt(value: number, key?: string): WilddogQuery;
	/**
	 * Creates a Query with the specified ending point. 
	 * The generated Query includes children which match the specified ending point.
	 */
	endAt(value: string, key?: string): WilddogQuery;
	endAt(value: number, key?: string): WilddogQuery;
	/**
	 * Creates a Query which includes children which match the specified value.
	 */
	equalTo(value: string, key?: string): WilddogQuery;
	equalTo(value: number, key?: string): WilddogQuery;
	/**
	 * Generates a new Query object limited to the first certain number of children.
	 */
	limitToFirst(limit: number): WilddogQuery;
	/**
	 * Generates a new Query object limited to the last certain number of children.
	 */
	limitToLast(limit: number): WilddogQuery;
	/**
	 * Gets a Wilddog reference to the Query's location.
	 */
	ref(): Wilddog;
}

interface Wilddog extends WilddogQuery {
	/**
	 * @deprecated Use authWithCustomToken() instead.
	 * Authenticates a Wilddog client using the provided authentication token or Wilddog Secret.
	 */
	auth(authToken: string, onComplete?: (error: any, result: WilddogAuthResult) => void, onCancel?:(error: any) => void): void;
	/**
	 * Authenticates a Wilddog client using an authentication token or Wilddog Secret.
	 */
	authWithCustomToken(autoToken: string, onComplete: (error: any, authData: WilddogAuthData) => void, options?:Object): void;
	/**
	 * Authenticates a Wilddog client using a new, temporary guest account.
	 */
	authAnonymously(onComplete: (error: any, authData: WilddogAuthData) => void, options?: Object): void;
	/**
	 * Authenticates a Wilddog client using an email / password combination.
	 */
	authWithPassword(credentials: WilddogCredentials, onComplete: (error: any, authData: WilddogAuthData) => void, options?: Object): void;
	/**
	 * Authenticates a Wilddog client using a popup-based OAuth flow.
	 */
	authWithOAuthPopup(provider: string, onComplete:(error: any, authData: WilddogAuthData) => void, options?: Object): void;
	/**
	 * Authenticates a Wilddog client using a redirect-based OAuth flow.
	 */
	authWithOAuthRedirect(provider: string, onComplete: (error: any) => void, options?: Object): void;
	/**
	 * Authenticates a Wilddog client using OAuth access tokens or credentials.
	 */
	authWithOAuthToken(provider: string, credentials: string, onComplete: (error: any, authData: WilddogAuthData) => void, options?: Object): void;
	authWithOAuthToken(provider: string, credentials: Object, onComplete: (error: any, authData: WilddogAuthData) => void, options?: Object): void;
	/**
	 * Synchronously access the current authentication state of the client.
	 */
	getAuth(): WilddogAuthData;
	/**
	 * Listen for changes to the client's authentication state.
	 */
	onAuth(onComplete: (authData: WilddogAuthData) => void, context?: Object): void;
	/**
	 * Detaches a callback previously attached with onAuth().
	 */
	offAuth(onComplete: (authData: WilddogAuthData) => void, context?: Object): void;
	/**
	 * Unauthenticates a Wilddog client.
	 */
	unauth(): void;
	/**
	 * Gets a Wilddog reference for the location at the specified relative path.
	 */
	child(childPath: string): Wilddog;
	/**
	 * Gets a Wilddog reference to the parent location.
	 */
	parent(): Wilddog;
	/**
	 * Gets a Wilddog reference to the root of the Wilddog.
	 */
	root(): Wilddog;
	/**
	 * Returns the last token in a Wilddog location.
	 */
	key(): string;
	/**
	 * @deprecated Use key() instead.
	 * Returns the last token in a Wilddog location.
	 */
	name(): string;
	/**
	 * Gets the absolute URL corresponding to this Wilddog reference's location.
	 */
	toString(): string;
	/**
	 * Writes data to this Wilddog location.
	 */
	set(value: any, onComplete?: (error: any) => void): void;
	/**
	 * Writes the enumerated children to this Wilddog location.
	 */
	update(value: Object, onComplete?: (error: any) => void): void;
	/**
	 * Removes the data at this Wilddog location.
	 */
	remove(onComplete?: (error: any) => void): void;
	/**
	 * Generates a new child location using a unique name and returns a Wilddog reference to it.
	 * @returns {Wilddog} A Wilddog reference for the generated location.
	 */
	push(value?: any, onComplete?: (error: any) => void): Wilddog;
	/**
	 * Writes data to this Wilddog location. Like set() but also specifies the priority for that data.
	 */
	setWithPriority(value: any, priority: string, onComplete?: (error: any) => void): void;
	setWithPriority(value: any, priority: number, onComplete?: (error: any) => void): void;
	/**
	 * Sets a priority for the data at this Wilddog location.
	 */
	setPriority(priority: string, onComplete?: (error: any) => void): void;
	setPriority(priority: number, onComplete?: (error: any) => void): void;
	/**
	 * Atomically modifies the data at this location.
	 */
	transaction(updateFunction: (currentData: any)=> any, onComplete?: (error: any, committed: boolean, snapshot: WilddogDataSnapshot) => void, applyLocally?: boolean): void;
	/**
	 * Creates a new user account using an email / password combination.
	 */
	createUser(credentials: WilddogCredentials, onComplete: (error: any) => void): void;
	/**
	 * Updates the email associated with an email / password user account.
	 */
	changeEmail(credentials: WilddogChangeEmailCredentials, onComplete: (error: any) => void): void;
	/**
	 * Change the password of an existing user using an email / password combination.
	 */
	changePassword(credentials: WilddogChangePasswordCredentials, onComplete: (error: any) => void): void;
	/**
	 * Removes an existing user account using an email / password combination.
	 */
	removeUser(credentials: WilddogCredentials, onComplete: (error: any) => void): void;
	/**
	 * Sends a password-reset email to the owner of the account, containing a token that may be used to authenticate and change the user password.
	 */
	resetPassword(credentials: WilddogResetPasswordCredentials, onComplete: (error: any) => void): void;
	onDisconnect(): WilddogOnDisconnect;
}
interface WilddogStatic {
	/**
	 * Constructs a new Wilddog reference from a full Wilddog URL.
	 */
	new (WilddogURL: string): Wilddog;
	/**
	 * Manually disconnects the Wilddog client from the server and disables automatic reconnection.
	 */
	goOffline(): void;
	/**
	 * Manually reestablishes a connection to the Wilddog server and enables automatic reconnection.
	 */
	goOnline(): void;

	ServerValue: {
		/**
		 * A placeholder value for auto-populating the current timestamp 
		 * (time since the Unix epoch, in milliseconds) by the Wilddog servers.
		 */
		TIMESTAMP: any;
	};
}
declare var Wilddog: WilddogStatic;

declare module 'Wilddog' {
	export = Wilddog;
}


interface WilddogAuthData {
	uid: string;
	provider: string;
	token: string;
	expires: number;
	auth: Object;
}

interface WilddogCredentials {
	email: string;
	password: string;
}

interface WilddogChangePasswordCredentials {
	email: string;
	oldPassword: string;
	newPassword: string;
}

interface WilddogChangeEmailCredentials {
	oldEmail: string;
	newEmail: string;
	password: string;
}

interface WilddogResetPasswordCredentials {
	email: string;
}
