/**
 * Validates whether the provided string is a correctly formatted email address.
 *
 * @param email - The email address string to verify.
 * @returns A boolean indicating whether the given string is a valid email address.
 */

export default function validEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}