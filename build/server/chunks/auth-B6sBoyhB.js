import { p as private_env } from './shared-server-DWgAsK3Q.js';
import * as crypto$1 from 'crypto';
import { createHmac } from 'crypto';
import { c as cookieExports, b as base, s as setCookieExports, D as DEV } from './set-cookie-Cbo5QJuH.js';
import * as crypto$2 from 'node:crypto';
import { createHash as createHash$1, randomFillSync, timingSafeEqual as timingSafeEqual$1, createHmac as createHmac$1, getCiphers, KeyObject, createDecipheriv, createCipheriv, createSecretKey, generateKeyPair as generateKeyPair$1, diffieHellman, pbkdf2 as pbkdf2$1, constants, publicEncrypt, privateDecrypt, createPrivateKey, createPublicKey } from 'node:crypto';
import { Buffer as Buffer$1 } from 'node:buffer';
import * as util from 'node:util';
import { promisify, deprecate } from 'node:util';
import { r as redirect } from './index-DyoisQP2.js';
import bcrypt from 'bcrypt';
import { d as db } from './db-BEDA57LU.js';
import { U as User } from './user-DOIS7Uio.js';

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionStore_instances, _SessionStore_chunks, _SessionStore_option, _SessionStore_logger, _SessionStore_chunk, _SessionStore_clean;
// Uncomment to recalculate the estimated size
// of an empty session cookie
// import { serialize } from "cookie"
// console.log(
//   "Cookie estimated to be ",
//   serialize(`__Secure.authjs.session-token.0`, "", {
//     expires: new Date(),
//     httpOnly: true,
//     maxAge: Number.MAX_SAFE_INTEGER,
//     path: "/",
//     sameSite: "strict",
//     secure: true,
//     domain: "example.com",
//   }).length,
//   " bytes"
// )
const ALLOWED_COOKIE_SIZE = 4096;
// Based on commented out section above
const ESTIMATED_EMPTY_COOKIE_SIZE = 160;
const CHUNK_SIZE$1 = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
/**
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 * @TODO Review cookie settings (names, options)
 */
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        // default cookie options
        sessionToken: {
            name: `${cookiePrefix}authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        callbackUrl: {
            name: `${cookiePrefix}authjs.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        csrfToken: {
            // Default to __Host- for CSRF token for additional protection if using useSecureCookies
            // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
            name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}authjs.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
        state: {
            name: `${cookiePrefix}authjs.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
        nonce: {
            name: `${cookiePrefix}authjs.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        webauthnChallenge: {
            name: `${cookiePrefix}authjs.challenge`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
    };
}
class SessionStore {
    constructor(option, cookies, logger) {
        _SessionStore_instances.add(this);
        _SessionStore_chunks.set(this, {});
        _SessionStore_option.set(this, void 0);
        _SessionStore_logger.set(this, void 0);
        __classPrivateFieldSet(this, _SessionStore_logger, logger, "f");
        __classPrivateFieldSet(this, _SessionStore_option, option, "f");
        if (!cookies)
            return;
        const { name: sessionCookiePrefix } = option;
        for (const [name, value] of Object.entries(cookies)) {
            if (!name.startsWith(sessionCookiePrefix) || !value)
                continue;
            __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
        }
    }
    /**
     * The JWT Session or database Session ID
     * constructed from the cookie chunks.
     */
    get value() {
        // Sort the chunks by their keys before joining
        const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a, b) => {
            const aSuffix = parseInt(a.split(".").pop() || "0");
            const bSuffix = parseInt(b.split(".").pop() || "0");
            return aSuffix - bSuffix;
        });
        // Use the sorted keys to join the chunks in the correct order
        return sortedKeys.map((key) => __classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
    }
    /**
     * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
     * If the cookie has changed from chunked to unchunked or vice versa,
     * it deletes the old cookies as well.
     */
    chunk(value, options) {
        // Assume all cookies should be cleaned by default
        const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
        // Calculate new chunks
        const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
            name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
            value,
            options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, ...options },
        });
        // Update stored chunks / cookies
        for (const chunk of chunked) {
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    /** Returns a list of cookies that should be cleaned. */
    clean() {
        return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
    }
}
_SessionStore_chunks = new WeakMap(), _SessionStore_option = new WeakMap(), _SessionStore_logger = new WeakMap(), _SessionStore_instances = new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE$1);
    if (chunkCount === 1) {
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie.name] = cookie.value;
        return [cookie];
    }
    const cookies = [];
    for (let i = 0; i < chunkCount; i++) {
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE$1, CHUNK_SIZE$1);
        cookies.push({ ...cookie, name, value });
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
    __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE),
    });
    return cookies;
}, _SessionStore_clean = function _SessionStore_clean() {
    const cleanedChunks = {};
    for (const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")) {
        delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, maxAge: 0 },
        };
    }
    return cleanedChunks;
};

/**
 * Base error class for all Auth.js errors.
 * It's optimized to be printed in the server logs in a nicely formatted way
 * via the [`logger.error`](https://authjs.dev/reference/core#logger) option.
 */
class AuthError extends Error {
    constructor(message, errorOptions) {
        if (message instanceof Error) {
            super(undefined, {
                cause: { err: message, ...message.cause, ...errorOptions },
            });
        }
        else if (typeof message === "string") {
            if (errorOptions instanceof Error) {
                errorOptions = { err: errorOptions, ...errorOptions.cause };
            }
            super(message, errorOptions);
        }
        else {
            super(undefined, message);
        }
        this.name = this.constructor.name;
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.type = this.constructor.type ?? "AuthError";
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.kind = this.constructor.kind ?? "error";
        Error.captureStackTrace?.(this, this.constructor);
        const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
        this.message += `${this.message ? ". " : ""}Read more at ${url}`;
    }
}
class SignInError extends AuthError {
}
SignInError.kind = "signIn";
/**
 * One of the database [`Adapter` methods](https://authjs.dev/reference/core/adapters#methods)
 * failed during execution.
 *
 * :::tip
 * If `debug: true` is set, you can check out `[auth][debug]` in the logs to learn more about the failed adapter method execution.
 * @example
 * ```sh
 * [auth][debug]: adapter_getUserByEmail
 * { "args": [undefined] }
 * ```
 * :::
 */
class AdapterError extends AuthError {
}
AdapterError.type = "AdapterError";
/**
 * Thrown when the execution of the [`signIn` callback](https://authjs.dev/reference/core/types#signin) fails
 * or if it returns `false`.
 */
class AccessDenied extends AuthError {
}
AccessDenied.type = "AccessDenied";
/**
 * This error occurs when the user cannot finish login.
 * Depending on the provider type, this could have happened for multiple reasons.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 *
 * For an [OAuth provider](https://authjs.dev/getting-started/authentication/oauth), possible causes are:
 * - The user denied access to the application
 * - There was an error parsing the OAuth Profile:
 *   Check out the provider's `profile` or `userinfo.request` method to make sure
 *   it correctly fetches the user's profile.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * For an [Email provider](https://authjs.dev/getting-started/authentication/email), possible causes are:
 * - The provided email/token combination was invalid/missing:
 *   Check if the provider's `sendVerificationRequest` method correctly sends the email.
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 *
 * For a [Credentials provider](https://authjs.dev/getting-started/authentication/credentials), possible causes are:
 * - The `authorize` method threw an uncaught error:
 *   Check the provider's `authorize` method.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * :::tip
 * Check out `[auth][cause]` in the error message for more details.
 * It will show the original stack trace.
 * :::
 */
class CallbackRouteError extends AuthError {
}
CallbackRouteError.type = "CallbackRouteError";
/**
 * Thrown when Auth.js is misconfigured and accidentally tried to require authentication on a custom error page.
 * To prevent an infinite loop, Auth.js will instead render its default error page.
 *
 * To fix this, make sure that the `error` page does not require authentication.
 *
 * Learn more at [Guide: Error pages](https://authjs.dev/guides/pages/error)
 */
class ErrorPageLoop extends AuthError {
}
ErrorPageLoop.type = "ErrorPageLoop";
/**
 * One of the [`events` methods](https://authjs.dev/reference/core/types#eventcallbacks)
 * failed during execution.
 *
 * Make sure that the `events` methods are implemented correctly and uncaught errors are handled.
 *
 * Learn more at [`events`](https://authjs.dev/reference/core/types#eventcallbacks)
 */
class EventError extends AuthError {
}
EventError.type = "EventError";
/**
 * Thrown when Auth.js is unable to verify a `callbackUrl` value.
 * The browser either disabled cookies or the `callbackUrl` is not a valid URL.
 *
 * Somebody might have tried to manipulate the callback URL that Auth.js uses to redirect the user back to the configured `callbackUrl`/page.
 * This could be a malicious hacker trying to redirect the user to a phishing site.
 * To prevent this, Auth.js checks if the callback URL is valid and throws this error if it is not.
 *
 * There is no action required, but it might be an indicator that somebody is trying to attack your application.
 */
class InvalidCallbackUrl extends AuthError {
}
InvalidCallbackUrl.type = "InvalidCallbackUrl";
/**
 * Can be thrown from the `authorize` callback of the Credentials provider.
 * When an error occurs during the `authorize` callback, two things can happen:
 * 1. The user is redirected to the signin page, with `error=CredentialsSignin&code=credentials` in the URL. `code` is configurable.
 * 2. If you throw this error in a framework that handles form actions server-side, this error is thrown, instead of redirecting the user, so you'll need to handle.
 */
class CredentialsSignin extends SignInError {
    constructor() {
        super(...arguments);
        /**
         * The error code that is set in the `code` query parameter of the redirect URL.
         *
         *
         * ⚠ NOTE: This property is going to be included in the URL, so make sure it does not hint at sensitive errors.
         *
         * The full error is always logged on the server, if you need to debug.
         *
         * Generally, we don't recommend hinting specifically if the user had either a wrong username or password specifically,
         * try rather something like "Invalid credentials".
         */
        this.code = "credentials";
    }
}
CredentialsSignin.type = "CredentialsSignin";
/**
 * One of the configured OAuth or OIDC providers is missing the `authorization`, `token` or `userinfo`, or `issuer` configuration.
 * To perform OAuth or OIDC sign in, at least one of these endpoints is required.
 *
 * Learn more at [`OAuth2Config`](https://authjs.dev/reference/core/providers#oauth2configprofile) or [Guide: OAuth Provider](https://authjs.dev/guides/configuring-oauth-providers)
 */
class InvalidEndpoints extends AuthError {
}
InvalidEndpoints.type = "InvalidEndpoints";
/**
 * Thrown when a PKCE, state or nonce OAuth check could not be performed.
 * This could happen if the OAuth provider is configured incorrectly or if the browser is blocking cookies.
 *
 * Learn more at [`checks`](https://authjs.dev/reference/core/providers#checks)
 */
class InvalidCheck extends AuthError {
}
InvalidCheck.type = "InvalidCheck";
/**
 * Logged on the server when Auth.js could not decode or encode a JWT-based (`strategy: "jwt"`) session.
 *
 * Possible causes are either a misconfigured `secret` or a malformed JWT or `encode/decode` methods.
 *
 * :::note
 * When this error is logged, the session cookie is destroyed.
 * :::
 *
 * Learn more at [`secret`](https://authjs.dev/reference/core#secret), [`jwt.encode`](https://authjs.dev/reference/core/jwt#encode-1) or [`jwt.decode`](https://authjs.dev/reference/core/jwt#decode-2) for more information.
 */
class JWTSessionError extends AuthError {
}
JWTSessionError.type = "JWTSessionError";
/**
 * Thrown if Auth.js is misconfigured. This could happen if you configured an Email provider but did not set up a database adapter,
 * or tried using a `strategy: "database"` session without a database adapter.
 * In both cases, make sure you either remove the configuration or add the missing adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database), [Email provider](https://authjs.dev/getting-started/authentication/email) or [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database-session)
 */
class MissingAdapter extends AuthError {
}
MissingAdapter.type = "MissingAdapter";
/**
 * Thrown similarily to [`MissingAdapter`](https://authjs.dev/reference/core/errors#missingadapter), but only some required methods were missing.
 *
 * Make sure you either remove the configuration or add the missing methods to the adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database)
 */
class MissingAdapterMethods extends AuthError {
}
MissingAdapterMethods.type = "MissingAdapterMethods";
/**
 * Thrown when a Credentials provider is missing the `authorize` configuration.
 * To perform credentials sign in, the `authorize` method is required.
 *
 * Learn more at [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 */
class MissingAuthorize extends AuthError {
}
MissingAuthorize.type = "MissingAuthorize";
/**
 * Auth.js requires a secret or multiple secrets to be set, but none was not found. This is used to encrypt cookies, JWTs and other sensitive data.
 *
 * :::note
 * If you are using a framework like Next.js, we try to automatically infer the secret from the `AUTH_SECRET`, `AUTH_SECRET_1`, etc. environment variables.
 * Alternatively, you can also explicitly set the [`AuthConfig.secret`](https://authjs.dev/reference/core#secret) option.
 * :::
 *
 *
 * :::tip
 * To generate a random string, you can use the Auth.js CLI: `npx auth secret`
 * :::
 */
class MissingSecret extends AuthError {
}
MissingSecret.type = "MissingSecret";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an OAuth account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link OAuth accounts to existing accounts if the user is not signed in.
 *
 * :::tip
 * If you trust the OAuth provider to have verified the user's email address,
 * you can enable automatic account linking by setting [`allowDangerousEmailAccountLinking: true`](https://authjs.dev/reference/core/providers#allowdangerousemailaccountlinking)
 * in the provider configuration.
 * :::
 */
class OAuthAccountNotLinked extends SignInError {
}
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
/**
 * Thrown when an OAuth provider returns an error during the sign in process.
 * This could happen for example if the user denied access to the application or there was a configuration error.
 *
 * For a full list of possible reasons, check out the specification [Authorization Code Grant: Error Response](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
 */
class OAuthCallbackError extends SignInError {
}
OAuthCallbackError.type = "OAuthCallbackError";
/**
 * This error occurs during an OAuth sign in attempt when the provider's
 * response could not be parsed. This could for example happen if the provider's API
 * changed, or the [`OAuth2Config.profile`](https://authjs.dev/reference/core/providers#oauth2configprofile) method is not implemented correctly.
 */
class OAuthProfileParseError extends AuthError {
}
OAuthProfileParseError.type = "OAuthProfileParseError";
/**
 * Logged on the server when Auth.js could not retrieve a session from the database (`strategy: "database"`).
 *
 * The database adapter might be misconfigured or the database is not reachable.
 *
 * Learn more at [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database)
 */
class SessionTokenError extends AuthError {
}
SessionTokenError.type = "SessionTokenError";
/**
 * Happens when login by [OAuth](https://authjs.dev/getting-started/authentication/oauth) could not be started.
 *
 * Possible causes are:
 * - The Authorization Server is not compliant with the [OAuth 2.0](https://www.ietf.org/rfc/rfc6749.html) or the [OIDC](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *   Check the details in the error message.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 */
class OAuthSignInError extends SignInError {
}
OAuthSignInError.type = "OAuthSignInError";
/**
 * Happens when the login by an [Email provider](https://authjs.dev/getting-started/authentication/email) could not be started.
 *
 * Possible causes are:
 * - The email sent from the client is invalid, could not be normalized by [`EmailConfig.normalizeIdentifier`](https://authjs.dev/reference/core/providers/email#normalizeidentifier)
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 */
class EmailSignInError extends SignInError {
}
EmailSignInError.type = "EmailSignInError";
/**
 * Represents an error that occurs during the sign-out process. This error
 * is logged when there are issues in terminating a user's session, either
 * by failing to delete the session from the database (in database session
 * strategies) or encountering issues during other parts of the sign-out
 * process, such as emitting sign-out events or clearing session cookies.
 *
 * The session cookie(s) are emptied even if this error is logged.
 *
 */
class SignOutError extends AuthError {
}
SignOutError.type = "SignOutError";
/**
 * Auth.js was requested to handle an operation that it does not support.
 *
 * See [`AuthAction`](https://authjs.dev/reference/core/types#authaction) for the supported actions.
 */
class UnknownAction extends AuthError {
}
UnknownAction.type = "UnknownAction";
/**
 * Thrown when a Credentials provider is present but the JWT strategy (`strategy: "jwt"`) is not enabled.
 *
 * Learn more at [`strategy`](https://authjs.dev/reference/core#strategy) or [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 */
class UnsupportedStrategy extends AuthError {
}
UnsupportedStrategy.type = "UnsupportedStrategy";
/** Thrown when an endpoint was incorrectly called without a provider, or with an unsupported provider. */
class InvalidProvider extends AuthError {
}
InvalidProvider.type = "InvalidProvider";
/**
 * Thrown when the `trustHost` option was not set to `true`.
 *
 * Auth.js requires the `trustHost` option to be set to `true` since it's relying on the request headers' `host` value.
 *
 * :::note
 * Official Auth.js libraries might attempt to automatically set the `trustHost` option to `true` if the request is coming from a trusted host on a trusted platform.
 * :::
 *
 * Learn more at [`trustHost`](https://authjs.dev/reference/core#trusthost) or [Guide: Deployment](https://authjs.dev/getting-started/deployment)
 */
class UntrustedHost extends AuthError {
}
UntrustedHost.type = "UntrustedHost";
/**
 * The user's email/token combination was invalid.
 * This could be because the email/token combination was not found in the database,
 * or because the token has expired. Ask the user to log in again.
 */
class Verification extends AuthError {
}
Verification.type = "Verification";
/**
 * Error for missing CSRF tokens in client-side actions (`signIn`, `signOut`, `useSession#update`).
 * Thrown when actions lack the double submit cookie, essential for CSRF protection.
 *
 * CSRF ([Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf))
 * is an attack leveraging authenticated user credentials for unauthorized actions.
 *
 * Double submit cookie pattern, a CSRF defense, requires matching values in a cookie
 * and request parameter. More on this at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).
 */
class MissingCSRF extends SignInError {
}
MissingCSRF.type = "MissingCSRF";
const clientErrors = new Set([
    "CredentialsSignin",
    "OAuthAccountNotLinked",
    "OAuthCallbackError",
    "AccessDenied",
    "Verification",
    "MissingCSRF",
    "AccountNotLinked",
    "WebAuthnVerificationError",
]);
/**
 * Used to only allow sending a certain subset of errors to the client.
 * Errors are always logged on the server, but to prevent leaking sensitive information,
 * only a subset of errors are sent to the client as-is.
 * @internal
 */
function isClientError(error) {
    if (error instanceof AuthError)
        return clientErrors.has(error.type);
    return false;
}
/**
 * Thrown when multiple providers have `enableConditionalUI` set to `true`.
 * Only one provider can have this option enabled at a time.
 */
class DuplicateConditionalUI extends AuthError {
}
DuplicateConditionalUI.type = "DuplicateConditionalUI";
/**
 * Thrown when a WebAuthn provider has `enableConditionalUI` set to `true` but no formField has `webauthn` in its autocomplete param.
 *
 * The `webauthn` autocomplete param is required for conditional UI to work.
 */
class MissingWebAuthnAutocomplete extends AuthError {
}
MissingWebAuthnAutocomplete.type = "MissingWebAuthnAutocomplete";
/**
 * Thrown when a WebAuthn provider fails to verify a client response.
 */
class WebAuthnVerificationError extends AuthError {
}
WebAuthnVerificationError.type = "WebAuthnVerificationError";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link accounts to existing accounts if the user is not signed in.
 */
class AccountNotLinked extends SignInError {
}
AccountNotLinked.type = "AccountNotLinked";
/**
 * Thrown when an experimental feature is used but not enabled.
 */
class ExperimentalFeatureNotEnabled extends AuthError {
}
ExperimentalFeatureNotEnabled.type = "ExperimentalFeatureNotEnabled";

let warned = false;
function isValidHttpUrl(url, baseUrl) {
    try {
        return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
    }
    catch {
        return false;
    }
}
function isSemverString(version) {
    return /^v\d+(?:\.\d+){0,2}$/.test(version);
}
let hasCredentials = false;
let hasEmail = false;
let hasWebAuthn = false;
const emailMethods = [
    "createVerificationToken",
    "useVerificationToken",
    "getUserByEmail",
];
const sessionMethods = [
    "createUser",
    "getUser",
    "getUserByEmail",
    "getUserByAccount",
    "updateUser",
    "linkAccount",
    "createSession",
    "getSessionAndUser",
    "updateSession",
    "deleteSession",
];
const webauthnMethods = [
    "createUser",
    "getUser",
    "linkAccount",
    "getAccount",
    "getAuthenticator",
    "createAuthenticator",
    "listAuthenticatorsByUserId",
    "updateAuthenticatorCounter",
];
/**
 * Verify that the user configured Auth.js correctly.
 * Good place to mention deprecations as well.
 *
 * This is invoked before the init method, so default values are not available yet.
 */
function assertConfig(request, options) {
    const { url } = request;
    const warnings = [];
    if (!warned && options.debug)
        warnings.push("debug-enabled");
    if (!options.trustHost) {
        return new UntrustedHost(`Host must be trusted. URL was: ${request.url}`);
    }
    if (!options.secret?.length) {
        return new MissingSecret("Please define a `secret`");
    }
    const callbackUrlParam = request.query?.callbackUrl;
    if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
        return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
    }
    const { callbackUrl: defaultCallbackUrl } = defaultCookies(options.useSecureCookies ?? url.protocol === "https:");
    const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
    if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
        return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
    }
    // Keep track of webauthn providers that use conditional UI
    let hasConditionalUIProvider = false;
    for (const p of options.providers) {
        const provider = typeof p === "function" ? p() : p;
        if ((provider.type === "oauth" || provider.type === "oidc") &&
            !(provider.issuer ?? provider.options?.issuer)) {
            const { authorization: a, token: t, userinfo: u } = provider;
            let key;
            if (typeof a !== "string" && !a?.url)
                key = "authorization";
            else if (typeof t !== "string" && !t?.url)
                key = "token";
            else if (typeof u !== "string" && !u?.url)
                key = "userinfo";
            if (key) {
                return new InvalidEndpoints(`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required`);
            }
        }
        if (provider.type === "credentials")
            hasCredentials = true;
        else if (provider.type === "email")
            hasEmail = true;
        else if (provider.type === "webauthn") {
            hasWebAuthn = true;
            // Validate simpleWebAuthnBrowserVersion
            if (provider.simpleWebAuthnBrowserVersion &&
                !isSemverString(provider.simpleWebAuthnBrowserVersion)) {
                return new AuthError(`Invalid provider config for "${provider.id}": simpleWebAuthnBrowserVersion "${provider.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
            }
            if (provider.enableConditionalUI) {
                // Make sure only one webauthn provider has "enableConditionalUI" set to true
                if (hasConditionalUIProvider) {
                    return new DuplicateConditionalUI(`Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time`);
                }
                hasConditionalUIProvider = true;
                // Make sure at least one formField has "webauthn" in its autocomplete param
                const hasWebauthnFormField = Object.values(provider.formFields).some((f) => f.autocomplete && f.autocomplete.toString().indexOf("webauthn") > -1);
                if (!hasWebauthnFormField) {
                    return new MissingWebAuthnAutocomplete(`Provider "${provider.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
                }
            }
        }
    }
    if (hasCredentials) {
        const dbStrategy = options.session?.strategy === "database";
        const onlyCredentials = !options.providers.some((p) => (typeof p === "function" ? p() : p).type !== "credentials");
        if (dbStrategy && onlyCredentials) {
            return new UnsupportedStrategy("Signing in with credentials only supported if JWT strategy is enabled");
        }
        const credentialsNoAuthorize = options.providers.some((p) => {
            const provider = typeof p === "function" ? p() : p;
            return provider.type === "credentials" && !provider.authorize;
        });
        if (credentialsNoAuthorize) {
            return new MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
        }
    }
    const { adapter, session } = options;
    let requiredMethods = [];
    if (hasEmail ||
        session?.strategy === "database" ||
        (!session?.strategy && adapter)) {
        if (hasEmail) {
            if (!adapter)
                return new MissingAdapter("Email login requires an adapter");
            requiredMethods.push(...emailMethods);
        }
        else {
            if (!adapter)
                return new MissingAdapter("Database session requires an adapter");
            requiredMethods.push(...sessionMethods);
        }
    }
    if (hasWebAuthn) {
        // Log experimental warning
        if (options.experimental?.enableWebAuthn) {
            warnings.push("experimental-webauthn");
        }
        else {
            return new ExperimentalFeatureNotEnabled("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
        }
        if (!adapter)
            return new MissingAdapter("WebAuthn requires an adapter");
        requiredMethods.push(...webauthnMethods);
    }
    if (adapter) {
        const missing = requiredMethods.filter((m) => !(m in adapter));
        if (missing.length) {
            return new MissingAdapterMethods(`Required adapter methods were missing: ${missing.join(", ")}`);
        }
    }
    if (!warned)
        warned = true;
    return warnings;
}

var fallback = (digest, ikm, salt, info, keylen) => {
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = createHmac(digest, salt.byteLength ? salt : new Uint8Array(hashlen))
        .update(ikm)
        .digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for (let c = 1; c <= N; c++) {
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set(createHmac(digest, prk)
            .update(T.subarray(prev, start + info.byteLength + 1))
            .digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
};

let hkdf$1;
if (typeof crypto$1.hkdf === 'function' && !process.versions.electron) {
    hkdf$1 = async (...args) => new Promise((resolve, reject) => {
        crypto$1.hkdf(...args, (err, arrayBuffer) => {
            if (err)
                reject(err);
            else
                resolve(new Uint8Array(arrayBuffer));
        });
    });
}
var derive = async (digest, ikm, salt, info, keylen) => (hkdf$1 || fallback)(digest, ikm, salt, info, keylen);

function normalizeDigest(digest) {
    switch (digest) {
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string')
        return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array))
        throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength)
        throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return derive(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}

const digest = (algorithm, data) => createHash$1(algorithm).update(data).digest();

const encoder$1 = new TextEncoder();
const decoder$1 = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers) {
        buf.set(buffer, i);
        i += buffer.length;
    }
    return buf;
}
function p2s(alg, p2sInput) {
    return concat(encoder$1.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await digest('sha256', buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}

function normalize$1(input) {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = decoder$1.decode(encoded);
    }
    return encoded;
}
const encode$2 = (input) => Buffer$1.from(input).toString('base64url');
const decode$2 = (input) => new Uint8Array(Buffer$1.from(normalize$1(input), 'base64'));

class JOSEError extends Error {
    static get code() {
        return 'ERR_JOSE_GENERIC';
    }
    code = 'ERR_JOSE_GENERIC';
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class JWTClaimValidationFailed extends JOSEError {
    static get code() {
        return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    }
    code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JWTExpired extends JOSEError {
    static get code() {
        return 'ERR_JWT_EXPIRED';
    }
    code = 'ERR_JWT_EXPIRED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    static get code() {
        return 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
    code = 'ERR_JOSE_ALG_NOT_ALLOWED';
}
class JOSENotSupported extends JOSEError {
    static get code() {
        return 'ERR_JOSE_NOT_SUPPORTED';
    }
    code = 'ERR_JOSE_NOT_SUPPORTED';
}
class JWEDecryptionFailed extends JOSEError {
    static get code() {
        return 'ERR_JWE_DECRYPTION_FAILED';
    }
    code = 'ERR_JWE_DECRYPTION_FAILED';
    message = 'decryption operation failed';
}
class JWEInvalid extends JOSEError {
    static get code() {
        return 'ERR_JWE_INVALID';
    }
    code = 'ERR_JWE_INVALID';
}
class JWTInvalid extends JOSEError {
    static get code() {
        return 'ERR_JWT_INVALID';
    }
    code = 'ERR_JWT_INVALID';
}
class JWKInvalid extends JOSEError {
    static get code() {
        return 'ERR_JWK_INVALID';
    }
    code = 'ERR_JWK_INVALID';
}

function bitLength$1(alg) {
    switch (alg) {
        case 'A128GCM':
        case 'A128GCMKW':
        case 'A192GCM':
        case 'A192GCMKW':
        case 'A256GCM':
        case 'A256GCMKW':
            return 96;
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return 128;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
var generateIv = (alg) => randomFillSync(new Uint8Array(bitLength$1(alg) >> 3));

const checkIvLength = (enc, iv) => {
    if (iv.length << 3 !== bitLength$1(enc)) {
        throw new JWEInvalid('Invalid Initialization Vector length');
    }
};

var isKeyObject = (obj) => util.types.isKeyObject(obj);

const checkCekLength = (enc, cek) => {
    let expected;
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            expected = parseInt(enc.slice(-3), 10);
            break;
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            expected = parseInt(enc.slice(1, 4), 10);
            break;
        default:
            throw new JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
    }
    if (cek instanceof Uint8Array) {
        const actual = cek.byteLength << 3;
        if (actual !== expected) {
            throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
        }
        return;
    }
    if (isKeyObject(cek) && cek.type === 'secret') {
        const actual = cek.symmetricKeySize << 3;
        if (actual !== expected) {
            throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
        }
        return;
    }
    throw new TypeError('Invalid Content Encryption Key type');
};

const timingSafeEqual = timingSafeEqual$1;

function cbcTag(aad, iv, ciphertext, macSize, macKey, keySize) {
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const hmac = createHmac$1(`sha${macSize}`, macKey);
    hmac.update(macData);
    return hmac.digest().slice(0, keySize >> 3);
}

const webcrypto = crypto$2.webcrypto;
const isCryptoKey$1 = (key) => util.types.isCryptoKey(key);

function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkEncCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM': {
            if (!isAlgorithm(key.algorithm, 'AES-GCM'))
                throw unusable('AES-GCM');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (!isAlgorithm(key.algorithm, 'AES-KW'))
                throw unusable('AES-KW');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'ECDH': {
            switch (key.algorithm.name) {
                case 'ECDH':
                case 'X25519':
                case 'X448':
                    break;
                default:
                    throw unusable('ECDH, X25519, or X448');
            }
            break;
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (!isAlgorithm(key.algorithm, 'PBKDF2'))
                throw unusable('PBKDF2');
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (!isAlgorithm(key.algorithm, 'RSA-OAEP'))
                throw unusable('RSA-OAEP');
            const expected = parseInt(alg.slice(9), 10) || 1;
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}

function message(msg, actual, ...types) {
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    }
    else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    }
    else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    }
    else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    }
    else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor?.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
}
var invalidKeyInput = (actual, ...types) => {
    return message('Key must be ', actual, ...types);
};
function withAlg(alg, actual, ...types) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}

let ciphers;
var supported = (algorithm) => {
    ciphers ||= new Set(getCiphers());
    return ciphers.has(algorithm);
};

var isKeyLike = (key) => isKeyObject(key) || isCryptoKey$1(key);
const types = ['KeyObject'];
if (globalThis.CryptoKey || webcrypto?.CryptoKey) {
    types.push('CryptoKey');
}

function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if (isKeyObject(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const macSize = parseInt(enc.slice(-3), 10);
    const algorithm = `aes-${keySize}-cbc`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const expectedTag = cbcTag(aad, iv, ciphertext, macSize, macKey, keySize);
    let macCheckPassed;
    try {
        macCheckPassed = timingSafeEqual(tag, expectedTag);
    }
    catch {
    }
    if (!macCheckPassed) {
        throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
        const decipher = createDecipheriv(algorithm, encKey, iv);
        plaintext = concat(decipher.update(ciphertext), decipher.final());
    }
    catch {
    }
    if (!plaintext) {
        throw new JWEDecryptionFailed();
    }
    return plaintext;
}
function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    try {
        const decipher = createDecipheriv(algorithm, cek, iv, { authTagLength: 16 });
        decipher.setAuthTag(tag);
        if (aad.byteLength) {
            decipher.setAAD(aad, { plaintextLength: ciphertext.length });
        }
        const plaintext = decipher.update(ciphertext);
        decipher.final();
        return plaintext;
    }
    catch {
        throw new JWEDecryptionFailed();
    }
}
const decrypt$2 = (enc, cek, ciphertext, iv, tag, aad) => {
    let key;
    if (isCryptoKey$1(cek)) {
        checkEncCryptoKey(cek, enc, 'decrypt');
        key = KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || isKeyObject(cek)) {
        key = cek;
    }
    else {
        throw new TypeError(invalidKeyInput(cek, ...types, 'Uint8Array'));
    }
    if (!iv) {
        throw new JWEInvalid('JWE Initialization Vector missing');
    }
    if (!tag) {
        throw new JWEInvalid('JWE Authentication Tag missing');
    }
    checkCekLength(enc, key);
    checkIvLength(enc, iv);
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcDecrypt(enc, key, ciphertext, iv, tag, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmDecrypt(enc, key, ciphertext, iv, tag, aad);
        default:
            throw new JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};

const isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};

function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject$1(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

function checkKeySize(key, alg) {
    if (key.symmetricKeySize << 3 !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function ensureKeyObject$1(key, alg, usage) {
    if (isKeyObject(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        return createSecretKey(key);
    }
    if (isCryptoKey$1(key)) {
        checkEncCryptoKey(key, alg, usage);
        return KeyObject.from(key);
    }
    throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
}
const wrap$1 = (alg, key, cek) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject$1(key, alg, 'wrapKey');
    checkKeySize(keyObject, alg);
    const cipher = createCipheriv(algorithm, keyObject, Buffer$1.alloc(8, 0xa6));
    return concat(cipher.update(cek), cipher.final());
};
const unwrap$1 = (alg, key, encryptedKey) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject$1(key, alg, 'unwrapKey');
    checkKeySize(keyObject, alg);
    const cipher = createDecipheriv(algorithm, keyObject, Buffer$1.alloc(8, 0xa6));
    return concat(cipher.update(encryptedKey), cipher.final());
};

const namedCurveToJOSE = (namedCurve) => {
    switch (namedCurve) {
        case 'prime256v1':
            return 'P-256';
        case 'secp384r1':
            return 'P-384';
        case 'secp521r1':
            return 'P-521';
        case 'secp256k1':
            return 'secp256k1';
        default:
            throw new JOSENotSupported('Unsupported key curve for this operation');
    }
};
const getNamedCurve = (kee, raw) => {
    let key;
    if (isCryptoKey$1(kee)) {
        key = KeyObject.from(kee);
    }
    else if (isKeyObject(kee)) {
        key = kee;
    }
    else {
        throw new TypeError(invalidKeyInput(kee, ...types));
    }
    if (key.type === 'secret') {
        throw new TypeError('only "private" or "public" type keys can be used for this operation');
    }
    switch (key.asymmetricKeyType) {
        case 'ed25519':
        case 'ed448':
            return `Ed${key.asymmetricKeyType.slice(2)}`;
        case 'x25519':
        case 'x448':
            return `X${key.asymmetricKeyType.slice(1)}`;
        case 'ec': {
            const namedCurve = key.asymmetricKeyDetails.namedCurve;
            return namedCurveToJOSE(namedCurve);
        }
        default:
            throw new TypeError('Invalid asymmetric key type for this operation');
    }
};

const generateKeyPair = promisify(generateKeyPair$1);
async function deriveKey(publicKee, privateKee, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    let publicKey;
    if (isCryptoKey$1(publicKee)) {
        checkEncCryptoKey(publicKee, 'ECDH');
        publicKey = KeyObject.from(publicKee);
    }
    else if (isKeyObject(publicKee)) {
        publicKey = publicKee;
    }
    else {
        throw new TypeError(invalidKeyInput(publicKee, ...types));
    }
    let privateKey;
    if (isCryptoKey$1(privateKee)) {
        checkEncCryptoKey(privateKee, 'ECDH', 'deriveBits');
        privateKey = KeyObject.from(privateKee);
    }
    else if (isKeyObject(privateKee)) {
        privateKey = privateKee;
    }
    else {
        throw new TypeError(invalidKeyInput(privateKee, ...types));
    }
    const value = concat(lengthAndInput(encoder$1.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    const sharedSecret = diffieHellman({ privateKey, publicKey });
    return concatKdf(sharedSecret, keyLength, value);
}
async function generateEpk(kee) {
    let key;
    if (isCryptoKey$1(kee)) {
        key = KeyObject.from(kee);
    }
    else if (isKeyObject(kee)) {
        key = kee;
    }
    else {
        throw new TypeError(invalidKeyInput(kee, ...types));
    }
    switch (key.asymmetricKeyType) {
        case 'x25519':
            return generateKeyPair('x25519');
        case 'x448': {
            return generateKeyPair('x448');
        }
        case 'ec': {
            const namedCurve = getNamedCurve(key);
            return generateKeyPair('ec', { namedCurve });
        }
        default:
            throw new JOSENotSupported('Invalid or unsupported EPK');
    }
}
const ecdhAllowed = (key) => ['P-256', 'P-384', 'P-521', 'X25519', 'X448'].includes(getNamedCurve(key));

function checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new JWEInvalid('PBES2 Salt Input must be 8 or more octets');
    }
}

const pbkdf2 = promisify(pbkdf2$1);
function getPassword(key, alg) {
    if (isKeyObject(key)) {
        return key.export();
    }
    if (key instanceof Uint8Array) {
        return key;
    }
    if (isCryptoKey$1(key)) {
        checkEncCryptoKey(key, alg, 'deriveBits', 'deriveKey');
        return KeyObject.from(key).export();
    }
    throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
}
const encrypt$2 = async (alg, key, cek, p2c = 2048, p2s$1 = randomFillSync(new Uint8Array(16))) => {
    checkP2s(p2s$1);
    const salt = p2s(alg, p2s$1);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    const encryptedKey = await wrap$1(alg.slice(-6), derivedKey, cek);
    return { encryptedKey, p2c, p2s: encode$2(p2s$1) };
};
const decrypt$1 = async (alg, key, encryptedKey, p2c, p2s$1) => {
    checkP2s(p2s$1);
    const salt = p2s(alg, p2s$1);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    return unwrap$1(alg.slice(-6), derivedKey, encryptedKey);
};

var checkKeyLength = (key, alg) => {
    const { modulusLength } = key.asymmetricKeyDetails;
    if (typeof modulusLength !== 'number' || modulusLength < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
};

const checkKey = (key, alg) => {
    if (key.asymmetricKeyType !== 'rsa') {
        throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
    }
    checkKeyLength(key, alg);
};
const RSA1_5 = deprecate(() => constants.RSA_PKCS1_PADDING, 'The RSA1_5 "alg" (JWE Algorithm) is deprecated and will be removed in the next major revision.');
const resolvePadding = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            return constants.RSA_PKCS1_OAEP_PADDING;
        case 'RSA1_5':
            return RSA1_5();
        default:
            return undefined;
    }
};
const resolveOaepHash = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
            return 'sha1';
        case 'RSA-OAEP-256':
            return 'sha256';
        case 'RSA-OAEP-384':
            return 'sha384';
        case 'RSA-OAEP-512':
            return 'sha512';
        default:
            return undefined;
    }
};
function ensureKeyObject(key, alg, ...usages) {
    if (isKeyObject(key)) {
        return key;
    }
    if (isCryptoKey$1(key)) {
        checkEncCryptoKey(key, alg, ...usages);
        return KeyObject.from(key);
    }
    throw new TypeError(invalidKeyInput(key, ...types));
}
const encrypt$1 = (alg, key, cek) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = ensureKeyObject(key, alg, 'wrapKey', 'encrypt');
    checkKey(keyObject, alg);
    return publicEncrypt({ key: keyObject, oaepHash, padding }, cek);
};
const decrypt = (alg, key, encryptedKey) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = ensureKeyObject(key, alg, 'unwrapKey', 'decrypt');
    checkKey(keyObject, alg);
    return privateDecrypt({ key: keyObject, oaepHash, padding }, encryptedKey);
};

var normalize = {};

function bitLength(alg) {
    switch (alg) {
        case 'A128GCM':
            return 128;
        case 'A192GCM':
            return 192;
        case 'A256GCM':
        case 'A128CBC-HS256':
            return 256;
        case 'A192CBC-HS384':
            return 384;
        case 'A256CBC-HS512':
            return 512;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
var generateCek = (alg) => randomFillSync(new Uint8Array(bitLength(alg) >> 3));

const parse = (jwk) => {
    return (jwk.d ? createPrivateKey : createPublicKey)({ format: 'jwk', key: jwk });
};

async function importJWK(jwk, alg) {
    if (!isObject$1(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg ||= jwk.alg;
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            return decode$2(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return parse({ ...jwk, alg });
        default:
            throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

const tag = (key) => key?.[Symbol.toStringTag];
const symmetricTypeCheck = (alg, key) => {
    if (key instanceof Uint8Array)
        return;
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, ...types, 'Uint8Array'));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (alg, key, usage) => {
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, ...types));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
const checkKeyType = (alg, key, usage) => {
    const symmetric = alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(alg, key);
    }
    else {
        asymmetricTypeCheck(alg, key, usage);
    }
};

function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if (isKeyObject(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const algorithm = `aes-${keySize}-cbc`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = createCipheriv(algorithm, encKey, iv);
    const ciphertext = concat(cipher.update(plaintext), cipher.final());
    const macSize = parseInt(enc.slice(-3), 10);
    const tag = cbcTag(aad, iv, ciphertext, macSize, macKey, keySize);
    return { ciphertext, tag, iv };
}
function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = createCipheriv(algorithm, cek, iv, { authTagLength: 16 });
    if (aad.byteLength) {
        cipher.setAAD(aad, { plaintextLength: plaintext.length });
    }
    const ciphertext = cipher.update(plaintext);
    cipher.final();
    const tag = cipher.getAuthTag();
    return { ciphertext, tag, iv };
}
const encrypt = (enc, plaintext, cek, iv, aad) => {
    let key;
    if (isCryptoKey$1(cek)) {
        checkEncCryptoKey(cek, enc, 'encrypt');
        key = KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || isKeyObject(cek)) {
        key = cek;
    }
    else {
        throw new TypeError(invalidKeyInput(cek, ...types, 'Uint8Array'));
    }
    checkCekLength(enc, key);
    if (iv) {
        checkIvLength(enc, iv);
    }
    else {
        iv = generateIv(enc);
    }
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcEncrypt(enc, plaintext, key, iv, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmEncrypt(enc, plaintext, key, iv, aad);
        default:
            throw new JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};

async function wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = await encrypt(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
        encryptedKey: wrapped.ciphertext,
        iv: encode$2(wrapped.iv),
        tag: encode$2(wrapped.tag),
    };
}
async function unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt$2(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}

async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    checkKeyType(alg, key, 'decrypt');
    key = (await normalize.normalizePrivateKey?.(key, alg)) || key;
    switch (alg) {
        case 'dir': {
            if (encryptedKey !== undefined)
                throw new JWEInvalid('Encountered unexpected JWE Encrypted Key');
            return key;
        }
        case 'ECDH-ES':
            if (encryptedKey !== undefined)
                throw new JWEInvalid('Encountered unexpected JWE Encrypted Key');
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!isObject$1(joseHeader.epk))
                throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
            if (!ecdhAllowed(key))
                throw new JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            const epk = await importJWK(joseHeader.epk, alg);
            let partyUInfo;
            let partyVInfo;
            if (joseHeader.apu !== undefined) {
                if (typeof joseHeader.apu !== 'string')
                    throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                try {
                    partyUInfo = decode$2(joseHeader.apu);
                }
                catch {
                    throw new JWEInvalid('Failed to base64url decode the apu');
                }
            }
            if (joseHeader.apv !== undefined) {
                if (typeof joseHeader.apv !== 'string')
                    throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                try {
                    partyVInfo = decode$2(joseHeader.apv);
                }
                catch {
                    throw new JWEInvalid('Failed to base64url decode the apv');
                }
            }
            const sharedSecret = await deriveKey(epk, key, alg === 'ECDH-ES' ? joseHeader.enc : alg, alg === 'ECDH-ES' ? bitLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
            if (alg === 'ECDH-ES')
                return sharedSecret;
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return unwrap$1(alg.slice(-6), sharedSecret, encryptedKey);
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return decrypt(alg, key, encryptedKey);
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.p2c !== 'number')
                throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
            const p2cLimit = options?.maxPBES2Count || 10_000;
            if (joseHeader.p2c > p2cLimit)
                throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
            if (typeof joseHeader.p2s !== 'string')
                throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
            let p2s;
            try {
                p2s = decode$2(joseHeader.p2s);
            }
            catch {
                throw new JWEInvalid('Failed to base64url decode the p2s');
            }
            return decrypt$1(alg, key, encryptedKey, joseHeader.p2c, p2s);
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return unwrap$1(alg, key, encryptedKey);
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.iv !== 'string')
                throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
            if (typeof joseHeader.tag !== 'string')
                throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
            let iv;
            try {
                iv = decode$2(joseHeader.iv);
            }
            catch {
                throw new JWEInvalid('Failed to base64url decode the iv');
            }
            let tag;
            try {
                tag = decode$2(joseHeader.tag);
            }
            catch {
                throw new JWEInvalid('Failed to base64url decode the tag');
            }
            return unwrap(alg, key, encryptedKey, iv, tag);
        }
        default: {
            throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
}

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader?.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}

const validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};

async function flattenedDecrypt(jwe, key, options) {
    if (!isObject$1(jwe)) {
        throw new JWEInvalid('Flattened JWE must be an object');
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new JWEInvalid('JOSE Header missing');
    }
    if (jwe.iv !== undefined && typeof jwe.iv !== 'string') {
        throw new JWEInvalid('JWE Initialization Vector incorrect type');
    }
    if (typeof jwe.ciphertext !== 'string') {
        throw new JWEInvalid('JWE Ciphertext missing or incorrect type');
    }
    if (jwe.tag !== undefined && typeof jwe.tag !== 'string') {
        throw new JWEInvalid('JWE Authentication Tag incorrect type');
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== 'string') {
        throw new JWEInvalid('JWE Protected Header incorrect type');
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== 'string') {
        throw new JWEInvalid('JWE Encrypted Key incorrect type');
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== 'string') {
        throw new JWEInvalid('JWE AAD incorrect type');
    }
    if (jwe.header !== undefined && !isObject$1(jwe.header)) {
        throw new JWEInvalid('JWE Shared Unprotected Header incorrect type');
    }
    if (jwe.unprotected !== undefined && !isObject$1(jwe.unprotected)) {
        throw new JWEInvalid('JWE Per-Recipient Unprotected Header incorrect type');
    }
    let parsedProt;
    if (jwe.protected) {
        try {
            const protectedHeader = decode$2(jwe.protected);
            parsedProt = JSON.parse(decoder$1.decode(protectedHeader));
        }
        catch {
            throw new JWEInvalid('JWE Protected Header is invalid');
        }
    }
    if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) {
        throw new JWEInvalid('JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected,
    };
    validateCrit(JWEInvalid, new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new JWEInvalid('missing JWE Algorithm (alg) in JWE Header');
    }
    if (typeof enc !== 'string' || !enc) {
        throw new JWEInvalid('missing JWE Encryption Algorithm (enc) in JWE Header');
    }
    const keyManagementAlgorithms = options && validateAlgorithms('keyManagementAlgorithms', options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options &&
        validateAlgorithms('contentEncryptionAlgorithms', options.contentEncryptionAlgorithms);
    if ((keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) ||
        (!keyManagementAlgorithms && alg.startsWith('PBES2'))) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        try {
            encryptedKey = decode$2(jwe.encrypted_key);
        }
        catch {
            throw new JWEInvalid('Failed to base64url decode the encrypted_key');
        }
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await decryptKeyManagement(alg, key, encryptedKey, joseHeader, options);
    }
    catch (err) {
        if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
            throw err;
        }
        cek = generateCek(enc);
    }
    let iv;
    let tag;
    if (jwe.iv !== undefined) {
        try {
            iv = decode$2(jwe.iv);
        }
        catch {
            throw new JWEInvalid('Failed to base64url decode the iv');
        }
    }
    if (jwe.tag !== undefined) {
        try {
            tag = decode$2(jwe.tag);
        }
        catch {
            throw new JWEInvalid('Failed to base64url decode the tag');
        }
    }
    const protectedHeader = encoder$1.encode(jwe.protected ?? '');
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = concat(protectedHeader, encoder$1.encode('.'), encoder$1.encode(jwe.aad));
    }
    else {
        additionalData = protectedHeader;
    }
    let ciphertext;
    try {
        ciphertext = decode$2(jwe.ciphertext);
    }
    catch {
        throw new JWEInvalid('Failed to base64url decode the ciphertext');
    }
    const plaintext = await decrypt$2(enc, cek, ciphertext, iv, tag, additionalData);
    const result = { plaintext };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        try {
            result.additionalAuthenticatedData = decode$2(jwe.aad);
        }
        catch {
            throw new JWEInvalid('Failed to base64url decode the aad');
        }
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}

async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = decoder$1.decode(jwe);
    }
    if (typeof jwe !== 'string') {
        throw new JWEInvalid('Compact JWE must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length, } = jwe.split('.');
    if (length !== 5) {
        throw new JWEInvalid('Invalid Compact JWE');
    }
    const decrypted = await flattenedDecrypt({
        ciphertext,
        iv: iv || undefined,
        protected: protectedHeader,
        tag: tag || undefined,
        encrypted_key: encryptedKey || undefined,
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}

const keyToJWK = (key) => {
    let keyObject;
    if (isCryptoKey$1(key)) {
        if (!key.extractable) {
            throw new TypeError('CryptoKey is not extractable');
        }
        keyObject = KeyObject.from(key);
    }
    else if (isKeyObject(key)) {
        keyObject = key;
    }
    else if (key instanceof Uint8Array) {
        return {
            kty: 'oct',
            k: encode$2(key),
        };
    }
    else {
        throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
    }
    if (keyObject.type !== 'secret' &&
        !['rsa', 'ec', 'ed25519', 'x25519', 'ed448', 'x448'].includes(keyObject.asymmetricKeyType)) {
        throw new JOSENotSupported('Unsupported key asymmetricKeyType');
    }
    return keyObject.export({ format: 'jwk' });
};

async function exportJWK(key) {
    return keyToJWK(key);
}

async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    checkKeyType(alg, key, 'encrypt');
    key = (await normalize.normalizePublicKey?.(key, alg)) || key;
    switch (alg) {
        case 'dir': {
            cek = key;
            break;
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!ecdhAllowed(key)) {
                throw new JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            }
            const { apu, apv } = providedParameters;
            let { epk: ephemeralKey } = providedParameters;
            ephemeralKey ||= (await generateEpk(key)).privateKey;
            const { x, y, crv, kty } = await exportJWK(ephemeralKey);
            const sharedSecret = await deriveKey(key, ephemeralKey, alg === 'ECDH-ES' ? enc : alg, alg === 'ECDH-ES' ? bitLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
            parameters = { epk: { x, crv, kty } };
            if (kty === 'EC')
                parameters.epk.y = y;
            if (apu)
                parameters.apu = encode$2(apu);
            if (apv)
                parameters.apv = encode$2(apv);
            if (alg === 'ECDH-ES') {
                cek = sharedSecret;
                break;
            }
            cek = providedCek || generateCek(enc);
            const kwAlg = alg.slice(-6);
            encryptedKey = await wrap$1(kwAlg, sharedSecret, cek);
            break;
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            cek = providedCek || generateCek(enc);
            encryptedKey = await encrypt$1(alg, key, cek);
            break;
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            cek = providedCek || generateCek(enc);
            const { p2c, p2s } = providedParameters;
            ({ encryptedKey, ...parameters } = await encrypt$2(alg, key, cek, p2c, p2s));
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            cek = providedCek || generateCek(enc);
            encryptedKey = await wrap$1(alg, key, cek);
            break;
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            cek = providedCek || generateCek(enc);
            const { iv } = providedParameters;
            ({ encryptedKey, ...parameters } = await wrap(alg, key, cek, iv));
            break;
        }
        default: {
            throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
    return { cek, encryptedKey, parameters };
}

const unprotected = Symbol();
class FlattenedEncrypt {
    _plaintext;
    _protectedHeader;
    _sharedUnprotectedHeader;
    _unprotectedHeader;
    _aad;
    _cek;
    _iv;
    _keyManagementParameters;
    constructor(plaintext) {
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError('plaintext must be an instance of Uint8Array');
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new JWEInvalid('either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()');
        }
        if (!isDisjoint(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader,
        };
        validateCrit(JWEInvalid, new Map(), options?.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== 'string' || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (this._cek && (alg === 'dir' || alg === 'ECDH-ES')) {
            throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await encryptKeyManagement(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && unprotected in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    }
                    else {
                        this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
                    }
                }
                else if (!this._protectedHeader) {
                    this.setProtectedHeader(parameters);
                }
                else {
                    this._protectedHeader = { ...this._protectedHeader, ...parameters };
                }
            }
        }
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = encoder$1.encode(encode$2(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = encoder$1.encode('');
        }
        if (this._aad) {
            aadMember = encode$2(this._aad);
            additionalData = concat(protectedHeader, encoder$1.encode('.'), encoder$1.encode(aadMember));
        }
        else {
            additionalData = protectedHeader;
        }
        const { ciphertext, tag, iv } = await encrypt(enc, this._plaintext, cek, this._iv, additionalData);
        const jwe = {
            ciphertext: encode$2(ciphertext),
        };
        if (iv) {
            jwe.iv = encode$2(iv);
        }
        if (tag) {
            jwe.tag = encode$2(tag);
        }
        if (encryptedKey) {
            jwe.encrypted_key = encode$2(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = decoder$1.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}

var epoch = (date) => Math.floor(date.getTime() / 1000);

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs = (str) => {
    const matched = REGEX.exec(str);
    if (!matched || (matched[4] && matched[1])) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            numericDate = Math.round(value);
            break;
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            numericDate = Math.round(value * minute);
            break;
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            numericDate = Math.round(value * hour);
            break;
        case 'day':
        case 'days':
        case 'd':
            numericDate = Math.round(value * day);
            break;
        case 'week':
        case 'weeks':
        case 'w':
            numericDate = Math.round(value * week);
            break;
        default:
            numericDate = Math.round(value * year);
            break;
    }
    if (matched[1] === '-' || matched[4] === 'ago') {
        return -numericDate;
    }
    return numericDate;
};

const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
var jwtPayload = (protectedHeader, encodedPayload, options = {}) => {
    let payload;
    try {
        payload = JSON.parse(decoder$1.decode(encodedPayload));
    }
    catch {
    }
    if (!isObject$1(payload)) {
        throw new JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, 'typ', 'check_failed');
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [...requiredClaims];
    if (maxTokenAge !== undefined)
        presenceCheck.push('iat');
    if (audience !== undefined)
        presenceCheck.push('aud');
    if (subject !== undefined)
        presenceCheck.push('sub');
    if (issuer !== undefined)
        presenceCheck.push('iss');
    for (const claim of new Set(presenceCheck.reverse())) {
        if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, 'missing');
        }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, 'iss', 'check_failed');
    }
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, 'sub', 'check_failed');
    }
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = secs(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== 'number') {
        throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, 'iat', 'invalid');
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', payload, 'exp', 'check_failed');
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === 'number' ? maxTokenAge : secs(maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, 'iat', 'check_failed');
        }
    }
    return payload;
};

async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = jwtPayload(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', payload, 'iss', 'mismatch');
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', payload, 'sub', 'mismatch');
    }
    if (protectedHeader.aud !== undefined &&
        JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', payload, 'aud', 'mismatch');
    }
    const result = { payload, protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}

class CompactEncrypt {
    _flattened;
    constructor(plaintext) {
        this._flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join('.');
    }
}

function validateInput(label, input) {
    if (!Number.isFinite(input)) {
        throw new TypeError(`Invalid ${label} input`);
    }
    return input;
}
class ProduceJWT {
    _payload;
    constructor(payload = {}) {
        if (!isObject$1(payload)) {
            throw new TypeError('JWT Claims Set MUST be an object');
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = { ...this._payload, iss: issuer };
        return this;
    }
    setSubject(subject) {
        this._payload = { ...this._payload, sub: subject };
        return this;
    }
    setAudience(audience) {
        this._payload = { ...this._payload, aud: audience };
        return this;
    }
    setJti(jwtId) {
        this._payload = { ...this._payload, jti: jwtId };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, nbf: validateInput('setNotBefore', input) };
        }
        else if (input instanceof Date) {
            this._payload = { ...this._payload, nbf: validateInput('setNotBefore', epoch(input)) };
        }
        else {
            this._payload = { ...this._payload, nbf: epoch(new Date()) + secs(input) };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, exp: validateInput('setExpirationTime', input) };
        }
        else if (input instanceof Date) {
            this._payload = { ...this._payload, exp: validateInput('setExpirationTime', epoch(input)) };
        }
        else {
            this._payload = { ...this._payload, exp: epoch(new Date()) + secs(input) };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === 'undefined') {
            this._payload = { ...this._payload, iat: epoch(new Date()) };
        }
        else if (input instanceof Date) {
            this._payload = { ...this._payload, iat: validateInput('setIssuedAt', epoch(input)) };
        }
        else if (typeof input === 'string') {
            this._payload = {
                ...this._payload,
                iat: validateInput('setIssuedAt', epoch(new Date()) + secs(input)),
            };
        }
        else {
            this._payload = { ...this._payload, iat: validateInput('setIssuedAt', input) };
        }
        return this;
    }
}

class EncryptJWT extends ProduceJWT {
    _cek;
    _iv;
    _keyManagementParameters;
    _protectedHeader;
    _replicateIssuerAsHeader;
    _replicateSubjectAsHeader;
    _replicateAudienceAsHeader;
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new CompactEncrypt(encoder$1.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}

const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm) {
    if (!isObject$1(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    digestAlgorithm ??= 'sha256';
    if (digestAlgorithm !== 'sha256' &&
        digestAlgorithm !== 'sha384' &&
        digestAlgorithm !== 'sha512') {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = { k: jwk.k, kty: jwk.kty };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder$1.encode(JSON.stringify(components));
    return encode$2(await digest(digestAlgorithm, data));
}

const encode$1 = encode$2;
const decode$1 = decode$2;

/**
 *
 *
 * This module contains functions and types
 * to encode and decode {@link https://authjs.dev/concepts/session-strategies#jwt-session JWT}s
 * issued and used by Auth.js.
 *
 * The JWT issued by Auth.js is _encrypted by default_, using the _A256CBC-HS512_ algorithm ({@link https://www.rfc-editor.org/rfc/rfc7518.html#section-5.2.5 JWE}).
 * It uses the `AUTH_SECRET` environment variable or the passed `secret` propery to derive a suitable encryption key.
 *
 * :::info Note
 * Auth.js JWTs are meant to be used by the same app that issued them.
 * If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
 * :::
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * You can then import this submodule from `@auth/core/jwt`.
 *
 * ## Usage
 *
 * :::warning Warning
 * This module *will* be refactored/changed. We do not recommend relying on it right now.
 * :::
 *
 *
 * ## Resources
 *
 * - [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt-session)
 * - [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
 *
 * @module jwt
 */
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const now = () => (Date.now() / 1000) | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
/** Issues a JWT. By default, the JWT is encrypted using "A256CBC-HS512". */
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [secret];
    const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
    const thumbprint = await calculateJwkThumbprint({ kty: "oct", k: encode$1(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
    // @ts-expect-error `jose` allows any object as payload.
    return await new EncryptJWT(token)
        .setProtectedHeader({ alg, enc, kid: thumbprint })
        .setIssuedAt()
        .setExpirationTime(now() + maxAge)
        .setJti(crypto.randomUUID())
        .encrypt(encryptionSecret);
}
/** Decodes a Auth.js issued JWT. */
async function decode(params) {
    const { token, secret, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [secret];
    if (!token)
        return null;
    const { payload } = await jwtDecrypt(token, async ({ kid, enc }) => {
        for (const secret of secrets) {
            const encryptionSecret = await getDerivedEncryptionKey(enc, secret, salt);
            if (kid === undefined)
                return encryptionSecret;
            const thumbprint = await calculateJwkThumbprint({ kty: "oct", k: encode$1(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
            if (kid === thumbprint)
                return encryptionSecret;
        }
        throw new Error("no matching decryption secret");
    }, {
        clockTolerance: 15,
        keyManagementAlgorithms: [alg],
        contentEncryptionAlgorithms: [enc, "A256GCM"],
    });
    return payload;
}
async function getDerivedEncryptionKey(enc, keyMaterial, salt) {
    let length;
    switch (enc) {
        case "A256CBC-HS512":
            length = 64;
            break;
        case "A256GCM":
            length = 32;
            break;
        default:
            throw new Error("Unsupported JWT Content Encryption Algorithm");
    }
    return await hkdf("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, length);
}

/**
 * Get callback URL based on query param / cookie + validation,
 * and add it to `req.options.callbackUrl`.
 */
async function createCallbackUrl({ options, paramValue, cookieValue, }) {
    const { url, callbacks } = options;
    let callbackUrl = url.origin;
    if (paramValue) {
        // If callbackUrl form field or query parameter is passed try to use it if allowed
        callbackUrl = await callbacks.redirect({
            url: paramValue,
            baseUrl: url.origin,
        });
    }
    else if (cookieValue) {
        // If no callbackUrl specified, try using the value from the cookie if allowed
        callbackUrl = await callbacks.redirect({
            url: cookieValue,
            baseUrl: url.origin,
        });
    }
    return {
        callbackUrl,
        // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
        callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined,
    };
}

const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";
const reset = "\x1b[0m";
const logger = {
    error(error) {
        const name = error instanceof AuthError ? error.type : error.name;
        console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
        if (error.cause &&
            typeof error.cause === "object" &&
            "err" in error.cause &&
            error.cause.err instanceof Error) {
            const { err, ...data } = error.cause;
            console.error(`${red}[auth][cause]${reset}:`, err.stack);
            if (data)
                console.error(`${red}[auth][details]${reset}:`, JSON.stringify(data, null, 2));
        }
        else if (error.stack) {
            console.error(error.stack.replace(/.*/, "").substring(1));
        }
    },
    warn(code) {
        const url = `https://warnings.authjs.dev#${code}`;
        console.warn(`${yellow}[auth][warn][${code}]${reset}`, `Read more: ${url}`);
    },
    debug(message, metadata) {
        console.log(`${grey}[auth][debug]:${reset} ${message}`, JSON.stringify(metadata, null, 2));
    },
};
/**
 * Override the built-in logger with user's implementation.
 * Any `undefined` level will use the default logger.
 */
function setLogger(newLogger = {}, debug) {
    // Turn off debug logging if `debug` isn't set to `true`
    if (!debug)
        logger.debug = () => { };
    if (newLogger.error)
        logger.error = newLogger.error;
    if (newLogger.warn)
        logger.warn = newLogger.warn;
    if (newLogger.debug)
        logger.debug = newLogger.debug;
}

const actions = [
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error",
    "webauthn-options",
];
function isAuthAction(action) {
    return actions.includes(action);
}

async function getBody(req) {
    if (!("body" in req) || !req.body || req.method !== "POST")
        return;
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return await req.json();
    }
    else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(await req.text());
        return Object.fromEntries(params);
    }
}
async function toInternalRequest(req, config) {
    try {
        if (req.method !== "GET" && req.method !== "POST")
            throw new UnknownAction("Only GET and POST requests are supported");
        // Defaults are usually set in the `init` function, but this is needed below
        config.basePath ?? (config.basePath = "/auth");
        const url = new URL(req.url);
        const { action, providerId } = parseActionAndProviderId(url.pathname, config.basePath);
        return {
            url,
            action,
            providerId,
            method: req.method,
            headers: Object.fromEntries(req.headers),
            body: req.body ? await getBody(req) : undefined,
            cookies: cookieExports.parse(req.headers.get("cookie") ?? "") ?? {},
            error: url.searchParams.get("error") ?? undefined,
            query: Object.fromEntries(url.searchParams),
        };
    }
    catch (e) {
        logger.error(e);
        logger.debug("request", req);
    }
}
function toRequest(request) {
    return new Request(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.method === "POST"
            ? JSON.stringify(request.body ?? {})
            : undefined,
    });
}
function toResponse(res) {
    const headers = new Headers(res.headers);
    res.cookies?.forEach((cookie) => {
        const { name, value, options } = cookie;
        const cookieHeader = cookieExports.serialize(name, value, options);
        if (headers.has("Set-Cookie"))
            headers.append("Set-Cookie", cookieHeader);
        else
            headers.set("Set-Cookie", cookieHeader);
    });
    let body = res.body;
    if (headers.get("content-type") === "application/json")
        body = JSON.stringify(res.body);
    else if (headers.get("content-type") === "application/x-www-form-urlencoded")
        body = new URLSearchParams(res.body).toString();
    const status = res.redirect ? 302 : res.status ?? 200;
    const response = new Response(body, { headers, status });
    if (res.redirect)
        response.headers.set("Location", res.redirect);
    return response;
}
/** Web compatible method to create a hash, using SHA256 */
async function createHash(message) {
    const data = new TextEncoder().encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toString();
}
/** Web compatible method to create a random string of a given length */
function randomString(size) {
    const i2hex = (i) => ("0" + i.toString(16)).slice(-2);
    const r = (a, i) => a + i2hex(i);
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    return Array.from(bytes).reduce(r, "");
}
/** @internal Parse the action and provider id from a URL pathname. */
function parseActionAndProviderId(pathname, base) {
    const a = pathname.match(new RegExp(`^${base}(.+)`));
    if (a === null)
        throw new UnknownAction(`Cannot parse action at ${pathname}`);
    const actionAndProviderId = a.at(-1);
    const b = actionAndProviderId.replace(/^\//, "").split("/").filter(Boolean);
    if (b.length !== 1 && b.length !== 2)
        throw new UnknownAction(`Cannot parse action at ${pathname}`);
    const [action, providerId] = b;
    if (!isAuthAction(action))
        throw new UnknownAction(`Cannot parse action at ${pathname}`);
    if (providerId &&
        !["signin", "callback", "webauthn-options"].includes(action))
        throw new UnknownAction(`Cannot parse action at ${pathname}`);
    return { action, providerId };
}

/**
 * Ensure CSRF Token cookie is set for any subsequent requests.
 * Used as part of the strategy for mitigation for CSRF tokens.
 *
 * Creates a cookie like 'next-auth.csrf-token' with the value 'token|hash',
 * where 'token' is the CSRF token and 'hash' is a hash made of the token and
 * the secret, and the two values are joined by a pipe '|'. By storing the
 * value and the hash of the value (with the secret used as a salt) we can
 * verify the cookie was set by the server and not by a malicious attacker.
 *
 * For more details, see the following OWASP links:
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
 * https://owasp.org/www-chapter-london/assets/slides/David_Johansson-Double_Defeat_of_Double-Submit_Cookie.pdf
 */
async function createCSRFToken({ options, cookieValue, isPost, bodyValue, }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
        if (csrfTokenHash === expectedCsrfTokenHash) {
            // If hash matches then we trust the CSRF token value
            // If this is a POST request and the CSRF Token in the POST request matches
            // the cookie we have already verified is the one we have set, then the token is verified!
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return { csrfTokenVerified, csrfToken };
        }
    }
    // New CSRF token
    const csrfToken = randomString(32);
    const csrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return { cookie, csrfToken };
}
function validateCSRF(action, verified) {
    if (verified)
        return;
    throw new MissingCSRF(`CSRF token was missing during an action ${action}`);
}

// Source: https://stackoverflow.com/a/34749873/5364135
/** Simple object check */
function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}
/** Deep merge two objects */
function merge(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return merge(target, ...sources);
}

/**
 * Adds `signinUrl` and `callbackUrl` to each provider
 * and deep merge user-defined options.
 */
function parseProviders(params) {
    const { providerId, options } = params;
    const url = new URL(options.basePath ?? "/auth", params.url.origin);
    const providers = params.providers.map((p) => {
        const provider = typeof p === "function" ? p() : p;
        const { options: userOptions, ...defaults } = provider;
        const id = (userOptions?.id ?? defaults.id);
        // TODO: Support if properties have different types, e.g. authorization: string or object
        const merged = merge(defaults, userOptions, {
            signinUrl: `${url}/signin/${id}`,
            callbackUrl: `${url}/callback/${id}`,
        });
        if (provider.type === "oauth" || provider.type === "oidc") {
            merged.redirectProxyUrl ?? (merged.redirectProxyUrl = options.redirectProxyUrl);
            return normalizeOAuth(merged);
        }
        return merged;
    });
    return {
        providers,
        provider: providers.find(({ id }) => id === providerId),
    };
}
// TODO: Also add discovery here, if some endpoints/config are missing.
// We should return both a client and authorization server config.
function normalizeOAuth(c) {
    if (c.issuer)
        c.wellKnown ?? (c.wellKnown = `${c.issuer}/.well-known/openid-configuration`);
    const authorization = normalizeEndpoint(c.authorization, c.issuer);
    if (authorization && !authorization.url?.searchParams.has("scope")) {
        authorization.url.searchParams.set("scope", "openid profile email");
    }
    const token = normalizeEndpoint(c.token, c.issuer);
    const userinfo = normalizeEndpoint(c.userinfo, c.issuer);
    const checks = c.checks ?? ["pkce"];
    if (c.redirectProxyUrl) {
        if (!checks.includes("state"))
            checks.push("state");
        c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
    }
    return {
        ...c,
        authorization,
        token,
        checks,
        userinfo,
        profile: c.profile ?? defaultProfile,
        account: c.account ?? defaultAccount,
    };
}
/**
 * Returns basic user profile from the userinfo response/`id_token` claims.
 * The returned `id` will become the `account.providerAccountId`. `user.id`
 * and `account.id` are auto-generated UUID's.
 *
 * The result if this function is used to create the `User` in the database.
 * @see https://authjs.dev/reference/core/adapters#user
 * @see https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * @see https://openid.net/specs/openid-connect-core-1_0.html#
 */
const defaultProfile = (profile) => {
    return stripUndefined({
        id: profile.sub ?? profile.id ?? crypto.randomUUID(),
        name: profile.name ?? profile.nickname ?? profile.preferred_username,
        email: profile.email,
        image: profile.picture,
    });
};
/**
 * Returns basic OAuth/OIDC values from the token response.
 * @see https://www.ietf.org/rfc/rfc6749.html#section-5.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 * @see https://authjs.dev/reference/core/adapters#account
 */
const defaultAccount = (account) => {
    return stripUndefined({
        access_token: account.access_token,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        session_state: account.session_state,
    });
};
function stripUndefined(o) {
    const result = {};
    for (let [k, v] of Object.entries(o))
        v !== undefined && (result[k] = v);
    return result;
}
function normalizeEndpoint(e, issuer) {
    if (!e && issuer)
        return;
    if (typeof e === "string") {
        return { url: new URL(e) };
    }
    // If e.url is undefined, it's because the provider config
    // assumes that we will use the issuer endpoint.
    // The existence of either e.url or provider.issuer is checked in
    // assert.ts. We fallback to "https://authjs.dev" to be able to pass around
    // a valid URL even if the user only provided params.
    // NOTE: This need to be checked when constructing the URL
    // for the authorization, token and userinfo endpoints.
    const url = new URL(e?.url ?? "https://authjs.dev");
    if (e?.params != null) {
        for (let [key, value] of Object.entries(e.params)) {
            if (key === "claims")
                value = JSON.stringify(value);
            url.searchParams.set(key, String(value));
        }
    }
    return {
        url,
        request: e?.request,
        conform: e?.conform,
        ...(e?.clientPrivateKey ? { clientPrivateKey: e?.clientPrivateKey } : null),
    };
}
function isOIDCProvider(provider) {
    return provider.type === "oidc";
}

const defaultCallbacks = {
    signIn() {
        return true;
    },
    redirect({ url, baseUrl }) {
        if (url.startsWith("/"))
            return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl)
            return url;
        return baseUrl;
    },
    session({ session }) {
        return {
            user: {
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image,
            },
            expires: session.expires?.toISOString?.() ?? session.expires,
        };
    },
    jwt({ token }) {
        return token;
    },
};
/** Initialize all internal options and cookies. */
async function init({ authOptions, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost, }) {
    const { providers, provider } = parseProviders({
        providers: authOptions.providers,
        url,
        providerId,
        options: authOptions,
    });
    const maxAge = 30 * 24 * 60 * 60; // Sessions expire after 30 days of being idle by default
    let isOnRedirectProxy = false;
    if ((provider?.type === "oauth" || provider?.type === "oidc") &&
        provider.redirectProxyUrl) {
        try {
            isOnRedirectProxy =
                new URL(provider.redirectProxyUrl).origin === url.origin;
        }
        catch {
            throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
        }
    }
    // User provided options are overridden by other options,
    // except for the options with special handling above
    const options = {
        debug: false,
        pages: {},
        theme: {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: "",
        },
        // Custom options override defaults
        ...authOptions,
        // These computed settings can have values in userOptions but we override them
        // and are request-specific.
        url,
        action,
        // @ts-expect-errors
        provider,
        cookies: merge(defaultCookies(authOptions.useSecureCookies ?? url.protocol === "https:"), authOptions.cookies),
        providers,
        // Session options
        session: {
            // If no adapter specified, force use of JSON Web Tokens (stateless)
            strategy: authOptions.adapter ? "database" : "jwt",
            maxAge,
            updateAge: 24 * 60 * 60,
            generateSessionToken: () => crypto.randomUUID(),
            ...authOptions.session,
        },
        // JWT options
        jwt: {
            secret: authOptions.secret, // Asserted in assert.ts
            maxAge: authOptions.session?.maxAge ?? maxAge, // default to same as `session.maxAge`
            encode: encode,
            decode: decode,
            ...authOptions.jwt,
        },
        // Event messages
        events: eventsErrorHandler(authOptions.events ?? {}, logger),
        adapter: adapterErrorHandler(authOptions.adapter, logger),
        // Callback functions
        callbacks: { ...defaultCallbacks, ...authOptions.callbacks },
        logger,
        callbackUrl: url.origin,
        isOnRedirectProxy,
        experimental: {
            ...authOptions.experimental,
        },
    };
    // Init cookies
    const cookies = [];
    if (csrfDisabled) {
        options.csrfTokenVerified = true;
    }
    else {
        const { csrfToken, cookie: csrfCookie, csrfTokenVerified, } = await createCSRFToken({
            options,
            cookieValue: reqCookies?.[options.cookies.csrfToken.name],
            isPost,
            bodyValue: reqCsrfToken,
        });
        options.csrfToken = csrfToken;
        options.csrfTokenVerified = csrfTokenVerified;
        if (csrfCookie) {
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: csrfCookie,
                options: options.cookies.csrfToken.options,
            });
        }
    }
    const { callbackUrl, callbackUrlCookie } = await createCallbackUrl({
        options,
        cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
        paramValue: reqCallbackUrl,
    });
    options.callbackUrl = callbackUrl;
    if (callbackUrlCookie) {
        cookies.push({
            name: options.cookies.callbackUrl.name,
            value: callbackUrlCookie,
            options: options.cookies.callbackUrl.options,
        });
    }
    return { options, cookies };
}
/** Wraps an object of methods and adds error handling. */
function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce((acc, name) => {
        acc[name] = async (...args) => {
            try {
                const method = methods[name];
                return await method(...args);
            }
            catch (e) {
                logger.error(new EventError(e));
            }
        };
        return acc;
    }, {});
}
/** Handles adapter induced errors. */
function adapterErrorHandler(adapter, logger) {
    if (!adapter)
        return;
    return Object.keys(adapter).reduce((acc, name) => {
        acc[name] = async (...args) => {
            try {
                logger.debug(`adapter_${name}`, { args });
                const method = adapter[name];
                return await method(...args);
            }
            catch (e) {
                const error = new AdapterError(e);
                logger.error(error);
                throw error;
            }
        };
        return acc;
    }, {});
}

var l$1;function p$1(n){return n.children}l$1={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l;}throw n}};

var r=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,n=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,o$1=/[\s\n\\/='"\0<>]/,i=/^xlink:?./,a=/["&<]/;function l(e){if(!1===a.test(e+=""))return e;for(var t=0,r=0,n="",o="";r<e.length;r++){switch(e.charCodeAt(r)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;default:continue}r!==t&&(n+=e.slice(t,r)),n+=o,t=r+1;}return r!==t&&(n+=e.slice(t,r)),n}var s=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},f=function(e,t,r){return String(e).length>(40)||-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},c={},u=/([A-Z])/g;function p(e){var t="";for(var n in e){var o=e[n];null!=o&&""!==o&&(t&&(t+=" "),t+="-"==n[0]?n:c[n]||(c[n]=n.replace(u,"-$1").toLowerCase()),t="number"==typeof o&&!1===r.test(n)?t+": "+o+"px;":t+": "+o+";");}return t||void 0}function _$1(e,t){return Array.isArray(t)?t.reduce(_$1,e):null!=t&&!1!==t&&e.push(t),e}function d(){this.__d=!0;}function v(e,t){return {__v:e,context:t,props:e.props,setState:d,forceUpdate:d,__d:!0,__h:[]}}function h(e,t){var r=e.contextType,n=r&&t[r.__c];return null!=r?n?n.props.value:r.__:t}var g=[];function y(r,a,c,u,d,m){if(null==r||"boolean"==typeof r)return "";if("object"!=typeof r)return l(r);var b=c.pretty,x=b&&"string"==typeof b?b:"\t";if(Array.isArray(r)){for(var k="",S=0;S<r.length;S++)b&&S>0&&(k+="\n"),k+=y(r[S],a,c,u,d,m);return k}var w,C=r.type,O=r.props,j=!1;if("function"==typeof C){if(j=!0,!c.shallow||!u&&!1!==c.renderRootComponent){if(C===p$1){var A=[];return _$1(A,r.props.children),y(A,a,c,!1!==c.shallowHighOrder,d,m)}var F,H=r.__c=v(r,a);l$1.__b&&l$1.__b(r);var M=l$1.__r;if(C.prototype&&"function"==typeof C.prototype.render){var L=h(C,a);(H=r.__c=new C(O,L)).__v=r,H._dirty=H.__d=!0,H.props=O,null==H.state&&(H.state={}),null==H._nextState&&null==H.__s&&(H._nextState=H.__s=H.state),H.context=L,C.getDerivedStateFromProps?H.state=Object.assign({},H.state,C.getDerivedStateFromProps(H.props,H.state)):H.componentWillMount&&(H.componentWillMount(),H.state=H._nextState!==H.state?H._nextState:H.__s!==H.state?H.__s:H.state),M&&M(r),F=H.render(H.props,H.state,H.context);}else for(var T=h(C,a),E=0;H.__d&&E++<25;)H.__d=!1,M&&M(r),F=C.call(r.__c,O,T);return H.getChildContext&&(a=Object.assign({},a,H.getChildContext())),l$1.diffed&&l$1.diffed(r),y(F,a,c,!1!==c.shallowHighOrder,d,m)}C=(w=C).displayName||w!==Function&&w.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=g.length;n--;)if(g[n]===e){r=n;break}r<0&&(r=g.push(e)-1),t="UnnamedComponent"+r;}return t}(w);}var $,D,N="<"+C;if(O){var P=Object.keys(O);c&&!0===c.sortAttributes&&P.sort();for(var W=0;W<P.length;W++){var I=P[W],R=O[I];if("children"!==I){if(!o$1.test(I)&&(c&&c.allAttributes||"key"!==I&&"ref"!==I&&"__self"!==I&&"__source"!==I)){if("defaultValue"===I)I="value";else if("defaultChecked"===I)I="checked";else if("defaultSelected"===I)I="selected";else if("className"===I){if(void 0!==O.class)continue;I="class";}else d&&i.test(I)&&(I=I.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===I){if(O.for)continue;I="for";}"style"===I&&R&&"object"==typeof R&&(R=p(R)),"a"===I[0]&&"r"===I[1]&&"boolean"==typeof R&&(R=String(R));var U=c.attributeHook&&c.attributeHook(I,R,a,c,j);if(U||""===U)N+=U;else if("dangerouslySetInnerHTML"===I)D=R&&R.__html;else if("textarea"===C&&"value"===I)$=R;else if((R||0===R||""===R)&&"function"!=typeof R){if(!(!0!==R&&""!==R||(R=I,c&&c.xml))){N=N+" "+I;continue}if("value"===I){if("select"===C){m=R;continue}"option"===C&&m==R&&void 0===O.selected&&(N+=" selected");}N=N+" "+I+'="'+l(R)+'"';}}}else $=R;}}if(b){var V=N.replace(/\n\s*/," ");V===N||~V.indexOf("\n")?b&&~N.indexOf("\n")&&(N+="\n"):N=V;}if(N+=">",o$1.test(C))throw new Error(C+" is not a valid HTML tag name in "+N);var q,z=n.test(C)||c.voidElements&&c.voidElements.test(C),Z=[];if(D)b&&f(D)&&(D="\n"+x+s(D,x)),N+=D;else if(null!=$&&_$1(q=[],$).length){for(var B=b&&~N.indexOf("\n"),G=!1,J=0;J<q.length;J++){var K=q[J];if(null!=K&&!1!==K){var Q=y(K,a,c,!0,"svg"===C||"foreignObject"!==C&&d,m);if(b&&!B&&f(Q)&&(B=!0),Q)if(b){var X=Q.length>0&&"<"!=Q[0];G&&X?Z[Z.length-1]+=Q:Z.push(Q),G=X;}else Z.push(Q);}}if(b&&B)for(var Y=Z.length;Y--;)Z[Y]="\n"+x+s(Z[Y],x);}if(Z.length||D)N+=Z.join("");else if(c&&c.xml)return N.substring(0,N.length-1)+" />";return !z||q||D?(b&&~N.indexOf("\n")&&(N+="\n"),N=N+"</"+C+">"):N=N.replace(/>$/," />"),N}var m={shallow:!0};k.render=k;var b=function(e,t){return k(e,t,m)},x=[];function k(e,r,n){r=r||{};var o,i=l$1.__s;return l$1.__s=!0,o=n&&(n.pretty||n.voidElements||n.sortAttributes||n.shallow||n.allAttributes||n.xml||n.attributeHook)?y(e,r,n):j(e,r,!1,void 0),l$1.__c&&l$1.__c(e,x),l$1.__s=i,x.length=0,o}function S(e,t){return "className"===e?"class":"htmlFor"===e?"for":"defaultValue"===e?"value":"defaultChecked"===e?"checked":"defaultSelected"===e?"selected":t&&i.test(e)?e.toLowerCase().replace(/^xlink:?/,"xlink:"):e}function w(e,t){return "style"===e&&null!=t&&"object"==typeof t?p(t):"a"===e[0]&&"r"===e[1]&&"boolean"==typeof t?String(t):t}var C=Array.isArray,O=Object.assign;function j(r,i,a,s){if(null==r||!0===r||!1===r||""===r)return "";if("object"!=typeof r)return l(r);if(C(r)){for(var f="",c=0;c<r.length;c++)f+=j(r[c],i,a,s);return f}l$1.__b&&l$1.__b(r);var u=r.type,p=r.props;if("function"==typeof u){if(u===p$1)return j(r.props.children,i,a,s);var _;_=u.prototype&&"function"==typeof u.prototype.render?function(e,r){var n=e.type,o=h(n,r),i=new n(e.props,o);e.__c=i,i.__v=e,i.__d=!0,i.props=e.props,null==i.state&&(i.state={}),null==i.__s&&(i.__s=i.state),i.context=o,n.getDerivedStateFromProps?i.state=O({},i.state,n.getDerivedStateFromProps(i.props,i.state)):i.componentWillMount&&(i.componentWillMount(),i.state=i.__s!==i.state?i.__s:i.state);var a=l$1.__r;return a&&a(e),i.render(i.props,i.state,i.context)}(r,i):function(e,r){var n,o=v(e,r),i=h(e.type,r);e.__c=o;for(var a=l$1.__r,l=0;o.__d&&l++<25;)o.__d=!1,a&&a(e),n=e.type.call(o,e.props,i);return n}(r,i);var d=r.__c;d.getChildContext&&(i=O({},i,d.getChildContext()));var g=j(_,i,a,s);return l$1.diffed&&l$1.diffed(r),g}var y,m,b="<";if(b+=u,p)for(var x in y=p.children,p){var k=p[x];if(!("key"===x||"ref"===x||"__self"===x||"__source"===x||"children"===x||"className"===x&&"class"in p||"htmlFor"===x&&"for"in p||o$1.test(x)))if(k=w(x=S(x,a),k),"dangerouslySetInnerHTML"===x)m=k&&k.__html;else if("textarea"===u&&"value"===x)y=k;else if((k||0===k||""===k)&&"function"!=typeof k){if(!0===k||""===k){k=x,b=b+" "+x;continue}if("value"===x){if("select"===u){s=k;continue}"option"!==u||s!=k||"selected"in p||(b+=" selected");}b=b+" "+x+'="'+l(k)+'"';}}var A=b;if(b+=">",o$1.test(u))throw new Error(u+" is not a valid HTML tag name in "+b);var F="",H=!1;if(m)F+=m,H=!0;else if("string"==typeof y)F+=l(y),H=!0;else if(C(y))for(var M=0;M<y.length;M++){var L=y[M];if(null!=L&&!1!==L){var T=j(L,i,"svg"===u||"foreignObject"!==u&&a,s);T&&(F+=T,H=!0);}}else if(null!=y&&!1!==y&&!0!==y){var E=j(y,i,"svg"===u||"foreignObject"!==u&&a,s);E&&(F+=E,H=!0);}if(l$1.diffed&&l$1.diffed(r),H)b+=F;else if(n.test(u))return A+" />";return b+"</"+u+">"}k.shallowRender=b;

var _=0;function o(o,e,n,t,f){var l,s,u={};for(s in e)"ref"==s?l=e[s]:u[s]=e[s];var a={type:o,props:u,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--_,__source:f,__self:t};if("function"==typeof o&&(l=o.defaultProps))for(s in l)void 0===u[s]&&(u[s]=l[s]);return l$1.vnode&&l$1.vnode(a),a}

/** Renders an error page. */
function ErrorPage(props) {
    const { url, error = "default", theme } = props;
    const signinPageUrl = `${url}/signin`;
    const errors = {
        default: {
            status: 200,
            heading: "Error",
            message: (o("p", { children: o("a", { className: "site", href: url?.origin, children: url?.host }) })),
        },
        Configuration: {
            status: 500,
            heading: "Server error",
            message: (o("div", { children: [o("p", { children: "There is a problem with the server configuration." }), o("p", { children: "Check the server logs for more information." })] })),
        },
        AccessDenied: {
            status: 403,
            heading: "Access Denied",
            message: (o("div", { children: [o("p", { children: "You do not have permission to sign in." }), o("p", { children: o("a", { className: "button", href: signinPageUrl, children: "Sign in" }) })] })),
        },
        Verification: {
            status: 403,
            heading: "Unable to sign in",
            message: (o("div", { children: [o("p", { children: "The sign in link is no longer valid." }), o("p", { children: "It may have been used already or it may have expired." })] })),
            signin: (o("a", { className: "button", href: signinPageUrl, children: "Sign in" })),
        },
    };
    const { status, heading, message, signin } = errors[error] ?? errors.default;
    return {
        status,
        html: (o("div", { className: "error", children: [theme?.brandColor && (o("style", { dangerouslySetInnerHTML: {
                        __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `,
                    } })), o("div", { className: "card", children: [theme?.logo && o("img", { src: theme?.logo, alt: "Logo", className: "logo" }), o("h1", { children: heading }), o("div", { className: "message", children: message }), signin] })] })),
    };
}

//@ts-check
// Declare a SimpleWebAuthnBrowser variable as part of "window"
/** @typedef {"authenticate"} WebAuthnAuthenticate */
/** @typedef {"register"} WebAuthnRegister */
/** @typedef {WebAuthnRegister | WebAuthnAuthenticate} WebAuthnOptionsAction */
/**
 * @template {WebAuthnOptionsAction} T
 * @typedef {T extends WebAuthnAuthenticate ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialRequestOptionsJSON; action: "authenticate" } :
 *  T extends WebAuthnRegister ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialCreationOptionsJSON; action: "register" } :
 * never
 * } WebAuthnOptionsReturn
 */
/**
 * webauthnScript is the client-side script that handles the webauthn form
 *
 * @param {string} authURL is the URL of the auth API
 * @param {string} providerID is the ID of the webauthn provider
 */
async function webauthnScript(authURL, providerID) {
    /** @type {typeof import("@simplewebauthn/browser")} */
    // @ts-ignore
    const WebAuthnBrowser = window.SimpleWebAuthnBrowser;
    /**
     * Fetch webauthn options from the server
     *
     * @template {WebAuthnOptionsAction} T
     * @param {T | undefined} action action to fetch options for
     * @returns {Promise<WebAuthnOptionsReturn<T> | undefined>}
     */
    async function fetchOptions(action) {
        // Create the options URL with the action and query parameters
        const url = new URL(`${authURL}/webauthn-options/${providerID}`);
        if (action)
            url.searchParams.append("action", action);
        const formFields = getFormFields();
        formFields.forEach((field) => {
            url.searchParams.append(field.name, field.value);
        });
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Failed to fetch options", res);
            return;
        }
        return res.json();
    }
    /**
     * Get the webauthn form from the page
     *
     * @returns {HTMLFormElement}
     */
    function getForm() {
        const formID = `#${providerID}-form`;
        /** @type {HTMLFormElement | null} */
        const form = document.querySelector(formID);
        if (!form)
            throw new Error(`Form '${formID}' not found`);
        return form;
    }
    /**
     * Get formFields from the form
     *
     * @returns {HTMLInputElement[]}
     */
    function getFormFields() {
        const form = getForm();
        /** @type {HTMLInputElement[]} */
        const formFields = Array.from(form.querySelectorAll("input[data-form-field]"));
        return formFields;
    }
    /**
     * Passkey form submission handler.
     * Takes the input from the form and a few other parameters and submits it to the server.
     *
     * @param {WebAuthnOptionsAction} action action to submit
     * @param {unknown | undefined} data optional data to submit
     * @returns {Promise<void>}
     */
    async function submitForm(action, data) {
        const form = getForm();
        // If a POST request, create hidden fields in the form
        // and submit it so the browser redirects on login
        if (action) {
            const actionInput = document.createElement("input");
            actionInput.type = "hidden";
            actionInput.name = "action";
            actionInput.value = action;
            form.appendChild(actionInput);
        }
        if (data) {
            const dataInput = document.createElement("input");
            dataInput.type = "hidden";
            dataInput.name = "data";
            dataInput.value = JSON.stringify(data);
            form.appendChild(dataInput);
        }
        return form.submit();
    }
    /**
     * Executes the authentication flow by fetching options from the server,
     * starting the authentication, and submitting the response to the server.
     *
     * @param {WebAuthnOptionsReturn<WebAuthnAuthenticate>['options']} options
     * @param {boolean} autofill Whether or not to use the browser's autofill
     * @returns {Promise<void>}
     */
    async function authenticationFlow(options, autofill) {
        // Start authentication
        const authResp = await WebAuthnBrowser.startAuthentication(options, autofill);
        // Submit authentication response to server
        return await submitForm("authenticate", authResp);
    }
    /**
     * @param {WebAuthnOptionsReturn<WebAuthnRegister>['options']} options
     */
    async function registrationFlow(options) {
        // Check if all required formFields are set
        const formFields = getFormFields();
        formFields.forEach((field) => {
            if (field.required && !field.value) {
                throw new Error(`Missing required field: ${field.name}`);
            }
        });
        // Start registration
        const regResp = await WebAuthnBrowser.startRegistration(options);
        // Submit registration response to server
        return await submitForm("register", regResp);
    }
    /**
     * Attempts to authenticate the user when the page loads
     * using the browser's autofill popup.
     *
     * @returns {Promise<void>}
     */
    async function autofillAuthentication() {
        // if the browser can't handle autofill, don't try
        if (!WebAuthnBrowser.browserSupportsWebAuthnAutofill())
            return;
        const res = await fetchOptions("authenticate");
        if (!res) {
            console.error("Failed to fetch option for autofill authentication");
            return;
        }
        try {
            await authenticationFlow(res.options, true);
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * Sets up the passkey form by overriding the form submission handler
     * so that it attempts to authenticate the user when the form is submitted.
     * If the user is not registered, it will attempt to register them instead.
     */
    async function setupForm() {
        const form = getForm();
        // If the browser can't do WebAuthn, hide the form
        if (!WebAuthnBrowser.browserSupportsWebAuthn()) {
            form.style.display = "none";
            return;
        }
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                // Fetch options from the server without assuming that
                // the user is registered
                const res = await fetchOptions(undefined);
                if (!res) {
                    console.error("Failed to fetch options for form submission");
                    return;
                }
                // Then execute the appropriate flow
                if (res.action === "authenticate") {
                    try {
                        await authenticationFlow(res.options, false);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else if (res.action === "register") {
                    try {
                        await registrationFlow(res.options);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }
    // On page load, setup the form and attempt to authenticate the user.
    setupForm();
    autofillAuthentication();
}

const signinErrors = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
};
function ConditionalUIScript(providerID) {
    const startConditionalUIScript = `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${webauthnScript})(authURL, "${providerID}");
`;
    return (o(p$1, { children: o("script", { dangerouslySetInnerHTML: { __html: startConditionalUIScript } }) }));
}
function SigninPage(props) {
    const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType, } = props;
    if (typeof document !== "undefined" && theme?.brandColor) {
        document.documentElement.style.setProperty("--brand-color", theme.brandColor);
    }
    if (typeof document !== "undefined" && theme?.buttonText) {
        document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
    }
    const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
    const providerLogoPath = "https://authjs.dev/img/providers";
    const conditionalUIProviderID = providers.find((provider) => provider.type === "webauthn" && provider.enableConditionalUI)?.id;
    return (o("div", { className: "signin", children: [theme?.brandColor && (o("style", { dangerouslySetInnerHTML: {
                    __html: `:root {--brand-color: ${theme.brandColor}}`,
                } })), theme?.buttonText && (o("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `,
                } })), o("div", { className: "card", children: [error && (o("div", { className: "error", children: o("p", { children: error }) })), theme?.logo && o("img", { src: theme.logo, alt: "Logo", className: "logo" }), providers.map((provider, i) => {
                        let bg, brandColor, logo;
                        if (provider.type === "oauth" || provider.type === "oidc") {
                            ({
                                bg = "#fff",
                                brandColor,
                                logo = `${providerLogoPath}/${provider.id}.svg`,
                            } = provider.style ?? {});
                        }
                        const color = brandColor ?? bg ?? "#fff";
                        return (o("div", { className: "provider", children: [provider.type === "oauth" || provider.type === "oidc" ? (o("form", { action: provider.signinUrl, method: "POST", children: [o("input", { type: "hidden", name: "csrfToken", value: csrfToken }), callbackUrl && (o("input", { type: "hidden", name: "callbackUrl", value: callbackUrl })), o("button", { type: "submit", className: "button", style: {
                                                "--provider-bg": "#fff",
                                                "--provider-bg-hover": `color-mix(in srgb, ${color} 30%, #fff)`,
                                                "--provider-dark-bg": "#161b22",
                                                "--provider-dark-bg-hover": `color-mix(in srgb, ${color} 30%, #000)`,
                                            }, tabIndex: 0, children: [logo && (o("img", { loading: "lazy", height: 24, width: 24, id: "provider-logo", src: logo })), o("span", { style: {
                                                        filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)",
                                                        "mix-blend-mode": "luminosity",
                                                        opacity: 0.95,
                                                    }, children: ["Sign in with ", provider.name] })] })] })) : null, (provider.type === "email" ||
                                    provider.type === "credentials" ||
                                    provider.type === "webauthn") &&
                                    i > 0 &&
                                    providers[i - 1].type !== "email" &&
                                    providers[i - 1].type !== "credentials" &&
                                    providers[i - 1].type !== "webauthn" && o("hr", {}), provider.type === "email" && (o("form", { action: provider.signinUrl, method: "POST", children: [o("input", { type: "hidden", name: "csrfToken", value: csrfToken }), o("label", { className: "section-header", htmlFor: `input-email-for-${provider.id}-provider`, children: "Email" }), o("input", { id: `input-email-for-${provider.id}-provider`, autoFocus: true, type: "email", name: "email", value: email, placeholder: "email@example.com", required: true }), o("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), provider.type === "credentials" && (o("form", { action: provider.callbackUrl, method: "POST", children: [o("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.credentials).map((credential) => {
                                            return (o("div", { children: [o("label", { className: "section-header", htmlFor: `input-${credential}-for-${provider.id}-provider`, children: provider.credentials[credential].label ?? credential }), o("input", { name: credential, id: `input-${credential}-for-${provider.id}-provider`, type: provider.credentials[credential].type ?? "text", placeholder: provider.credentials[credential].placeholder ?? "", ...provider.credentials[credential] })] }, `input-group-${provider.id}`));
                                        }), o("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), provider.type === "webauthn" && (o("form", { action: provider.callbackUrl, method: "POST", id: `${provider.id}-form`, children: [o("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.formFields).map((field) => {
                                            return (o("div", { children: [o("label", { className: "section-header", htmlFor: `input-${field}-for-${provider.id}-provider`, children: provider.formFields[field].label ?? field }), o("input", { name: field, "data-form-field": true, id: `input-${field}-for-${provider.id}-provider`, type: provider.formFields[field].type ?? "text", placeholder: provider.formFields[field].placeholder ?? "", ...provider.formFields[field] })] }, `input-group-${provider.id}`));
                                        }), o("button", { id: `submitButton-${provider.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), (provider.type === "email" ||
                                    provider.type === "credentials" ||
                                    provider.type === "webauthn") &&
                                    i + 1 < providers.length && o("hr", {})] }, provider.id));
                    })] }), conditionalUIProviderID && ConditionalUIScript(conditionalUIProviderID)] }));
}

function SignoutPage(props) {
    const { url, csrfToken, theme } = props;
    return (o("div", { className: "signout", children: [theme?.brandColor && (o("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `,
                } })), theme?.buttonText && (o("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `,
                } })), o("div", { className: "card", children: [theme?.logo && o("img", { src: theme.logo, alt: "Logo", className: "logo" }), o("h1", { children: "Signout" }), o("p", { children: "Are you sure you want to sign out?" }), o("form", { action: url?.toString(), method: "POST", children: [o("input", { type: "hidden", name: "csrfToken", value: csrfToken }), o("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] }));
}

// Generated by `pnpm css`
var css = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
}

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
  }

  button,
  a.button {
    color: var(--provider-dark-color, var(--color-primary)) !important;
    background-color: var(
      --provider-dark-bg,
      var(--color-background)
    ) !important;
  }

    :is(button,a.button):hover {
      background-color: var(
        --provider-dark-bg-hover,
        var(--color-background-hover)
      ) !important;
    }

    :is(button,a.button) span {
      color: var(--provider-dark-bg) !important;
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button span {
  flex-grow: 1;
}

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: #fff;
  }

:is(button,a.button) #provider-logo {
    width: 25px;
    display: block;
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;

function VerifyRequestPage(props) {
    const { url, theme } = props;
    return (o("div", { className: "verify-request", children: [theme.brandColor && (o("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `,
                } })), o("div", { className: "card", children: [theme.logo && o("img", { src: theme.logo, alt: "Logo", className: "logo" }), o("h1", { children: "Check your email" }), o("p", { children: "A sign in link has been sent to your email address." }), o("p", { children: o("a", { className: "site", href: url.origin, children: url.host }) })] })] }));
}

function send({ html, title, status, cookies, theme, headTags, }) {
    return {
        cookies,
        status,
        headers: { "Content-Type": "text/html" },
        body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${css}</style><title>${title}</title>${headTags ?? ""}</head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${k(html)}</div></body></html>`,
    };
}
/**
 * Unless the user defines their [own pages](https://authjs.dev/reference/core#pages),
 * we render a set of default ones, using Preact SSR.
 */
function renderPage(params) {
    const { url, theme, query, cookies, pages, providers } = params;
    return {
        csrf(skip, options, cookies) {
            if (!skip) {
                return {
                    headers: { "Content-Type": "application/json" },
                    body: { csrfToken: options.csrfToken },
                    cookies,
                };
            }
            options.logger.warn("csrf-disabled");
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: "",
                options: { ...options.cookies.csrfToken.options, maxAge: 0 },
            });
            return { status: 404, cookies };
        },
        providers(providers) {
            return {
                headers: { "Content-Type": "application/json" },
                body: providers.reduce((acc, { id, name, type, signinUrl, callbackUrl }) => {
                    acc[id] = { id, name, type, signinUrl, callbackUrl };
                    return acc;
                }, {}),
            };
        },
        signin(providerId, error) {
            if (providerId)
                throw new UnknownAction("Unsupported action");
            if (pages?.signIn) {
                let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: params.callbackUrl ?? "/" })}`;
                if (error)
                    signinUrl = `${signinUrl}&${new URLSearchParams({ error })}`;
                return { redirect: signinUrl, cookies };
            }
            // If we have a webauthn provider with conditional UI and
            // a simpleWebAuthnBrowserScript is defined, we need to
            // render the script in the page.
            const webauthnProvider = providers?.find((p) => p.type === "webauthn" &&
                p.enableConditionalUI &&
                !!p.simpleWebAuthnBrowserVersion);
            let simpleWebAuthnBrowserScript = "";
            if (webauthnProvider) {
                const { simpleWebAuthnBrowserVersion } = webauthnProvider;
                simpleWebAuthnBrowserScript = `<script src="https://unpkg.com/@simplewebauthn/browser@${simpleWebAuthnBrowserVersion}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
            }
            return send({
                cookies,
                theme,
                html: SigninPage({
                    csrfToken: params.csrfToken,
                    // We only want to render providers
                    providers: params.providers?.filter((provider) => 
                    // Always render oauth and email type providers
                    ["email", "oauth", "oidc"].includes(provider.type) ||
                        // Only render credentials type provider if credentials are defined
                        (provider.type === "credentials" && provider.credentials) ||
                        // Only render webauthn type provider if formFields are defined
                        (provider.type === "webauthn" && provider.formFields) ||
                        // Don't render other provider types
                        false),
                    callbackUrl: params.callbackUrl,
                    theme: params.theme,
                    error,
                    ...query,
                }),
                title: "Sign In",
                headTags: simpleWebAuthnBrowserScript,
            });
        },
        signout() {
            if (pages?.signOut)
                return { redirect: pages.signOut, cookies };
            return send({
                cookies,
                theme,
                html: SignoutPage({ csrfToken: params.csrfToken, url, theme }),
                title: "Sign Out",
            });
        },
        verifyRequest(props) {
            if (pages?.verifyRequest)
                return { redirect: pages.verifyRequest, cookies };
            return send({
                cookies,
                theme,
                html: VerifyRequestPage({ url, theme, ...props }),
                title: "Verify Request",
            });
        },
        error(error) {
            if (pages?.error) {
                return {
                    redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
                    cookies,
                };
            }
            return send({
                cookies,
                theme,
                // @ts-expect-error fix error type
                ...ErrorPage({ url, theme, error }),
                title: "Error",
            });
        },
    };
}

/**
 * Takes a number in seconds and returns the date in the future.
 * Optionally takes a second date parameter. In that case
 * the date in the future will be calculated from that date instead of now.
 */
function fromDate(time, date = Date.now()) {
    return new Date(date + time * 1000);
}

/**
 * This function handles the complex flow of signing users in, and either creating,
 * linking (or not linking) accounts depending on if the user is currently logged
 * in, if they have account already and the authentication mechanism they are using.
 *
 * It prevents insecure behaviour, such as linking OAuth accounts unless a user is
 * signed in and authenticated with an existing valid account.
 *
 * All verification (e.g. OAuth flows or email address verification flows) are
 * done prior to this handler being called to avoid additional complexity in this
 * handler.
 */
async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
    // Input validation
    if (!_account?.providerAccountId || !_account.type)
        throw new Error("Missing or invalid provider account");
    if (!["email", "oauth", "oidc", "webauthn"].includes(_account.type))
        throw new Error("Provider not supported");
    const { adapter, jwt, events, session: { strategy: sessionStrategy, generateSessionToken }, } = options;
    // If no adapter is configured then we don't have a database and cannot
    // persist data; in this mode we just return a dummy session object.
    if (!adapter) {
        return { user: _profile, account: _account };
    }
    const profile = _profile;
    let account = _account;
    const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession, } = adapter;
    let session = null;
    let user = null;
    let isNewUser = false;
    const useJwtSession = sessionStrategy === "jwt";
    if (sessionToken) {
        if (useJwtSession) {
            try {
                const salt = options.cookies.sessionToken.name;
                session = await jwt.decode({ ...jwt, token: sessionToken, salt });
                if (session && "sub" in session && session.sub) {
                    user = await getUser(session.sub);
                }
            }
            catch {
                // If session can't be verified, treat as no session
            }
        }
        else {
            const userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession) {
                session = userAndSession.session;
                user = userAndSession.user;
            }
        }
    }
    if (account.type === "email") {
        // If signing in with an email, check if an account with the same email address exists already
        const userByEmail = await getUserByEmail(profile.email);
        if (userByEmail) {
            // If they are not already signed in as the same user, this flow will
            // sign them out of the current session and sign them in as the new user
            if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
                // Delete existing session if they are currently signed in as another user.
                // This will switch user accounts for the session in cases where the user was
                // already logged in with a different account.
                await deleteSession(sessionToken);
            }
            // Update emailVerified property on the user object
            user = await updateUser({
                id: userByEmail.id,
                emailVerified: new Date(),
            });
            await events.updateUser?.({ user });
        }
        else {
            // Create user account if there isn't one for the email address already
            user = await createUser({ ...profile, emailVerified: new Date() });
            await events.createUser?.({ user });
            isNewUser = true;
        }
        // Create new session
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: fromDate(options.session.maxAge),
            });
        return { session, user, isNewUser };
    }
    else if (account.type === "webauthn") {
        // Check if the account exists
        const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider,
        });
        if (userByAccount) {
            if (user) {
                // If the user is already signed in with this account, we don't need to do anything
                if (userByAccount.id === user.id) {
                    const currentAccount = { ...account, userId: user.id };
                    return { session, user, isNewUser, account: currentAccount };
                }
                // If the user is currently signed in, but the new account they are signing in
                // with is already associated with another user, then we cannot link them
                // and need to return an error.
                throw new AccountNotLinked("The account is already associated with another user", { provider: account.provider });
            }
            // If there is no active session, but the account being signed in with is already
            // associated with a valid user then create session to sign the user in.
            session = useJwtSession
                ? {}
                : await createSession({
                    sessionToken: generateSessionToken(),
                    userId: userByAccount.id,
                    expires: fromDate(options.session.maxAge),
                });
            const currentAccount = {
                ...account,
                userId: userByAccount.id,
            };
            return {
                session,
                user: userByAccount,
                isNewUser,
                account: currentAccount,
            };
        }
        else {
            // If the account doesn't exist, we'll create it
            if (user) {
                // If the user is already signed in and the account isn't already associated
                // with another user account then we can go ahead and link the accounts safely.
                await linkAccount({ ...account, userId: user.id });
                await events.linkAccount?.({ user, account, profile });
                // As they are already signed in, we don't need to do anything after linking them
                const currentAccount = { ...account, userId: user.id };
                return { session, user, isNewUser, account: currentAccount };
            }
            // If the user is not signed in and it looks like a new account then we
            // check there also isn't an user account already associated with the same
            // email address as the one in the request.
            const userByEmail = profile.email
                ? await getUserByEmail(profile.email)
                : null;
            if (userByEmail) {
                // We don't trust user-provided email addresses, so we don't want to link accounts
                // if the email address associated with the new account is already associated with
                // an existing account.
                throw new AccountNotLinked("Another account already exists with the same e-mail address", { provider: account.provider });
            }
            else {
                // If the current user is not logged in and the profile isn't linked to any user
                // accounts (by email or provider account id)...
                //
                // If no account matching the same [provider].id or .email exists, we can
                // create a new account for the user, link it to the OAuth account and
                // create a new session for them so they are signed in with it.
                user = await createUser({ ...profile });
            }
            await events.createUser?.({ user });
            await linkAccount({ ...account, userId: user.id });
            await events.linkAccount?.({ user, account, profile });
            session = useJwtSession
                ? {}
                : await createSession({
                    sessionToken: generateSessionToken(),
                    userId: user.id,
                    expires: fromDate(options.session.maxAge),
                });
            const currentAccount = { ...account, userId: user.id };
            return { session, user, isNewUser: true, account: currentAccount };
        }
    }
    // If signing in with OAuth account, check to see if the account exists already
    const userByAccount = await getUserByAccount({
        providerAccountId: account.providerAccountId,
        provider: account.provider,
    });
    if (userByAccount) {
        if (user) {
            // If the user is already signed in with this account, we don't need to do anything
            if (userByAccount.id === user.id) {
                return { session, user, isNewUser };
            }
            // If the user is currently signed in, but the new account they are signing in
            // with is already associated with another user, then we cannot link them
            // and need to return an error.
            throw new OAuthAccountNotLinked("The account is already associated with another user", { provider: account.provider });
        }
        // If there is no active session, but the account being signed in with is already
        // associated with a valid user then create session to sign the user in.
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: userByAccount.id,
                expires: fromDate(options.session.maxAge),
            });
        return { session, user: userByAccount, isNewUser };
    }
    else {
        const { provider: p } = options;
        const { type, provider, providerAccountId, userId, ...tokenSet } = account;
        const defaults = { providerAccountId, provider, type, userId };
        account = Object.assign(p.account(tokenSet) ?? {}, defaults);
        if (user) {
            // If the user is already signed in and the OAuth account isn't already associated
            // with another user account then we can go ahead and link the accounts safely.
            await linkAccount({ ...account, userId: user.id });
            await events.linkAccount?.({ user, account, profile });
            // As they are already signed in, we don't need to do anything after linking them
            return { session, user, isNewUser };
        }
        // If the user is not signed in and it looks like a new OAuth account then we
        // check there also isn't an user account already associated with the same
        // email address as the one in the OAuth profile.
        //
        // This step is often overlooked in OAuth implementations, but covers the following cases:
        //
        // 1. It makes it harder for someone to accidentally create two accounts.
        //    e.g. by signin in with email, then again with an oauth account connected to the same email.
        // 2. It makes it harder to hijack a user account using a 3rd party OAuth account.
        //    e.g. by creating an oauth account then changing the email address associated with it.
        //
        // It's quite common for services to automatically link accounts in this case, but it's
        // better practice to require the user to sign in *then* link accounts to be sure
        // someone is not exploiting a problem with a third party OAuth service.
        //
        // OAuth providers should require email address verification to prevent this, but in
        // practice that is not always the case; this helps protect against that.
        const userByEmail = profile.email
            ? await getUserByEmail(profile.email)
            : null;
        if (userByEmail) {
            const provider = options.provider;
            if (provider?.allowDangerousEmailAccountLinking) {
                // If you trust the oauth provider to correctly verify email addresses, you can opt-in to
                // account linking even when the user is not signed-in.
                user = userByEmail;
            }
            else {
                // We end up here when we don't have an account with the same [provider].id *BUT*
                // we do already have an account with the same email address as the one in the
                // OAuth profile the user has just tried to sign in with.
                //
                // We don't want to have two accounts with the same email address, and we don't
                // want to link them in case it's not safe to do so, so instead we prompt the user
                // to sign in via email to verify their identity and then link the accounts.
                throw new OAuthAccountNotLinked("Another account already exists with the same e-mail address", { provider: account.provider });
            }
        }
        else {
            // If the current user is not logged in and the profile isn't linked to any user
            // accounts (by email or provider account id)...
            //
            // If no account matching the same [provider].id or .email exists, we can
            // create a new account for the user, link it to the OAuth account and
            // create a new session for them so they are signed in with it.
            user = await createUser({ ...profile, emailVerified: null });
        }
        await events.createUser?.({ user });
        await linkAccount({ ...account, userId: user.id });
        await events.linkAccount?.({ user, account, profile });
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: fromDate(options.session.maxAge),
            });
        return { session, user, isNewUser: true };
    }
}

let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'oauth4webapi';
    const VERSION = 'v2.12.0';
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return (input instanceof expected ||
            Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag]);
    }
    catch {
        return false;
    }
}
const clockSkew = Symbol();
const clockTolerance = Symbol();
const customFetch = Symbol();
const useMtlsAlias = Symbol();
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function buf(input) {
    if (typeof input === 'string') {
        return encoder.encode(input);
    }
    return decoder.decode(input);
}
const CHUNK_SIZE = 0x8000;
function encodeBase64Url(input) {
    if (input instanceof ArrayBuffer) {
        input = new Uint8Array(input);
    }
    const arr = [];
    for (let i = 0; i < input.byteLength; i += CHUNK_SIZE) {
        arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function decodeBase64Url(input) {
    try {
        const binary = atob(input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
    catch (cause) {
        throw new OPE('The input to be decoded is not correctly encoded.', { cause });
    }
}
function b64u(input) {
    if (typeof input === 'string') {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class LRU {
    constructor(maxSize) {
        this.cache = new Map();
        this._cache = new Map();
        this.maxSize = maxSize;
    }
    get(key) {
        let v = this.cache.get(key);
        if (v) {
            return v;
        }
        if ((v = this._cache.get(key))) {
            this.update(key, v);
            return v;
        }
        return undefined;
    }
    has(key) {
        return this.cache.has(key) || this._cache.has(key);
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.set(key, value);
        }
        else {
            this.update(key, value);
        }
        return this;
    }
    delete(key) {
        if (this.cache.has(key)) {
            return this.cache.delete(key);
        }
        if (this._cache.has(key)) {
            return this._cache.delete(key);
        }
        return false;
    }
    update(key, value) {
        this.cache.set(key, value);
        if (this.cache.size >= this.maxSize) {
            this._cache = this.cache;
            this.cache = new Map();
        }
    }
}
class UnsupportedOperationError extends Error {
    constructor(message) {
        super(message ?? 'operation not supported');
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
const OPE = OperationProcessingError;
const dpopNonces = new LRU(100);
function isCryptoKey(key) {
    return key instanceof CryptoKey;
}
function isPrivateKey(key) {
    return isCryptoKey(key) && key.type === 'private';
}
function isPublicKey(key) {
    return isCryptoKey(key) && key.type === 'public';
}
function processDpopNonce(response) {
    try {
        const nonce = response.headers.get('dpop-nonce');
        if (nonce) {
            dpopNonces.set(new URL(response.url).origin, nonce);
        }
    }
    catch { }
    return response;
}
function isJsonObject(input) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input);
    if (USER_AGENT && !headers.has('user-agent')) {
        headers.set('user-agent', USER_AGENT);
    }
    if (headers.has('authorization')) {
        throw new TypeError('"options.headers" must not include the "authorization" header name');
    }
    if (headers.has('dpop')) {
        throw new TypeError('"options.headers" must not include the "dpop" header name');
    }
    return headers;
}
function signal(value) {
    if (typeof value === 'function') {
        value = value();
    }
    if (!(value instanceof AbortSignal)) {
        throw new TypeError('"options.signal" must return or be an instance of AbortSignal');
    }
    return value;
}
async function discoveryRequest(issuerIdentifier, options) {
    if (!(issuerIdentifier instanceof URL)) {
        throw new TypeError('"issuerIdentifier" must be an instance of URL');
    }
    if (issuerIdentifier.protocol !== 'https:' && issuerIdentifier.protocol !== 'http:') {
        throw new TypeError('"issuer.protocol" must be "https:" or "http:"');
    }
    const url = new URL(issuerIdentifier.href);
    switch (options?.algorithm) {
        case undefined:
        case 'oidc':
            url.pathname = `${url.pathname}/.well-known/openid-configuration`.replace('//', '/');
            break;
        case 'oauth2':
            if (url.pathname === '/') {
                url.pathname = '.well-known/oauth-authorization-server';
            }
            else {
                url.pathname = `.well-known/oauth-authorization-server/${url.pathname}`.replace('//', '/');
            }
            break;
        default:
            throw new TypeError('"options.algorithm" must be "oidc" (default), or "oauth2"');
    }
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return (options?.[customFetch] || fetch)(url.href, {
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null,
    }).then(processDpopNonce);
}
function validateString(input) {
    return typeof input === 'string' && input.length !== 0;
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    if (!(expectedIssuerIdentifier instanceof URL)) {
        throw new TypeError('"expectedIssuer" must be an instance of URL');
    }
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        throw new OPE('"response" is not a conform Authorization Server Metadata response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    }
    catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', { cause });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.issuer)) {
        throw new OPE('"response" body "issuer" property must be a non-empty string');
    }
    if (new URL(json.issuer).href !== expectedIssuerIdentifier.href) {
        throw new OPE('"response" body "issuer" does not match "expectedIssuer"');
    }
    return json;
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    if (!validateString(codeVerifier)) {
        throw new TypeError('"codeVerifier" must be a non-empty string');
    }
    return b64u(await crypto.subtle.digest('SHA-256', buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return { key: input };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined && !validateString(input.kid)) {
        throw new TypeError('"kid" must be a non-empty string');
    }
    return { key: input.key, kid: input.kid };
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/%20/g, '+');
}
function clientSecretBasic(clientId, clientSecret) {
    const username = formUrlEncode(clientId);
    const password = formUrlEncode(clientSecret);
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
function psAlg(key) {
    switch (key.algorithm.hash.name) {
        case 'SHA-256':
            return 'PS256';
        case 'SHA-384':
            return 'PS384';
        case 'SHA-512':
            return 'PS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name');
    }
}
function rsAlg(key) {
    switch (key.algorithm.hash.name) {
        case 'SHA-256':
            return 'RS256';
        case 'SHA-384':
            return 'RS384';
        case 'SHA-512':
            return 'RS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name');
    }
}
function esAlg(key) {
    switch (key.algorithm.namedCurve) {
        case 'P-256':
            return 'ES256';
        case 'P-384':
            return 'ES384';
        case 'P-521':
            return 'ES512';
        default:
            throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve');
    }
}
function keyToJws(key) {
    switch (key.algorithm.name) {
        case 'RSA-PSS':
            return psAlg(key);
        case 'RSASSA-PKCS1-v1_5':
            return rsAlg(key);
        case 'ECDSA':
            return esAlg(key);
        case 'Ed25519':
        case 'Ed448':
            return 'EdDSA';
        default:
            throw new UnsupportedOperationError('unsupported CryptoKey algorithm name');
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === 'number' && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === 'number' && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1
        ? tolerance
        : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function clientAssertion(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: [as.issuer, as.token_endpoint],
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id,
    };
}
async function privateKeyJwt(as, client, key, kid) {
    return jwt({
        alg: keyToJws(key),
        kid,
    }, clientAssertion(as, client), key);
}
function assertAs(as) {
    if (typeof as !== 'object' || as === null) {
        throw new TypeError('"as" must be an object');
    }
    if (!validateString(as.issuer)) {
        throw new TypeError('"as.issuer" property must be a non-empty string');
    }
    return true;
}
function assertClient(client) {
    if (typeof client !== 'object' || client === null) {
        throw new TypeError('"client" must be an object');
    }
    if (!validateString(client.client_id)) {
        throw new TypeError('"client.client_id" property must be a non-empty string');
    }
    return true;
}
function assertClientSecret(clientSecret) {
    if (!validateString(clientSecret)) {
        throw new TypeError('"client.client_secret" property must be a non-empty string');
    }
    return clientSecret;
}
function assertNoClientPrivateKey(clientAuthMethod, clientPrivateKey) {
    if (clientPrivateKey !== undefined) {
        throw new TypeError(`"options.clientPrivateKey" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
    }
}
function assertNoClientSecret(clientAuthMethod, clientSecret) {
    if (clientSecret !== undefined) {
        throw new TypeError(`"client.client_secret" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
    }
}
async function clientAuthentication(as, client, body, headers, clientPrivateKey) {
    body.delete('client_secret');
    body.delete('client_assertion_type');
    body.delete('client_assertion');
    switch (client.token_endpoint_auth_method) {
        case undefined:
        case 'client_secret_basic': {
            assertNoClientPrivateKey('client_secret_basic', clientPrivateKey);
            headers.set('authorization', clientSecretBasic(client.client_id, assertClientSecret(client.client_secret)));
            break;
        }
        case 'client_secret_post': {
            assertNoClientPrivateKey('client_secret_post', clientPrivateKey);
            body.set('client_id', client.client_id);
            body.set('client_secret', assertClientSecret(client.client_secret));
            break;
        }
        case 'private_key_jwt': {
            assertNoClientSecret('private_key_jwt', client.client_secret);
            if (clientPrivateKey === undefined) {
                throw new TypeError('"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"');
            }
            const { key, kid } = getKeyAndKid(clientPrivateKey);
            if (!isPrivateKey(key)) {
                throw new TypeError('"options.clientPrivateKey.key" must be a private CryptoKey');
            }
            body.set('client_id', client.client_id);
            body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
            body.set('client_assertion', await privateKeyJwt(as, client, key, kid));
            break;
        }
        case 'tls_client_auth':
        case 'self_signed_tls_client_auth':
        case 'none': {
            assertNoClientSecret(client.token_endpoint_auth_method, client.client_secret);
            assertNoClientPrivateKey(client.token_endpoint_auth_method, clientPrivateKey);
            body.set('client_id', client.client_id);
            break;
        }
        default:
            throw new UnsupportedOperationError('unsupported client token_endpoint_auth_method');
    }
}
async function jwt(header, claimsSet, key) {
    if (!key.usages.includes('sign')) {
        throw new TypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"');
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(claimsSet)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function dpopProofJwt(headers, options, url, htm, clockSkew, accessToken) {
    const { privateKey, publicKey, nonce = dpopNonces.get(url.origin) } = options;
    if (!isPrivateKey(privateKey)) {
        throw new TypeError('"DPoP.privateKey" must be a private CryptoKey');
    }
    if (!isPublicKey(publicKey)) {
        throw new TypeError('"DPoP.publicKey" must be a public CryptoKey');
    }
    if (nonce !== undefined && !validateString(nonce)) {
        throw new TypeError('"DPoP.nonce" must be a non-empty string or undefined');
    }
    if (!publicKey.extractable) {
        throw new TypeError('"DPoP.publicKey.extractable" must be true');
    }
    const now = epochTime() + clockSkew;
    const proof = await jwt({
        alg: keyToJws(privateKey),
        typ: 'dpop+jwt',
        jwk: await publicJwk(publicKey),
    }, {
        iat: now,
        jti: randomBytes(),
        htm,
        nonce,
        htu: `${url.origin}${url.pathname}`,
        ath: accessToken ? b64u(await crypto.subtle.digest('SHA-256', buf(accessToken))) : undefined,
    }, privateKey);
    headers.set('dpop', proof);
}
let jwkCache;
async function getSetPublicJwkCache(key) {
    const { kty, e, n, x, y, crv } = await crypto.subtle.exportKey('jwk', key);
    const jwk = { kty, e, n, x, y, crv };
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key) {
    jwkCache || (jwkCache = new WeakMap());
    return jwkCache.get(key) || getSetPublicJwkCache(key);
}
function validateEndpoint(value, endpoint, options) {
    if (typeof value !== 'string') {
        if (options?.[useMtlsAlias]) {
            throw new TypeError(`"as.mtls_endpoint_aliases.${endpoint}" must be a string`);
        }
        throw new TypeError(`"as.${endpoint}" must be a string`);
    }
    return new URL(value);
}
function resolveEndpoint(as, endpoint, options) {
    if (options?.[useMtlsAlias] && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, options);
    }
    return validateEndpoint(as[endpoint], endpoint);
}
function isOAuth2Error(input) {
    const value = input;
    if (typeof value !== 'object' || Array.isArray(value) || value === null) {
        return false;
    }
    return value.error !== undefined;
}
function unquote(value) {
    if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
        return value.slice(1, -1);
    }
    return value;
}
const SPLIT_REGEXP = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/;
const SCHEMES_REGEXP = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function wwwAuth(scheme, params) {
    const arr = params.split(SPLIT_REGEXP).slice(1);
    if (!arr.length) {
        return { scheme: scheme.toLowerCase(), parameters: {} };
    }
    arr[arr.length - 1] = arr[arr.length - 1].replace(/,$/, '');
    const parameters = {};
    for (let i = 1; i < arr.length; i += 2) {
        const idx = i;
        if (arr[idx][0] === '"') {
            while (arr[idx].slice(-1) !== '"' && ++i < arr.length) {
                arr[idx] += arr[i];
            }
        }
        const key = arr[idx - 1].replace(/^(?:, ?)|=$/g, '').toLowerCase();
        parameters[key] = unquote(arr[idx]);
    }
    return {
        scheme: scheme.toLowerCase(),
        parameters,
    };
}
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    const header = response.headers.get('www-authenticate');
    if (header === null) {
        return undefined;
    }
    const result = [];
    for (const { 1: scheme, index } of header.matchAll(SCHEMES_REGEXP)) {
        result.push([scheme, index]);
    }
    if (!result.length) {
        return undefined;
    }
    const challenges = result.map(([scheme, indexOf], i, others) => {
        const next = others[i + 1];
        let parameters;
        if (next) {
            parameters = header.slice(indexOf, next[1]);
        }
        else {
            parameters = header.slice(indexOf);
        }
        return wwwAuth(scheme, parameters);
    });
    return challenges;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    if (!validateString(accessToken)) {
        throw new TypeError('"accessToken" must be a non-empty string');
    }
    if (!(url instanceof URL)) {
        throw new TypeError('"url" must be an instance of URL');
    }
    headers = prepareHeaders(headers);
    if (options?.DPoP === undefined) {
        headers.set('authorization', `Bearer ${accessToken}`);
    }
    else {
        await dpopProofJwt(headers, options.DPoP, url, 'GET', getClockSkew({ [clockSkew]: options?.[clockSkew] }), accessToken);
        headers.set('authorization', `DPoP ${accessToken}`);
    }
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null,
    }).then(processDpopNonce);
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'userinfo_endpoint', options);
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set('accept', 'application/jwt');
    }
    else {
        headers.set('accept', 'application/json');
        headers.append('accept', 'application/jwt');
    }
    return protectedResourceRequest(accessToken, 'GET', url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client),
    });
}
const skipSubjectCheck = Symbol();
function getContentType(response) {
    return response.headers.get('content-type')?.split(';')[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        throw new OPE('"response" is not a conform UserInfo Endpoint response');
    }
    let json;
    if (getContentType(response) === 'application/jwt') {
        assertReadableResponse(response);
        const { claims } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client))
            .then(validateOptionalAudience.bind(undefined, client.client_id))
            .then(validateOptionalIssuer.bind(undefined, as.issuer));
        json = claims;
    }
    else {
        if (client.userinfo_signed_response_alg) {
            throw new OPE('JWT UserInfo Response expected');
        }
        assertReadableResponse(response);
        try {
            json = await response.json();
        }
        catch (cause) {
            throw new OPE('failed to parse "response" body as JSON', { cause });
        }
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.sub)) {
        throw new OPE('"response" body "sub" property must be a non-empty string');
    }
    switch (expectedSubject) {
        case skipSubjectCheck:
            break;
        default:
            if (!validateString(expectedSubject)) {
                throw new OPE('"expectedSubject" must be a non-empty string');
            }
            if (json.sub !== expectedSubject) {
                throw new OPE('unexpected "response" body "sub" value');
            }
    }
    return json;
}
async function authenticatedRequest(as, client, method, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers, options?.clientPrivateKey);
    headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null,
    }).then(processDpopNonce);
}
async function tokenEndpointRequest(as, client, grantType, parameters, options) {
    const url = resolveEndpoint(as, 'token_endpoint', options);
    parameters.set('grant_type', grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        await dpopProofJwt(headers, options.DPoP, url, 'POST', getClockSkew(client));
    }
    return authenticatedRequest(as, client, 'POST', url, parameters, headers, options);
}
const idTokenClaims = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw new TypeError('"ref" was already garbage collected or did not resolve from the proper sources');
    }
    return claims;
}
async function processGenericAccessTokenResponse(as, client, response, ignoreIdToken = false, ignoreRefreshToken = false) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        let err;
        if ((err = await handleOAuthBodyError(response))) {
            return err;
        }
        throw new OPE('"response" is not a conform Token Endpoint response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    }
    catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', { cause });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.access_token)) {
        throw new OPE('"response" body "access_token" property must be a non-empty string');
    }
    if (!validateString(json.token_type)) {
        throw new OPE('"response" body "token_type" property must be a non-empty string');
    }
    json.token_type = json.token_type.toLowerCase();
    if (json.token_type !== 'dpop' && json.token_type !== 'bearer') {
        throw new UnsupportedOperationError('unsupported `token_type` value');
    }
    if (json.expires_in !== undefined &&
        (typeof json.expires_in !== 'number' || json.expires_in <= 0)) {
        throw new OPE('"response" body "expires_in" property must be a positive number');
    }
    if (!ignoreRefreshToken &&
        json.refresh_token !== undefined &&
        !validateString(json.refresh_token)) {
        throw new OPE('"response" body "refresh_token" property must be a non-empty string');
    }
    if (json.scope !== undefined && typeof json.scope !== 'string') {
        throw new OPE('"response" body "scope" property must be a string');
    }
    if (!ignoreIdToken) {
        if (json.id_token !== undefined && !validateString(json.id_token)) {
            throw new OPE('"response" body "id_token" property must be a non-empty string');
        }
        if (json.id_token) {
            const { claims } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client))
                .then(validatePresence.bind(undefined, ['aud', 'exp', 'iat', 'iss', 'sub']))
                .then(validateIssuer.bind(undefined, as.issuer))
                .then(validateAudience.bind(undefined, client.client_id));
            if (Array.isArray(claims.aud) && claims.aud.length !== 1 && claims.azp !== client.client_id) {
                throw new OPE('unexpected ID Token "azp" (authorized party) claim value');
            }
            if (claims.auth_time !== undefined &&
                (!Number.isFinite(claims.auth_time) || Math.sign(claims.auth_time) !== 1)) {
                throw new OPE('ID Token "auth_time" (authentication time) must be a positive number');
            }
            idTokenClaims.set(json, claims);
        }
    }
    return json;
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw new OPE('unexpected JWT "aud" (audience) claim value');
        }
    }
    else if (result.claims.aud !== expected) {
        throw new OPE('unexpected JWT "aud" (audience) claim value');
    }
    return result;
}
function validateOptionalIssuer(expected, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(expected, result);
    }
    return result;
}
function validateIssuer(expected, result) {
    if (result.claims.iss !== expected) {
        throw new OPE('unexpected JWT "iss" (issuer) claim value');
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
async function authorizationCodeGrantRequest(as, client, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw new TypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()');
    }
    if (!validateString(redirectUri)) {
        throw new TypeError('"redirectUri" must be a non-empty string');
    }
    if (!validateString(codeVerifier)) {
        throw new TypeError('"codeVerifier" must be a non-empty string');
    }
    const code = getURLSearchParameter(callbackParameters, 'code');
    if (!code) {
        throw new OPE('no authorization code in "callbackParameters"');
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('redirect_uri', redirectUri);
    parameters.set('code_verifier', codeVerifier);
    parameters.set('code', code);
    return tokenEndpointRequest(as, client, 'authorization_code', parameters, options);
}
const jwtClaimNames = {
    aud: 'audience',
    c_hash: 'code hash',
    client_id: 'client id',
    exp: 'expiration time',
    iat: 'issued at',
    iss: 'issuer',
    jti: 'jwt id',
    nonce: 'nonce',
    s_hash: 'state hash',
    sub: 'subject',
    ath: 'access token hash',
    htm: 'http method',
    htu: 'http uri',
    cnf: 'confirmation',
};
function validatePresence(required, result) {
    for (const claim of required) {
        if (result.claims[claim] === undefined) {
            throw new OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`);
        }
    }
    return result;
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge) {
    const result = await processGenericAccessTokenResponse(as, client, response);
    if (isOAuth2Error(result)) {
        return result;
    }
    if (!validateString(result.id_token)) {
        throw new OPE('"response" body "id_token" property must be a non-empty string');
    }
    maxAge ?? (maxAge = client.default_max_age ?? skipAuthTimeCheck);
    const claims = getValidatedIdTokenClaims(result);
    if ((client.require_auth_time || maxAge !== skipAuthTimeCheck) &&
        claims.auth_time === undefined) {
        throw new OPE('ID Token "auth_time" (authentication time) claim missing');
    }
    if (maxAge !== skipAuthTimeCheck) {
        if (typeof maxAge !== 'number' || maxAge < 0) {
            throw new TypeError('"maxAge" must be a non-negative number');
        }
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw new OPE('too much time has elapsed since the last End-User authentication');
        }
    }
    switch (expectedNonce) {
        case undefined:
        case expectNoNonce:
            if (claims.nonce !== undefined) {
                throw new OPE('unexpected ID Token "nonce" claim value');
            }
            break;
        default:
            if (!validateString(expectedNonce)) {
                throw new TypeError('"expectedNonce" must be a non-empty string');
            }
            if (claims.nonce === undefined) {
                throw new OPE('ID Token "nonce" claim missing');
            }
            if (claims.nonce !== expectedNonce) {
                throw new OPE('unexpected ID Token "nonce" claim value');
            }
    }
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response) {
    const result = await processGenericAccessTokenResponse(as, client, response, true);
    if (isOAuth2Error(result)) {
        return result;
    }
    if (result.id_token !== undefined) {
        if (typeof result.id_token === 'string' && result.id_token.length) {
            throw new OPE('Unexpected ID Token returned, use processAuthorizationCodeOpenIDResponse() for OpenID Connect callback processing');
        }
        delete result.id_token;
    }
    return result;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw new TypeError('"response" body has been used already');
    }
}
async function handleOAuthBodyError(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        try {
            const json = await response.json();
            if (isJsonObject(json) && typeof json.error === 'string' && json.error.length) {
                if (json.error_description !== undefined && typeof json.error_description !== 'string') {
                    delete json.error_description;
                }
                if (json.error_uri !== undefined && typeof json.error_uri !== 'string') {
                    delete json.error_uri;
                }
                if (json.algs !== undefined && typeof json.algs !== 'string') {
                    delete json.algs;
                }
                if (json.scope !== undefined && typeof json.scope !== 'string') {
                    delete json.scope;
                }
                return json;
            }
        }
        catch { }
    }
    return undefined;
}
function checkRsaKeyAlgorithm(algorithm) {
    if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
        throw new OPE(`${algorithm.name} modulusLength must be at least 2048 bits`);
    }
}
function ecdsaHashName(namedCurve) {
    switch (namedCurve) {
        case 'P-256':
            return 'SHA-256';
        case 'P-384':
            return 'SHA-384';
        case 'P-521':
            return 'SHA-512';
        default:
            throw new UnsupportedOperationError();
    }
}
function keyToSubtle(key) {
    switch (key.algorithm.name) {
        case 'ECDSA':
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key.algorithm.namedCurve),
            };
        case 'RSA-PSS': {
            checkRsaKeyAlgorithm(key.algorithm);
            switch (key.algorithm.hash.name) {
                case 'SHA-256':
                case 'SHA-384':
                case 'SHA-512':
                    return {
                        name: key.algorithm.name,
                        saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3,
                    };
                default:
                    throw new UnsupportedOperationError();
            }
        }
        case 'RSASSA-PKCS1-v1_5':
            checkRsaKeyAlgorithm(key.algorithm);
            return key.algorithm.name;
        case 'Ed448':
        case 'Ed25519':
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError();
}
const noSignatureCheck = Symbol();
async function validateJwt(jws, checkAlg, getKey, clockSkew, clockTolerance) {
    const { 0: protectedHeader, 1: payload, 2: encodedSignature, length } = jws.split('.');
    if (length === 5) {
        throw new UnsupportedOperationError('JWE structure JWTs are not supported');
    }
    if (length !== 3) {
        throw new OPE('Invalid JWT');
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    }
    catch (cause) {
        throw new OPE('failed to parse JWT Header body as base64url encoded JSON', { cause });
    }
    if (!isJsonObject(header)) {
        throw new OPE('JWT Header must be a top level object');
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new OPE('unexpected JWT "crit" header parameter');
    }
    const signature = b64u(encodedSignature);
    let key;
    if (getKey !== noSignatureCheck) {
        key = await getKey(header);
        const input = `${protectedHeader}.${payload}`;
        const verified = await crypto.subtle.verify(keyToSubtle(key), key, signature, buf(input));
        if (!verified) {
            throw new OPE('JWT signature verification failed');
        }
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    }
    catch (cause) {
        throw new OPE('failed to parse JWT Payload body as base64url encoded JSON', { cause });
    }
    if (!isJsonObject(claims)) {
        throw new OPE('JWT Payload must be a top level object');
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== 'number') {
            throw new OPE('unexpected JWT "exp" (expiration time) claim type');
        }
        if (claims.exp <= now - clockTolerance) {
            throw new OPE('unexpected JWT "exp" (expiration time) claim value, timestamp is <= now()');
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== 'number') {
            throw new OPE('unexpected JWT "iat" (issued at) claim type');
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== 'string') {
            throw new OPE('unexpected JWT "iss" (issuer) claim type');
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== 'number') {
            throw new OPE('unexpected JWT "nbf" (not before) claim type');
        }
        if (claims.nbf > now + clockTolerance) {
            throw new OPE('unexpected JWT "nbf" (not before) claim value, timestamp is > now()');
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
            throw new OPE('unexpected JWT "aud" (audience) claim type');
        }
    }
    return { header, claims, signature, key };
}
function checkSigningAlgorithm(client, issuer, header) {
    if (client !== undefined) {
        if (header.alg !== client) {
            throw new OPE('unexpected JWT "alg" header parameter');
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw new OPE('unexpected JWT "alg" header parameter');
        }
        return;
    }
    if (header.alg !== 'RS256') {
        throw new OPE('unexpected JWT "alg" header parameter');
    }
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw new OPE(`"${name}" parameter must be provided only once`);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL');
    }
    if (getURLSearchParameter(parameters, 'response')) {
        throw new OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()');
    }
    const iss = getURLSearchParameter(parameters, 'iss');
    const state = getURLSearchParameter(parameters, 'state');
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw new OPE('response parameter "iss" (issuer) missing');
    }
    if (iss && iss !== as.issuer) {
        throw new OPE('unexpected "iss" (issuer) response parameter value');
    }
    switch (expectedState) {
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw new OPE('unexpected "state" response parameter encountered');
            }
            break;
        case skipStateCheck:
            break;
        default:
            if (!validateString(expectedState)) {
                throw new OPE('"expectedState" must be a non-empty string');
            }
            if (state === undefined) {
                throw new OPE('response parameter "state" missing');
            }
            if (state !== expectedState) {
                throw new OPE('unexpected "state" response parameter value');
            }
    }
    const error = getURLSearchParameter(parameters, 'error');
    if (error) {
        return {
            error,
            error_description: getURLSearchParameter(parameters, 'error_description'),
            error_uri: getURLSearchParameter(parameters, 'error_uri'),
        };
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    const token = getURLSearchParameter(parameters, 'token');
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError('implicit and hybrid flows are not supported');
    }
    return brand(new URLSearchParams(parameters));
}

/** Returns a signed cookie. */
async function signCookie(type, value, maxAge, options, data) {
    const { cookies, logger } = options;
    logger.debug(`CREATE_${type.toUpperCase()}`, { value, maxAge });
    const expires = new Date();
    expires.setTime(expires.getTime() + maxAge * 1000);
    const token = { value };
    if (type === "state" && data)
        token.data = data;
    const name = cookies[type].name;
    return {
        name,
        value: await encode({ ...options.jwt, maxAge, token, salt: name }),
        options: { ...cookies[type].options, expires },
    };
}
const PKCE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const pkce = {
    async create(options) {
        const code_verifier = generateRandomCodeVerifier();
        const value = await calculatePKCECodeChallenge(code_verifier);
        const maxAge = PKCE_MAX_AGE;
        const cookie = await signCookie("pkceCodeVerifier", code_verifier, maxAge, options);
        return { cookie, value };
    },
    /**
     * Returns code_verifier if the provider is configured to use PKCE,
     * and clears the container cookie afterwards.
     * An error is thrown if the code_verifier is missing or invalid.
     * @see https://www.rfc-editor.org/rfc/rfc7636
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#pkce
     */
    async use(cookies, resCookies, options) {
        const { provider } = options;
        if (!provider?.checks?.includes("pkce"))
            return;
        const codeVerifier = cookies?.[options.cookies.pkceCodeVerifier.name];
        if (!codeVerifier)
            throw new InvalidCheck("PKCE code_verifier cookie was missing");
        const value = await decode({
            ...options.jwt,
            token: codeVerifier,
            salt: options.cookies.pkceCodeVerifier.name,
        });
        if (!value?.value)
            throw new InvalidCheck("PKCE code_verifier value could not be parsed");
        // Clear the pkce code verifier cookie after use
        resCookies.push({
            name: options.cookies.pkceCodeVerifier.name,
            value: "",
            options: { ...options.cookies.pkceCodeVerifier.options, maxAge: 0 },
        });
        return value.value;
    },
};
const STATE_MAX_AGE = 60 * 15; // 15 minutes in seconds
function decodeState(value) {
    try {
        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(decode$1(value)));
    }
    catch { }
}
const state = {
    async create(options, data) {
        const { provider } = options;
        if (!provider.checks.includes("state")) {
            if (data) {
                throw new InvalidCheck("State data was provided but the provider is not configured to use state");
            }
            return;
        }
        const encodedState = encode$1(JSON.stringify({ ...data, random: generateRandomState() }));
        const maxAge = STATE_MAX_AGE;
        const cookie = await signCookie("state", encodedState, maxAge, options, data);
        return { cookie, value: encodedState };
    },
    /**
     * Returns state if the provider is configured to use state,
     * and clears the container cookie afterwards.
     * An error is thrown if the state is missing or invalid.
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-10.12
     * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
     */
    async use(cookies, resCookies, options, paramRandom) {
        const { provider } = options;
        if (!provider.checks.includes("state"))
            return;
        const state = cookies?.[options.cookies.state.name];
        if (!state)
            throw new InvalidCheck("State cookie was missing");
        // IDEA: Let the user do something with the returned state
        const encodedState = await decode({
            ...options.jwt,
            token: state,
            salt: options.cookies.state.name,
        });
        if (!encodedState?.value)
            throw new InvalidCheck("State (cookie) value could not be parsed");
        const decodedState = decodeState(encodedState.value);
        if (!decodedState)
            throw new InvalidCheck("State (encoded) value could not be parsed");
        if (decodedState.random !== paramRandom)
            throw new InvalidCheck(`Random state values did not match. Expected: ${decodedState.random}. Got: ${paramRandom}`);
        // Clear the state cookie after use
        resCookies.push({
            name: options.cookies.state.name,
            value: "",
            options: { ...options.cookies.state.options, maxAge: 0 },
        });
        return encodedState.value;
    },
};
const NONCE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const nonce = {
    async create(options) {
        if (!options.provider.checks.includes("nonce"))
            return;
        const value = generateRandomNonce();
        const maxAge = NONCE_MAX_AGE;
        const cookie = await signCookie("nonce", value, maxAge, options);
        return { cookie, value };
    },
    /**
     * Returns nonce if the provider is configured to use nonce,
     * and clears the container cookie afterwards.
     * An error is thrown if the nonce is missing or invalid.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
     */
    async use(cookies, resCookies, options) {
        const { provider } = options;
        if (!provider?.checks?.includes("nonce"))
            return;
        const nonce = cookies?.[options.cookies.nonce.name];
        if (!nonce)
            throw new InvalidCheck("Nonce cookie was missing");
        const value = await decode({
            ...options.jwt,
            token: nonce,
            salt: options.cookies.nonce.name,
        });
        if (!value?.value)
            throw new InvalidCheck("Nonce value could not be parsed");
        // Clear the nonce cookie after use
        resCookies.push({
            name: options.cookies.nonce.name,
            value: "",
            options: { ...options.cookies.nonce.options, maxAge: 0 },
        });
        return value.value;
    },
};
/**
 * When the authorization flow contains a state, we check if it's a redirect proxy
 * and if so, we return the random state and the original redirect URL.
 */
function handleState(query, provider, isOnRedirectProxy) {
    let randomState;
    let proxyRedirect;
    if (provider.redirectProxyUrl && !query?.state) {
        throw new InvalidCheck("Missing state in query, but required for redirect proxy");
    }
    const state = decodeState(query?.state);
    randomState = state?.random;
    if (isOnRedirectProxy) {
        if (!state?.origin)
            return { randomState };
        proxyRedirect = `${state.origin}?${new URLSearchParams(query)}`;
    }
    return { randomState, proxyRedirect };
}
const WEBAUTHN_CHALLENGE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const webauthnChallenge = {
    async create(options, challenge, registerData) {
        const maxAge = WEBAUTHN_CHALLENGE_MAX_AGE;
        const data = { challenge, registerData };
        const cookie = await signCookie("webauthnChallenge", JSON.stringify(data), maxAge, options);
        return { cookie };
    },
    /**
     * Returns challenge if present,
     */
    async use(options, cookies, resCookies) {
        const challenge = cookies?.[options.cookies.webauthnChallenge.name];
        if (!challenge)
            throw new InvalidCheck("Challenge cookie missing");
        const value = await decode({
            ...options.jwt,
            token: challenge,
            salt: options.cookies.webauthnChallenge.name,
        });
        if (!value?.value)
            throw new InvalidCheck("Challenge value could not be parsed");
        // Clear the pkce code verifier cookie after use
        const cookie = {
            name: options.cookies.webauthnChallenge.name,
            value: "",
            options: { ...options.cookies.webauthnChallenge.options, maxAge: 0 },
        };
        resCookies.push(cookie);
        return JSON.parse(value.value);
    },
};

/**
 * Handles the following OAuth steps.
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
 * https://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 *
 * @note Although requesting userinfo is not required by the OAuth2.0 spec,
 * we fetch it anyway. This is because we always want a user profile.
 */
async function handleOAuth(query, cookies, options, randomState) {
    const { logger, provider } = options;
    let as;
    const { token, userinfo } = provider;
    // Falls back to authjs.dev if the user only passed params
    if ((!token?.url || token.url.host === "authjs.dev") &&
        (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
        // We assume that issuer is always defined as this has been asserted earlier
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await discoveryRequest(issuer);
        const discoveredAs = await processDiscoveryResponse(issuer, discoveryResponse);
        if (!discoveredAs.token_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
        if (!discoveredAs.userinfo_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        as = discoveredAs;
    }
    else {
        as = {
            issuer: provider.issuer ?? "https://authjs.dev", // TODO: review fallback issuer
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString(),
        };
    }
    const client = {
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        ...provider.client,
    };
    const resCookies = [];
    const state$1 = await state.use(cookies, resCookies, options, randomState);
    const codeGrantParams = validateAuthResponse(as, client, new URLSearchParams(query), provider.checks.includes("state") ? state$1 : skipStateCheck);
    /** https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1 */
    if (isOAuth2Error(codeGrantParams)) {
        const cause = { providerId: provider.id, ...codeGrantParams };
        logger.debug("OAuthCallbackError", cause);
        throw new OAuthCallbackError("OAuth Provider returned an error", cause);
    }
    const codeVerifier = await pkce.use(cookies, resCookies, options);
    let redirect_uri = provider.callbackUrl;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
    }
    let codeGrantResponse = await authorizationCodeGrantRequest(as, client, codeGrantParams, redirect_uri, codeVerifier ?? "auth", // TODO: review fallback code verifier,
    {
        [customFetch]: (...args) => {
            if (!provider.checks.includes("pkce") &&
                args[1]?.body instanceof URLSearchParams) {
                args[1].body.delete("code_verifier");
            }
            return fetch(...args);
        },
        clientPrivateKey: provider.token?.clientPrivateKey,
    });
    if (provider.token?.conform) {
        codeGrantResponse =
            (await provider.token.conform(codeGrantResponse.clone())) ??
                codeGrantResponse;
    }
    let challenges;
    if ((challenges = parseWwwAuthenticateChallenges(codeGrantResponse))) {
        for (const challenge of challenges) {
            console.log("challenge", challenge);
        }
        throw new Error("TODO: Handle www-authenticate challenges as needed");
    }
    let profile = {};
    let tokens;
    if (isOIDCProvider(provider)) {
        const nonce$1 = await nonce.use(cookies, resCookies, options);
        const processedCodeResponse = await processAuthorizationCodeOpenIDResponse(as, client, codeGrantResponse, nonce$1 ?? expectNoNonce);
        if (isOAuth2Error(processedCodeResponse)) {
            console.log("error", processedCodeResponse);
            throw new Error("TODO: Handle OIDC response body error");
        }
        const idTokenClaims = getValidatedIdTokenClaims(processedCodeResponse);
        profile = idTokenClaims;
        if (provider.idToken === false) {
            const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token);
            profile = await processUserInfoResponse(as, client, idTokenClaims.sub, userinfoResponse);
        }
        tokens = processedCodeResponse;
    }
    else {
        const processedCodeResponse = await processAuthorizationCodeOAuth2Response(as, client, codeGrantResponse);
        tokens = processedCodeResponse;
        if (isOAuth2Error(processedCodeResponse)) {
            console.log("error", processedCodeResponse);
            throw new Error("TODO: Handle OAuth 2.0 response body error");
        }
        if (userinfo?.request) {
            const _profile = await userinfo.request({ tokens, provider });
            if (_profile instanceof Object)
                profile = _profile;
        }
        else if (userinfo?.url) {
            const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token);
            profile = await userinfoResponse.json();
        }
        else {
            throw new TypeError("No userinfo endpoint configured");
        }
    }
    if (tokens.expires_in) {
        tokens.expires_at =
            Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
    }
    const profileResult = await getUserAndAccount(profile, provider, tokens, logger);
    return { ...profileResult, profile, cookies: resCookies };
}
/**
 * Returns the user and account that is going to be created in the database.
 * @internal
 */
async function getUserAndAccount(OAuthProfile, provider, tokens, logger) {
    try {
        const userFromProfile = await provider.profile(OAuthProfile, tokens);
        const user = {
            ...userFromProfile,
            id: crypto.randomUUID(),
            email: userFromProfile.email?.toLowerCase(),
        };
        return {
            user,
            account: {
                ...tokens,
                provider: provider.id,
                type: provider.type,
                providerAccountId: userFromProfile.id ?? crypto.randomUUID(),
            },
        };
    }
    catch (e) {
        // If we didn't get a response either there was a problem with the provider
        // response *or* the user cancelled the action with the provider.
        //
        // Unfortunately, we can't tell which - at least not in a way that works for
        // all providers, so we return an empty object; the user should then be
        // redirected back to the sign up page. We log the error to help developers
        // who might be trying to debug this when configuring a new provider.
        logger.debug("getProfile error details", OAuthProfile);
        logger.error(new OAuthProfileParseError(e, { provider: provider.id }));
    }
}

/**
 * Infers the WebAuthn options based on the provided parameters.
 *
 * @param action - The WebAuthn action to perform (optional).
 * @param loggedInUser - The logged-in user (optional).
 * @param userInfoResponse - The response containing user information (optional).
 *
 * @returns The WebAuthn action to perform, or null if no inference could be made.
 */
function inferWebAuthnOptions(action, loggedIn, userInfoResponse) {
    const { user, exists = false } = userInfoResponse ?? {};
    switch (action) {
        case "authenticate": {
            /**
             * Always allow explicit authentication requests.
             */
            return "authenticate";
        }
        case "register": {
            /**
             * Registration is only allowed if:
             * - The user is logged in, meaning the user wants to register a new authenticator.
             * - The user is not logged in and provided user info that does NOT exist, meaning the user wants to register a new account.
             */
            if (user && loggedIn === exists)
                return "register";
            break;
        }
        case undefined: {
            /**
             * When no explicit action is provided, we try to infer it based on the user info provided. These are the possible cases:
             * - Logged in users must always send an explit action, so we bail out in this case.
             * - Otherwise, if no user info is provided, the desired action is authentication without pre-defined authenticators.
             * - Otherwise, if the user info provided is of an existing user, the desired action is authentication with their pre-defined authenticators.
             * - Finally, if the user info provided is of a non-existing user, the desired action is registration.
             */
            if (!loggedIn) {
                if (user) {
                    if (exists) {
                        return "authenticate";
                    }
                    else {
                        return "register";
                    }
                }
                else {
                    return "authenticate";
                }
            }
            break;
        }
    }
    // No decision could be made
    return null;
}
/**
 * Retrieves the registration response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @param resCookies - Optional cookies to be included in the response.
 * @returns A promise that resolves to the WebAuthnOptionsResponse.
 */
async function getRegistrationResponse(options, request, user, resCookies) {
    // Get registration options
    const regOptions = await getRegistrationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await webauthnChallenge.create(options, regOptions.challenge, user);
    return {
        status: 200,
        cookies: [...(resCookies ?? []), cookie],
        body: {
            action: "register",
            options: regOptions,
        },
        headers: {
            "Content-Type": "application/json",
        },
    };
}
/**
 * Retrieves the authentication response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @param resCookies - Optional array of cookies to be included in the response.
 * @returns A promise that resolves to a WebAuthnOptionsResponse object.
 */
async function getAuthenticationResponse(options, request, user, resCookies) {
    // Get authentication options
    const authOptions = await getAuthenticationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await webauthnChallenge.create(options, authOptions.challenge);
    return {
        status: 200,
        cookies: [...(resCookies ?? []), cookie],
        body: {
            action: "authenticate",
            options: authOptions,
        },
        headers: {
            "Content-Type": "application/json",
        },
    };
}
async function verifyAuthenticate(options, request, resCookies) {
    const { adapter, provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string"
        ? JSON.parse(request.body.data)
        : undefined;
    if (!data ||
        typeof data !== "object" ||
        !("id" in data) ||
        typeof data.id !== "string") {
        throw new AuthError("Invalid WebAuthn Authentication response");
    }
    // Reset the ID so we smooth out implementation differences
    const credentialID = toBase64(fromBase64(data.id));
    // Get authenticator from database
    const authenticator = await adapter.getAuthenticator(credentialID);
    if (!authenticator) {
        throw new AuthError(`WebAuthn authenticator not found in database: ${JSON.stringify({
            credentialID,
        })}`);
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge } = await webauthnChallenge.use(options, request.cookies, resCookies);
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyAuthenticationResponse({
            ...provider.verifyAuthenticationOptions,
            expectedChallenge,
            response: data,
            authenticator: fromAdapterAuthenticator(authenticator),
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id,
        });
    }
    catch (e) {
        throw new WebAuthnVerificationError(e);
    }
    const { verified, authenticationInfo } = verification;
    // Make sure the response was verified
    if (!verified) {
        throw new WebAuthnVerificationError("WebAuthn authentication response could not be verified");
    }
    // Update authenticator counter
    try {
        const { newCounter } = authenticationInfo;
        await adapter.updateAuthenticatorCounter(authenticator.credentialID, newCounter);
    }
    catch (e) {
        throw new AdapterError(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({
            credentialID,
            oldCounter: authenticator.counter,
            newCounter: authenticationInfo.newCounter,
        })}`, e);
    }
    // Get the account and user
    const account = await adapter.getAccount(authenticator.providerAccountId, provider.id);
    if (!account) {
        throw new AuthError(`WebAuthn account not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
        })}`);
    }
    const user = await adapter.getUser(account.userId);
    if (!user) {
        throw new AuthError(`WebAuthn user not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
            userID: account.userId,
        })}`);
    }
    return {
        account,
        user,
    };
}
async function verifyRegister(options, request, resCookies) {
    const { provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string"
        ? JSON.parse(request.body.data)
        : undefined;
    if (!data ||
        typeof data !== "object" ||
        !("id" in data) ||
        typeof data.id !== "string") {
        throw new AuthError("Invalid WebAuthn Registration response");
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge, registerData: user } = await webauthnChallenge.use(options, request.cookies, resCookies);
    if (!user) {
        throw new AuthError("Missing user registration data in WebAuthn challenge cookie");
    }
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyRegistrationResponse({
            ...provider.verifyRegistrationOptions,
            expectedChallenge,
            response: data,
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id,
        });
    }
    catch (e) {
        throw new WebAuthnVerificationError(e);
    }
    // Make sure the response was verified
    if (!verification.verified || !verification.registrationInfo) {
        throw new WebAuthnVerificationError("WebAuthn registration response could not be verified");
    }
    // Build a new account
    const account = {
        providerAccountId: toBase64(verification.registrationInfo.credentialID),
        provider: options.provider.id,
        type: provider.type,
    };
    // Build a new authenticator
    const authenticator = {
        providerAccountId: account.providerAccountId,
        counter: verification.registrationInfo.counter,
        credentialID: toBase64(verification.registrationInfo.credentialID),
        credentialPublicKey: toBase64(verification.registrationInfo.credentialPublicKey),
        credentialBackedUp: verification.registrationInfo.credentialBackedUp,
        credentialDeviceType: verification.registrationInfo.credentialDeviceType,
        transports: transportsToString(data.response
            .transports),
    };
    // Return created stuff
    return {
        user,
        account,
        authenticator,
    };
}
/**
 * Generates WebAuthn authentication options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @returns The authentication options.
 */
async function getAuthenticationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user && user["id"]
        ? await adapter.listAuthenticatorsByUserId(user.id)
        : null;
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the authentication options.
    return await provider.simpleWebAuthn.generateAuthenticationOptions({
        ...provider.authenticationOptions,
        rpID: relayingParty.id,
        allowCredentials: authenticators?.map((a) => ({
            id: fromBase64(a.credentialID),
            type: "public-key",
            transports: stringToTransports(a.transports),
        })),
    });
}
/**
 * Generates WebAuthn registration options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @returns The registration options.
 */
async function getRegistrationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user["id"]
        ? await adapter.listAuthenticatorsByUserId(user.id)
        : null;
    // Generate a random user ID for the credential.
    // We can do this because we don't use this user ID to link the
    // credential to the user. Instead, we store actual userID in the
    // Authenticator object and fetch it via it's credential ID.
    const userID = randomString(32);
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the registration options.
    return await provider.simpleWebAuthn.generateRegistrationOptions({
        ...provider.registrationOptions,
        userID,
        userName: user.email,
        userDisplayName: user.name ?? undefined,
        rpID: relayingParty.id,
        rpName: relayingParty.name,
        excludeCredentials: authenticators?.map((a) => ({
            id: fromBase64(a.credentialID),
            type: "public-key",
            transports: stringToTransports(a.transports),
        })),
    });
}
function assertInternalOptionsWebAuthn(options) {
    const { provider, adapter } = options;
    // Adapter is required for WebAuthn
    if (!adapter)
        throw new MissingAdapter("An adapter is required for the WebAuthn provider");
    // Provider must be WebAuthn
    if (!provider || provider.type !== "webauthn") {
        throw new InvalidProvider("Provider must be WebAuthn");
    }
    // Narrow the options type for typed usage later
    return { ...options, provider, adapter };
}
function fromAdapterAuthenticator(authenticator) {
    return {
        ...authenticator,
        credentialDeviceType: authenticator.credentialDeviceType,
        transports: stringToTransports(authenticator.transports),
        credentialID: fromBase64(authenticator.credentialID),
        credentialPublicKey: fromBase64(authenticator.credentialPublicKey),
    };
}
function fromBase64(base64) {
    return new Uint8Array(Buffer.from(base64, "base64"));
}
function toBase64(bytes) {
    return Buffer.from(bytes).toString("base64");
}
function transportsToString(transports) {
    return transports?.join(",");
}
function stringToTransports(tstring) {
    return tstring
        ? tstring.split(",")
        : undefined;
}

// TODO: Make this file smaller
/** Handle callbacks from login services */
async function callback(request, options, sessionStore, cookies) {
    if (!options.provider)
        throw new InvalidProvider("Callback route called without provider");
    const { query, body, method, headers } = request;
    const { provider, adapter, url, callbackUrl, pages, jwt, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger, } = options;
    const useJwtSession = sessionStrategy === "jwt";
    try {
        if (provider.type === "oauth" || provider.type === "oidc") {
            // Use body if the response mode is set to form_post. For all other cases, use query
            const payload = provider.authorization?.url.searchParams.get("response_mode") ===
                "form_post"
                ? body
                : query;
            const { proxyRedirect, randomState } = handleState(payload, provider, options.isOnRedirectProxy);
            if (proxyRedirect) {
                logger.debug("proxy redirect", { proxyRedirect, randomState });
                return { redirect: proxyRedirect };
            }
            const authorizationResult = await handleOAuth(payload, request.cookies, options, randomState);
            if (authorizationResult.cookies.length) {
                cookies.push(...authorizationResult.cookies);
            }
            logger.debug("authorization result", authorizationResult);
            const { user: userFromProvider, account, profile: OAuthProfile, } = authorizationResult;
            // If we don't have a profile object then either something went wrong
            // or the user cancelled signing in. We don't know which, so we just
            // direct the user to the signin page for now. We could do something
            // else in future.
            // TODO: Handle user cancelling signin
            if (!userFromProvider || !account || !OAuthProfile) {
                return { redirect: `${url}/signin`, cookies };
            }
            // Check if user is allowed to sign in
            // Attempt to get Profile from OAuth provider details before invoking
            // signIn callback - but if no user object is returned, that is fine
            // (that just means it's a new user signing in for the first time).
            let userByAccount;
            if (adapter) {
                const { getUserByAccount } = adapter;
                userByAccount = await getUserByAccount({
                    providerAccountId: account.providerAccountId,
                    provider: provider.id,
                });
            }
            const redirect = await handleAuthorized({
                user: userByAccount ?? userFromProvider,
                account,
                profile: OAuthProfile,
            }, options);
            if (redirect)
                return { redirect, cookies };
            const { user, session, isNewUser } = await handleLoginOrRegister(sessionStore.value, userFromProvider, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: user.name,
                    email: user.email,
                    picture: user.image,
                    sub: user.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user,
                    account,
                    profile: OAuthProfile,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({
                user,
                account,
                profile: OAuthProfile,
                isNewUser,
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "email") {
            const token = query?.token;
            const identifier = query?.email;
            if (!token || !identifier) {
                const e = new TypeError("Missing token or email. The sign-in URL was manually opened without token/identifier or the link was not sent correctly in the email.", { cause: { hasToken: !!token, hasEmail: !!identifier } });
                e.name = "Configuration";
                throw e;
            }
            const secret = provider.secret ?? options.secret;
            // @ts-expect-error -- Verified in `assertConfig`.
            const invite = await adapter.useVerificationToken({
                identifier,
                token: await createHash(`${token}${secret}`),
            });
            const hasInvite = !!invite;
            const expired = invite ? invite.expires.valueOf() < Date.now() : undefined;
            const invalidInvite = !hasInvite || expired;
            if (invalidInvite)
                throw new Verification({ hasInvite, expired });
            const user = (await adapter.getUserByEmail(identifier)) ?? {
                id: crypto.randomUUID(),
                email: identifier,
                emailVerified: null,
            };
            const account = {
                providerAccountId: user.email,
                userId: user.id,
                type: "email",
                provider: provider.id,
            };
            const redirect = await handleAuthorized({ user, account }, options);
            if (redirect)
                return { redirect, cookies };
            // Sign user in
            const { user: loggedInUser, session, isNewUser, } = await handleLoginOrRegister(sessionStore.value, user, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({ user: loggedInUser, account, isNewUser });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "credentials" && method === "POST") {
            const credentials = body ?? {};
            // TODO: Forward the original request as is, instead of reconstructing it
            Object.entries(query ?? {}).forEach(([k, v]) => url.searchParams.set(k, v));
            const userFromAuthorize = await provider.authorize(credentials, 
            // prettier-ignore
            new Request(url, { headers, method, body: JSON.stringify(body) }));
            const user = userFromAuthorize;
            if (!user)
                throw new CredentialsSignin();
            else
                user.id = user.id?.toString() ?? crypto.randomUUID();
            const account = {
                providerAccountId: user.id,
                type: "credentials",
                provider: provider.id,
            };
            const redirect = await handleAuthorized({ user, account, credentials }, options);
            if (redirect)
                return { redirect, cookies };
            const defaultToken = {
                name: user.name,
                email: user.email,
                picture: user.image,
                sub: user.id,
            };
            const token = await callbacks.jwt({
                token: defaultToken,
                user,
                account,
                isNewUser: false,
                trigger: "signIn",
            });
            // Clear cookies if token is null
            if (token === null) {
                cookies.push(...sessionStore.clean());
            }
            else {
                const salt = options.cookies.sessionToken.name;
                // Encode token
                const newToken = await jwt.encode({ ...jwt, token, salt });
                // Set cookie expiry date
                const cookieExpires = new Date();
                cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: cookieExpires,
                });
                cookies.push(...sessionCookies);
            }
            await events.signIn?.({ user, account });
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "webauthn" && method === "POST") {
            // Get callback action from request. It should be either "authenticate" or "register"
            const action = request.body?.action;
            if (typeof action !== "string" ||
                (action !== "authenticate" && action !== "register")) {
                throw new AuthError("Invalid action parameter");
            }
            // Return an error if the adapter is missing or if the provider
            // is not a webauthn provider.
            const localOptions = assertInternalOptionsWebAuthn(options);
            // Verify request to get user, account and authenticator
            let user;
            let account;
            let authenticator;
            switch (action) {
                case "authenticate": {
                    const verified = await verifyAuthenticate(localOptions, request, cookies);
                    user = verified.user;
                    account = verified.account;
                    break;
                }
                case "register": {
                    const verified = await verifyRegister(options, request, cookies);
                    user = verified.user;
                    account = verified.account;
                    authenticator = verified.authenticator;
                    break;
                }
            }
            // Check if user is allowed to sign in
            await handleAuthorized({ user, account }, options);
            // Sign user in, creating them and their account if needed
            const { user: loggedInUser, isNewUser, session, account: currentAccount, } = await handleLoginOrRegister(sessionStore.value, user, account, options);
            if (!currentAccount) {
                // This is mostly for type checking. It should never actually happen.
                throw new AuthError("Error creating or finding account");
            }
            // Create new authenticator if needed
            if (authenticator && loggedInUser.id) {
                await localOptions.adapter.createAuthenticator({
                    ...authenticator,
                    userId: loggedInUser.id,
                });
            }
            // Do the session registering dance
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account: currentAccount,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account: currentAccount,
                isNewUser,
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return { redirect: callbackUrl, cookies };
        }
        throw new InvalidProvider(`Callback for provider type (${provider.type}) is not supported`);
    }
    catch (e) {
        if (e instanceof AuthError)
            throw e;
        const error = new CallbackRouteError(e, { provider: provider.id });
        logger.debug("callback route error details", { method, query, body });
        throw error;
    }
}
async function handleAuthorized(params, config) {
    let authorized;
    const { signIn, redirect } = config.callbacks;
    try {
        authorized = await signIn(params);
    }
    catch (e) {
        if (e instanceof AuthError)
            throw e;
        throw new AccessDenied(e);
    }
    if (!authorized)
        throw new AccessDenied("AccessDenied");
    if (typeof authorized !== "string")
        return;
    return await redirect({ url: authorized, baseUrl: config.url.origin });
}

/** Return a session object filtered via `callbacks.session` */
async function session(options, sessionStore, cookies, isUpdate, newSession) {
    const { adapter, jwt, events, callbacks, logger, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, } = options;
    const response = {
        body: null,
        headers: { "Content-Type": "application/json" },
        cookies,
    };
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return response;
    if (sessionStrategy === "jwt") {
        try {
            const salt = options.cookies.sessionToken.name;
            const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
            if (!payload)
                throw new Error("Invalid JWT");
            // @ts-expect-error
            const token = await callbacks.jwt({
                token: payload,
                ...(isUpdate && { trigger: "update" }),
                session: newSession,
            });
            const newExpires = fromDate(sessionMaxAge);
            if (token !== null) {
                // By default, only exposes a limited subset of information to the client
                // as needed for presentation purposes (e.g. "you are logged in as...").
                const session = {
                    user: { name: token.name, email: token.email, image: token.picture },
                    expires: newExpires.toISOString(),
                };
                // @ts-expect-error
                const newSession = await callbacks.session({ session, token });
                // Return session payload as response
                response.body = newSession;
                // Refresh JWT expiry by re-signing it, with an updated expiry date
                const newToken = await jwt.encode({ ...jwt, token, salt });
                // Set cookie, to also update expiry date on cookie
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: newExpires,
                });
                response.cookies?.push(...sessionCookies);
                await events.session?.({ session: newSession, token });
            }
            else {
                response.cookies?.push(...sessionStore.clean());
            }
        }
        catch (e) {
            logger.error(new JWTSessionError(e));
            // If the JWT is not verifiable remove the broken session cookie(s).
            response.cookies?.push(...sessionStore.clean());
        }
        return response;
    }
    // Retrieve session from database
    try {
        const { getSessionAndUser, deleteSession, updateSession } = adapter;
        let userAndSession = await getSessionAndUser(sessionToken);
        // If session has expired, clean up the database
        if (userAndSession &&
            userAndSession.session.expires.valueOf() < Date.now()) {
            await deleteSession(sessionToken);
            userAndSession = null;
        }
        if (userAndSession) {
            const { user, session } = userAndSession;
            const sessionUpdateAge = options.session.updateAge;
            // Calculate last updated date to throttle write updates to database
            // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
            //     e.g. ({expiry date} - 30 days) + 1 hour
            const sessionIsDueToBeUpdatedDate = session.expires.valueOf() -
                sessionMaxAge * 1000 +
                sessionUpdateAge * 1000;
            const newExpires = fromDate(sessionMaxAge);
            // Trigger update of session expiry date and write to database, only
            // if the session was last updated more than {sessionUpdateAge} ago
            if (sessionIsDueToBeUpdatedDate <= Date.now()) {
                await updateSession({
                    sessionToken: sessionToken,
                    expires: newExpires,
                });
            }
            // Pass Session through to the session callback
            const sessionPayload = await callbacks.session({
                // TODO: user already passed below,
                // remove from session object in https://github.com/nextauthjs/next-auth/pull/9702
                // @ts-expect-error
                session: { ...session, user },
                user,
                newSession,
                ...(isUpdate ? { trigger: "update" } : {}),
            });
            // Return session payload as response
            response.body = sessionPayload;
            // Set cookie again to update expiry
            response.cookies?.push({
                name: options.cookies.sessionToken.name,
                value: sessionToken,
                options: {
                    ...options.cookies.sessionToken.options,
                    expires: newExpires,
                },
            });
            // @ts-expect-error
            await events.session?.({ session: sessionPayload });
        }
        else if (sessionToken) {
            // If `sessionToken` was found set but it's not valid for a session then
            // remove the sessionToken cookie from browser.
            response.cookies?.push(...sessionStore.clean());
        }
    }
    catch (e) {
        logger.error(new SessionTokenError(e));
    }
    return response;
}

/**
 * Generates an authorization/request token URL.
 *
 * [OAuth 2](https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/)
 */
async function getAuthorizationUrl(query, options) {
    const { logger, provider } = options;
    let url = provider.authorization?.url;
    // Falls back to authjs.dev if the user only passed params
    if (!url || url.host === "authjs.dev") {
        // If url is undefined, we assume that issuer is always defined
        // We check this in assert.ts
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await discoveryRequest(issuer);
        const as = await processDiscoveryResponse(issuer, discoveryResponse);
        if (!as.authorization_endpoint) {
            throw new TypeError("Authorization server did not provide an authorization endpoint.");
        }
        url = new URL(as.authorization_endpoint);
    }
    const authParams = url.searchParams;
    let redirect_uri = provider.callbackUrl;
    let data;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
        data = { origin: provider.callbackUrl };
        logger.debug("using redirect proxy", { redirect_uri, data });
    }
    const params = Object.assign({
        response_type: "code",
        // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
        client_id: provider.clientId,
        redirect_uri,
        // @ts-expect-error TODO:
        ...provider.authorization?.params,
    }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
    for (const k in params)
        authParams.set(k, params[k]);
    const cookies = [];
    const state$1 = await state.create(options, data);
    if (state$1) {
        authParams.set("state", state$1.value);
        cookies.push(state$1.cookie);
    }
    if (provider.checks?.includes("pkce")) {
        {
            const { value, cookie } = await pkce.create(options);
            authParams.set("code_challenge", value);
            authParams.set("code_challenge_method", "S256");
            cookies.push(cookie);
        }
    }
    const nonce$1 = await nonce.create(options);
    if (nonce$1) {
        authParams.set("nonce", nonce$1.value);
        cookies.push(nonce$1.cookie);
    }
    // TODO: This does not work in normalizeOAuth because authorization endpoint can come from discovery
    // Need to make normalizeOAuth async
    if (provider.type === "oidc" && !url.searchParams.has("scope")) {
        url.searchParams.set("scope", "openid profile email");
    }
    logger.debug("authorization url is ready", { url, cookies, provider });
    return { redirect: url.toString(), cookies };
}

/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter).
 * At the end, it returns a redirect to the `verify-request` page.
 */
async function sendToken(request, options) {
    const { body } = request;
    const { provider, callbacks, adapter } = options;
    const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
    const email = normalizer(body?.email);
    const defaultUser = { id: crypto.randomUUID(), email, emailVerified: null };
    const user = (await adapter.getUserByEmail(email)) ?? defaultUser;
    const account = {
        providerAccountId: email,
        userId: user.id,
        type: "email",
        provider: provider.id,
    };
    let authorized;
    try {
        authorized = await callbacks.signIn({
            user,
            account,
            email: { verificationRequest: true },
        });
    }
    catch (e) {
        throw new AccessDenied(e);
    }
    if (!authorized)
        throw new AccessDenied("AccessDenied");
    if (typeof authorized === "string") {
        return {
            redirect: await callbacks.redirect({
                url: authorized,
                baseUrl: options.url.origin,
            }),
        };
    }
    const { callbackUrl, theme } = options;
    const token = (await provider.generateVerificationToken?.()) ?? randomString(32);
    const ONE_DAY_IN_SECONDS = 86400;
    const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000);
    const secret = provider.secret ?? options.secret;
    const baseUrl = new URL(options.basePath, options.url.origin);
    const sendRequest = provider.sendVerificationRequest({
        identifier: email,
        token,
        expires,
        url: `${baseUrl}/callback/${provider.id}?${new URLSearchParams({
            callbackUrl,
            token,
            email,
        })}`,
        provider,
        theme,
        request: toRequest(request),
    });
    const createToken = adapter.createVerificationToken?.({
        identifier: email,
        token: await createHash(`${token}${secret}`),
        expires,
    });
    await Promise.all([sendRequest, createToken]);
    return {
        redirect: `${baseUrl}/verify-request?${new URLSearchParams({
            provider: provider.id,
            type: provider.type,
        })}`,
    };
}
function defaultNormalizer(email) {
    if (!email)
        throw new Error("Missing email from request body.");
    // Get the first two elements only,
    // separated by `@` from user input.
    let [local, domain] = email.toLowerCase().trim().split("@");
    // The part before "@" can contain a ","
    // but we remove it on the domain part
    domain = domain.split(",")[0];
    return `${local}@${domain}`;
}

async function signIn$2(request, cookies, options) {
    const signInUrl = `${options.url.origin}${options.basePath}/signin`;
    if (!options.provider)
        return { redirect: signInUrl, cookies };
    switch (options.provider.type) {
        case "oauth":
        case "oidc": {
            const { redirect, cookies: authCookies } = await getAuthorizationUrl(request.query, options);
            if (authCookies)
                cookies.push(...authCookies);
            return { redirect, cookies };
        }
        case "email": {
            const response = await sendToken(request, options);
            return { ...response, cookies };
        }
        default:
            return { redirect: signInUrl, cookies };
    }
}

/**
 * Destroys the session.
 * If the session strategy is database,
 * The session is also deleted from the database.
 * In any case, the session cookie is cleared and
 * {@link AuthConfig["events"].signOut} is emitted.
 */
async function signOut$1(cookies, sessionStore, options) {
    const { jwt, events, callbackUrl: redirect, logger, session } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return { redirect, cookies };
    try {
        if (session.strategy === "jwt") {
            const salt = options.cookies.sessionToken.name;
            const token = await jwt.decode({ ...jwt, token: sessionToken, salt });
            await events.signOut?.({ token });
        }
        else {
            const session = await options.adapter?.deleteSession(sessionToken);
            await events.signOut?.({ session });
        }
    }
    catch (e) {
        logger.error(new SignOutError(e));
    }
    cookies.push(...sessionStore.clean());
    return { redirect, cookies };
}

/**
 * Returns the currently logged in user, if any.
 */
async function getLoggedInUser(options, sessionStore) {
    const { adapter, jwt, session: { strategy: sessionStrategy }, } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return null;
    // Try to decode JWT
    if (sessionStrategy === "jwt") {
        const salt = options.cookies.sessionToken.name;
        const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
        if (payload && payload.sub) {
            return {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                image: payload.picture,
            };
        }
    }
    else {
        const userAndSession = await adapter?.getSessionAndUser(sessionToken);
        if (userAndSession) {
            return userAndSession.user;
        }
    }
    return null;
}

/**
 * Returns authentication or registration options for a WebAuthn flow
 * depending on the parameters provided.
 */
async function webAuthnOptions(request, options, sessionStore, cookies) {
    // Return an error if the adapter is missing or if the provider
    // is not a webauthn provider.
    const narrowOptions = assertInternalOptionsWebAuthn(options);
    const { provider } = narrowOptions;
    // Extract the action from the query parameters
    const { action } = (request.query ?? {});
    // Action must be either "register", "authenticate", or undefined
    if (action !== "register" &&
        action !== "authenticate" &&
        typeof action !== "undefined") {
        return {
            status: 400,
            body: { error: "Invalid action" },
            cookies,
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    // Get the user info from the session
    const sessionUser = await getLoggedInUser(options, sessionStore);
    // Extract user info from request
    // If session user exists, we don't need to call getUserInfo
    const getUserInfoResponse = sessionUser
        ? {
            user: sessionUser,
            exists: true,
        }
        : await provider.getUserInfo(options, request);
    const userInfo = getUserInfoResponse?.user;
    // Make a decision on what kind of webauthn options to return
    const decision = inferWebAuthnOptions(action, !!sessionUser, getUserInfoResponse);
    switch (decision) {
        case "authenticate":
            return getAuthenticationResponse(narrowOptions, request, userInfo, cookies);
        case "register":
            if (typeof userInfo?.email === "string") {
                return getRegistrationResponse(narrowOptions, request, userInfo, cookies);
            }
        default:
            return {
                status: 400,
                body: { error: "Invalid request" },
                cookies,
                headers: {
                    "Content-Type": "application/json",
                },
            };
    }
}

/** @internal */
async function AuthInternal(request, authOptions) {
    const { action, providerId, error, method } = request;
    const csrfDisabled = authOptions.skipCSRFCheck === skipCSRFCheck;
    const { options, cookies } = await init({
        authOptions,
        action,
        providerId,
        url: request.url,
        callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
        csrfToken: request.body?.csrfToken,
        cookies: request.cookies,
        isPost: method === "POST",
        csrfDisabled,
    });
    const sessionStore = new SessionStore(options.cookies.sessionToken, request.cookies, options.logger);
    if (method === "GET") {
        const render = renderPage({ ...options, query: request.query, cookies });
        switch (action) {
            case "callback":
                return await callback(request, options, sessionStore, cookies);
            case "csrf":
                return render.csrf(csrfDisabled, options, cookies);
            case "error":
                return render.error(error);
            case "providers":
                return render.providers(options.providers);
            case "session":
                return await session(options, sessionStore, cookies);
            case "signin":
                return render.signin(providerId, error);
            case "signout":
                return render.signout();
            case "verify-request":
                return render.verifyRequest();
            case "webauthn-options":
                return await webAuthnOptions(request, options, sessionStore, cookies);
        }
    }
    else {
        const { csrfTokenVerified } = options;
        switch (action) {
            case "callback":
                if (options.provider.type === "credentials")
                    // Verified CSRF Token required for credentials providers only
                    validateCSRF(action, csrfTokenVerified);
                return await callback(request, options, sessionStore, cookies);
            case "session":
                validateCSRF(action, csrfTokenVerified);
                return await session(options, sessionStore, cookies, true, request.body?.data);
            case "signin":
                validateCSRF(action, csrfTokenVerified);
                return await signIn$2(request, cookies, options);
            case "signout":
                validateCSRF(action, csrfTokenVerified);
                return await signOut$1(cookies, sessionStore, options);
        }
    }
    throw new UnknownAction(`Cannot handle action: ${action}`);
}
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js comes with built-in CSRF protection, but
 * if you are implementing a framework that is already protected against CSRF attacks, you can skip this check by
 * passing this value to {@link AuthConfig.skipCSRFCheck}.
 */
const skipCSRFCheck = Symbol("skip-csrf-check");
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js returns a web standard {@link Response} by default, but
 * if you are implementing a framework you might want to get access to the raw internal response
 * by passing this value to {@link AuthConfig.raw}.
 */
const raw = Symbol("return-type-raw");

/** Set default env variables on the config object */
function setEnvDefaults$1(envObject, config) {
    try {
        const url = envObject.AUTH_URL;
        if (url && !config.basePath)
            config.basePath = new URL(url).pathname;
    }
    catch {
    }
    finally {
        config.basePath ?? (config.basePath = `/auth`);
    }
    if (!config.secret?.length) {
        config.secret = [];
        const secret = envObject.AUTH_SECRET;
        if (secret)
            config.secret.push(secret);
        for (const i of [1, 2, 3]) {
            const secret = envObject[`AUTH_SECRET_${i}`];
            if (secret)
                config.secret.unshift(secret);
        }
    }
    config.redirectProxyUrl ?? (config.redirectProxyUrl = envObject.AUTH_REDIRECT_PROXY_URL);
    config.trustHost ?? (config.trustHost = !!(envObject.AUTH_URL ??
        envObject.AUTH_TRUST_HOST ??
        envObject.VERCEL ??
        envObject.CF_PAGES ??
        envObject.NODE_ENV !== "production"));
    config.providers = config.providers.map((p) => {
        const finalProvider = typeof p === "function" ? p({}) : p;
        const ID = finalProvider.id.toUpperCase().replace(/-/g, "_");
        if (finalProvider.type === "oauth" || finalProvider.type === "oidc") {
            finalProvider.clientId ?? (finalProvider.clientId = envObject[`AUTH_${ID}_ID`]);
            finalProvider.clientSecret ?? (finalProvider.clientSecret = envObject[`AUTH_${ID}_SECRET`]);
            if (finalProvider.type === "oidc") {
                finalProvider.issuer ?? (finalProvider.issuer = envObject[`AUTH_${ID}_ISSUER`]);
            }
        }
        else if (finalProvider.type === "email") {
            finalProvider.apiKey ?? (finalProvider.apiKey = envObject[`AUTH_${ID}_KEY`]);
        }
        return finalProvider;
    });
}
function createActionURL(action, protocol, headers, envObject, basePath) {
    let envUrl = envObject.AUTH_URL ?? envObject.NEXTAUTH_URL;
    let url;
    if (envUrl) {
        url = new URL(envUrl);
        if (basePath && basePath !== "/" && url.pathname !== "/") {
            logger.warn(url.pathname === basePath
                ? "env-url-basepath-redundant"
                : "env-url-basepath-mismatch");
            url.pathname = "/";
        }
    }
    else {
        const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
        const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol ?? "https";
        const _protocol = detectedProtocol.endsWith(":")
            ? detectedProtocol
            : detectedProtocol + ":";
        url = new URL(`${_protocol}//${detectedHost}`);
    }
    // remove trailing slash
    const sanitizedUrl = url.toString().replace(/\/$/, "");
    if (basePath) {
        // remove leading and trailing slash
        const sanitizedBasePath = basePath?.replace(/(^\/|\/$)/g, "") ?? "";
        return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
    }
    return new URL(`${sanitizedUrl}/${action}`);
}

/**
 *
 * :::warning Experimental
 * `@auth/core` is under active development.
 * :::
 *
 * This is the main entry point to the Auth.js library.
 *
 * Based on the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Request}
 * and {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response} Web standard APIs.
 * Primarily used to implement [framework](https://authjs.dev/getting-started/integrations)-specific packages,
 * but it can also be used directly.
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {...})
 *
 * console.log(response instanceof Response) // true
 * ```
 *
 * ## Resources
 *
 * - [Getting started](https://authjs.dev/getting-started)
 * - [Guides](https://authjs.dev/guides)
 *
 * @module @auth/core
 */
/**
 * Core functionality provided by Auth.js.
 *
 * Receives a standard {@link Request} and returns a {@link Response}.
 *
 * @example
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {
 *   providers: [Google],
 *   secret: "...",
 *   trustHost: true,
 * })
 *```
 * @see [Documentation](https://authjs.dev)
 */
async function Auth(request, config) {
    setLogger(config.logger, config.debug);
    const internalRequest = await toInternalRequest(request, config);
    // There was an error parsing the request
    if (!internalRequest)
        return Response.json(`Bad request.`, { status: 400 });
    const warningsOrError = assertConfig(internalRequest, config);
    if (Array.isArray(warningsOrError)) {
        warningsOrError.forEach(logger.warn);
    }
    else if (warningsOrError) {
        // If there's an error in the user config, bail out early
        logger.error(warningsOrError);
        const htmlPages = new Set([
            "signin",
            "signout",
            "error",
            "verify-request",
        ]);
        if (!htmlPages.has(internalRequest.action) ||
            internalRequest.method !== "GET") {
            const message = "There was a problem with the server configuration. Check the server logs for more information.";
            return Response.json({ message }, { status: 500 });
        }
        const { pages, theme } = config;
        // If this is true, the config required auth on the error page
        // which could cause a redirect loop
        const authOnErrorPage = pages?.error &&
            internalRequest.url.searchParams
                .get("callbackUrl")
                ?.startsWith(pages.error);
        // Either there was no error page configured or the configured one contains infinite redirects
        if (!pages?.error || authOnErrorPage) {
            if (authOnErrorPage) {
                logger.error(new ErrorPageLoop(`The error page ${pages?.error} should not require authentication`));
            }
            const page = renderPage({ theme }).error("Configuration");
            return toResponse(page);
        }
        return Response.redirect(`${pages.error}?error=Configuration`);
    }
    const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
    const isRaw = config.raw === raw;
    try {
        const internalResponse = await AuthInternal(internalRequest, config);
        if (isRaw)
            return internalResponse;
        const response = toResponse(internalResponse);
        const url = response.headers.get("Location");
        if (!isRedirect || !url)
            return response;
        return Response.json({ url }, { headers: response.headers });
    }
    catch (e) {
        const error = e;
        logger.error(error);
        const isAuthError = error instanceof AuthError;
        if (isAuthError && isRaw && !isRedirect)
            throw error;
        // If the CSRF check failed for POST/session, return a 400 status code.
        // We should not redirect to a page as this is an API route
        if (request.method === "POST" && internalRequest.action === "session")
            return Response.json(null, { status: 400 });
        const isClientSafeErrorType = isClientError(error);
        const type = isClientSafeErrorType ? error.type : "Configuration";
        const params = new URLSearchParams({ error: type });
        if (error instanceof CredentialsSignin)
            params.set("code", error.code);
        const pageKind = (isAuthError && error.kind) || "error";
        const pagePath = config.pages?.[pageKind] ?? `${config.basePath}/${pageKind.toLowerCase()}`;
        const url = `${internalRequest.url.origin}${pagePath}?${params}`;
        if (isRedirect)
            return Response.json({ url });
        return Response.redirect(url);
    }
}

/**
 * Add Google login to your page.
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/google
 * ```
 *
 * #### Configuration
 *```ts
 * import { Auth } from "@auth/core"
 * import Google from "@auth/core/providers/google"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [
 *     Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 *  - [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
 *  - [Google OAuth Configuration](https://console.developers.google.com/apis/credentials)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the Google provider is
 * based on the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *
 *
 * The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;
 *
 * - For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
 * - For development: `http://localhost:3000/api/auth/callback/google`
 *
 * :::warning
 * Google only provides Refresh Token to an application the first time a user signs in.
 *
 * To force Google to re-issue a Refresh Token, the user needs to remove the application from their account and sign in again:
 * https://myaccount.google.com/permissions
 *
 * Alternatively, you can also pass options in the `params` object of `authorization` which will force the Refresh Token to always be provided on sign in, however this will ask all users to confirm if they wish to grant your application access every time they sign in.
 *
 * If you need access to the RefreshToken or AccessToken for a Google account and you are not using a database to persist user accounts, this may be something you need to do.
 *
 * ```ts
 * const options = {
 *   providers: [
 *     Google({
 *       clientId: process.env.GOOGLE_ID,
 *       clientSecret: process.env.GOOGLE_SECRET,
 *       authorization: {
 *         params: {
 *           prompt: "consent",
 *           access_type: "offline",
 *           response_type: "code"
 *         }
 *       }
 *     })
 *   ],
 * }
 * ```
 *
 * :::
 *
 * :::tip
 * Google also returns a `email_verified` boolean property in the OAuth profile.
 *
 * You can use this property to restrict access to people with verified accounts at a particular domain.
 *
 * ```ts
 * const options = {
 *   ...
 *   callbacks: {
 *     async signIn({ account, profile }) {
 *       if (account.provider === "google") {
 *         return profile.email_verified && profile.email.endsWith("@example.com")
 *       }
 *       return true // Do different verification for other providers that don't have `email_verified`
 *     },
 *   }
 *   ...
 * }
 * ```
 *
 * :::
 * :::tip
 *
 * The Google provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/google.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */
function Google(options) {
    return {
        id: "google",
        name: "Google",
        type: "oidc",
        issuer: "https://accounts.google.com",
        style: {
            brandColor: "#1a73e8",
        },
        options,
    };
}

/**
 * The Credentials provider allows you to handle signing in with arbitrary credentials,
 * such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
 *
 * It is intended to support use cases where you have an existing system you need to authenticate users against.
 *
 * It comes with the constraint that users authenticated in this manner are not persisted in the database,
 * and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
 *
 * :::caution
 * The functionality provided for credentials-based authentication is intentionally limited to discourage the use of passwords due to the inherent security risks of the username-password model.
 *
 * OAuth providers spend significant amounts of money, time, and engineering effort to build:
 *
 * - abuse detection (bot-protection, rate-limiting)
 * - password management (password reset, credential stuffing, rotation)
 * - data security (encryption/salting, strength validation)
 *
 * and much more for authentication solutions. It is likely that your application would benefit from leveraging these battle-tested solutions rather than try to rebuild them from scratch.
 *
 * If you'd still like to build password-based authentication for your application despite these risks, Auth.js gives you full control to do so.
 *
 * :::
 *
 * See the [callbacks documentation](/reference/core#authconfig#callbacks) for more information on how to interact with the token. For example, you can add additional information to the token by returning an object from the `jwt()` callback:
 *
 * ```ts
 * callbacks: {
 *   async jwt({ token, user, account, profile, isNewUser }) {
 *     if (user) {
 *       token.id = user.id
 *     }
 *     return token
 *   }
 * }
 * ```
 *
 * @example
 * ```ts
 * import { Auth } from "@auth/core"
 * import Credentials from "@auth/core/providers/credentials"
 *
 * const request = new Request("https://example.com")
 * const response = await AuthHandler(request, {
 *   providers: [
 *     Credentials({
 *       credentials: {
 *         username: { label: "Username" },
 *         password: {  label: "Password", type: "password" }
 *       },
 *       async authorize({ request }) {
 *         const response = await fetch(request)
 *         if(!response.ok) return null
 *         return await response.json() ?? null
 *       }
 *     })
 *   ],
 *   secret: "...",
 *   trustHost: true,
 * })
 * ```
 * @see [Username/Password Example](https://authjs.dev/getting-started/authentication/credentials)
 */
function Credentials(config) {
    return {
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {},
        authorize: () => null,
        // @ts-expect-error
        options: config,
    };
}

const dev = DEV;
function setEnvDefaults(envObject, config) {
  config.trustHost ??= dev;
  config.basePath = `${base}/auth`;
  config.skipCSRFCheck = skipCSRFCheck;
  setEnvDefaults$1(envObject, config);
}
async function signIn$1(provider, options = {}, authorizationParams, config, event) {
  const { request, url: { protocol } } = event;
  const headers = new Headers(request.headers);
  const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
  const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
  const base2 = createActionURL("signin", protocol, headers, private_env, config.basePath);
  if (!provider) {
    const url2 = `${base2}?${new URLSearchParams({ callbackUrl })}`;
    if (shouldRedirect)
      redirect(302, url2);
    return url2;
  }
  let url = `${base2}/${provider}?${new URLSearchParams(authorizationParams)}`;
  let foundProvider = void 0;
  for (const _provider of config.providers) {
    const { id } = typeof _provider === "function" ? _provider() : _provider;
    if (id === provider) {
      foundProvider = id;
      break;
    }
  }
  if (!foundProvider) {
    const url2 = `${base2}?${new URLSearchParams({ callbackUrl })}`;
    if (shouldRedirect)
      redirect(302, url2);
    return url2;
  }
  if (foundProvider === "credentials") {
    url = url.replace("signin", "callback");
  }
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  const body = new URLSearchParams({ ...rest, callbackUrl });
  const req = new Request(url, { method: "POST", headers, body });
  const res = await Auth(req, { ...config, raw });
  for (const c of res?.cookies ?? []) {
    event.cookies.set(c.name, c.value, { path: "/", ...c.options });
  }
  if (shouldRedirect) {
    return redirect(302, res.redirect);
  }
  return res.redirect;
}
async function signOut(options, config, event) {
  const { request, url: { protocol } } = event;
  const headers = new Headers(request.headers);
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  const url = createActionURL("signout", protocol, headers, private_env, config.basePath);
  const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
  const body = new URLSearchParams({ callbackUrl });
  const req = new Request(url, { method: "POST", headers, body });
  const res = await Auth(req, { ...config, raw });
  for (const c of res?.cookies ?? [])
    event.cookies.set(c.name, c.value, { path: "/", ...c.options });
  if (options?.redirect ?? true)
    return redirect(302, res.redirect);
  return res;
}
async function auth(event, config) {
  setEnvDefaults(private_env, config);
  config.trustHost ??= true;
  const { request: req, url: { protocol } } = event;
  const sessionUrl = createActionURL("session", protocol, req.headers, private_env, config.basePath);
  const request = new Request(sessionUrl, {
    headers: { cookie: req.headers.get("cookie") ?? "" }
  });
  const response = await Auth(request, config);
  const authCookies = setCookieExports.parse(response.headers.getSetCookie());
  for (const cookie of authCookies) {
    const { name, value, ...options } = cookie;
    event.cookies.set(name, value, { path: "/", ...options });
  }
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const authorizationParamsPrefix = "authorizationParams-";
function SvelteKitAuth(config) {
  return {
    signIn: async (event) => {
      const { request } = event;
      const _config = typeof config === "object" ? config : await config(event);
      setEnvDefaults(private_env, _config);
      const formData = await request.formData();
      const { providerId: provider, ...options } = Object.fromEntries(formData);
      let authorizationParams = {};
      let _options = {};
      for (const key in options) {
        if (key.startsWith(authorizationParamsPrefix)) {
          authorizationParams[key.slice(authorizationParamsPrefix.length)] = options[key];
        } else {
          _options[key] = options[key];
        }
      }
      await signIn$1(provider, _options, authorizationParams, _config, event);
    },
    signOut: async (event) => {
      const _config = typeof config === "object" ? config : await config(event);
      setEnvDefaults(private_env, _config);
      const options = Object.fromEntries(await event.request.formData());
      await signOut(options, _config, event);
    },
    async handle({ event, resolve }) {
      const _config = typeof config === "object" ? config : await config(event);
      setEnvDefaults(private_env, _config);
      const { url, request } = event;
      event.locals.auth ??= () => auth(event, _config);
      event.locals.getSession ??= event.locals.auth;
      const action = url.pathname.slice(
        // @ts-expect-error - basePath is defined in setEnvDefaults
        _config.basePath.length + 1
      ).split("/")[0];
      if (isAuthAction(action) && url.pathname.startsWith(_config.basePath + "/")) {
        return Auth(request, _config);
      }
      return resolve(event);
    }
  };
}
function CustomAdapter(db2) {
  return {
    createUser: async ({ id: _id, ...data }) => {
      const payload = {
        name: data.name,
        email: data.email,
        emailVerified: data.emailVerified,
        image: data.image
      };
      const { data: userData } = await User.createUser(payload);
      return {
        id: userData.id_member,
        email: data.email,
        name: data.name,
        image: data.image,
        emailVerified: data.emailVerified
      };
    },
    getUser: async (id) => {
      const row = await User.getUserById(id);
      if (row) {
        return {
          id: row.id_member,
          name: row.name,
          email: row.email,
          emailVerified: row.email_verified,
          image: row.image
        };
      }
      return null;
    },
    getUserByEmail: async (email) => {
      const user = await User.getUserByEmail(email);
      if (user) {
        return {
          id: user.id_member,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified,
          image: user.image
        };
      }
      return null;
    },
    getUserByAccount: async ({ providerAccountId, provider }) => {
      const user = await User.getAccountByProvider(providerAccountId, provider);
      if (user) {
        return {
          id: user.id_member,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified,
          image: user.image
        };
      }
      return null;
    },
    updateUser: async ({ id, ...data }) => {
      const res = await db2.query("update mt_member set email = $1, name = $2, image = $3", [
        data.email,
        data.name,
        data.image
      ]);
      const row = res.rows[0];
      return {
        id: row.id_member,
        name: row.name,
        email: row.email,
        emailVerified: row.email_verified,
        image: row.image
      };
    },
    deleteUser: async (id) => {
      await db2.query("delete mt_member where id_member = $1", [id]);
    },
    linkAccount: async (data) => {
      await db2.query(
        `insert into accounts 
        (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, id_token, scope, token_type)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          data.userId,
          data.type,
          data.provider,
          data.providerAccountId,
          data.refresh_token,
          data.access_token,
          data.expires_at,
          data.id_token,
          data.scope,
          data.token_type
        ]
      );
    },
    unlinkAccount: async (providerAccountId) => {
      await db2.query("delete from accounts where provider_account_id = $1", [providerAccountId]);
    },
    getSessionAndUser: async (sessionToken) => {
      const res = await db2.query(
        "select * from sessions s left join mt_member mm on mm.id_member = s.user_id where session_token = $1",
        [sessionToken]
      );
      const row = res.rows[0];
      if (!row) return null;
      return {
        user: {
          id: row.id_member,
          name: row.name,
          email: row.email,
          emailVerified: row.email_verified,
          image: row.image
        },
        session: {
          sessionToken: row.session_token,
          expires: row.expires,
          userId: row.user_id
        }
      };
    },
    createSession: async (data) => {
      await User.createSession(data);
      return {
        userId: data.userId,
        expires: data.expires,
        sessionToken: data.sessionToken
      };
    },
    updateSession: async (data) => {
      await db2.query("update sessions set user_id expires = $3 where session_token = $1", [
        data.sessionToken,
        data.userId,
        data.expires
      ]);
      return {
        userId: data.userId,
        expires: data.expires,
        sessionToken: data.sessionToken
      };
    },
    deleteSession: async (sessionToken) => {
      await db2.query("delete from sessions where session_token = $1", [sessionToken]);
    },
    createVerificationToken: async (data) => {
      await db2.query(
        "insert into verification_token (identifier, expires, token) values ($1, $2, $3)",
        [data.identifier, data.expires, data.token]
      );
      return {
        identifier: data.identifier,
        expires: data.expires,
        token: data.token
      };
    },
    useVerificationToken: async (identifier_token) => {
      await db2.query("delete from verification_token where token = $1", [identifier_token]);
      return null;
    },
    getAccount: async (providerAccountId, provider) => {
      const res = await db2.query(
        "select * from accounts where provider_account_id = $1 and provider = $3",
        [providerAccountId, provider]
      );
      const row = res.rows[0];
      return {
        provider: row.provider,
        providerAccountId: row.provider_account_id,
        type: row.type,
        userId: row.user_id,
        access_token: row.access_token,
        expires_at: row.expires_at,
        expires_in: row.expires_in,
        id_token: row.id_token,
        refresh_token: row.refresh_token,
        scope: row.scope,
        token_type: row.token_type
      };
    }
  };
}
class InvalidInput extends CredentialsSignin {
  constructor() {
    super(...arguments);
    this.code = "bad-request";
  }
}
class InvalidCredentials extends CredentialsSignin {
  constructor() {
    super(...arguments);
    this.code = "credentials";
  }
}
const SESSION_CONFIG = {
  maxAge: 30 * 24 * 60 * 60,
  // 30 days
  updateAge: 24 * 60 * 60
  // 24 hours
};
const { handle, signIn } = SvelteKitAuth(async ({ request, cookies }) => ({
  adapter: CustomAdapter(db),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Kata sandi", type: "password" }
      },
      authorize: async (credentials) => {
        if (credentials.email == "undefined" || credentials.email == "" || credentials.password == "undefined" || credentials.password == "") {
          throw new InvalidInput();
        }
        const user = await User.getUserByEmail(credentials.email);
        if (!user || !bcrypt.compareSync(`${credentials.password}`, user.password)) {
          throw new InvalidCredentials();
        }
        return {
          id: user.id_member,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  pages: { signIn: "/auth/login", error: "/auth/login" },
  session: { strategy: "database", ...SESSION_CONFIG },
  callbacks: {
    async signIn({ user }) {
      if (request.url?.includes("callback") && request.url?.includes("credentials") && request.method === "POST") {
        if (user && "id" in user) {
          const sessionToken = crypto.randomUUID();
          const sessionExpiry = new Date(Date.now() + SESSION_CONFIG.maxAge * 1e3);
          await User.createSession({
            sessionToken,
            userId: user.id,
            expires: sessionExpiry
          });
          cookies.set("auth.session-token", sessionToken, {
            path: "/",
            expires: sessionExpiry
          });
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token, user }) {
      return session;
    }
  },
  jwt: {
    encode(params) {
      if (request.url?.includes("callback") && request.url?.includes("credentials") && request.method === "POST") {
        const cookie = cookies.get("auth.session-token");
        if (cookie) return cookie;
        else return "";
      }
      return encode(params);
    },
    async decode(params) {
      if (request.url?.includes("callback") && request.url?.includes("credentials") && request.method === "POST") {
        return null;
      }
      return decode(params);
    }
  },
  debug: true
}));

export { handle as h, signIn as s };
//# sourceMappingURL=auth-B6sBoyhB.js.map
