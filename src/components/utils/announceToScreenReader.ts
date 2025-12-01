/**
 * Announce a message to screen readers using ARIA live regions
 * @param message - The message to announce
 * @param priority - 'polite' (default) or 'assertive' for urgent announcements
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.getElementById('screen-reader-announcements');
  if (announcement) {
    // Set the priority level
    announcement.setAttribute('aria-live', priority);
    
    // Clear and set the message
    announcement.textContent = '';
    setTimeout(() => {
      announcement.textContent = message;
    }, 100);
  }
}

/**
 * Announce a page change to screen readers
 * @param pageName - Name of the new page
 */
export function announcePageChange(pageName: string) {
  announceToScreenReader(`Navigated to ${pageName} page`, 'polite');
}

/**
 * Announce an action result to screen readers
 * @param action - Description of the action
 * @param success - Whether the action succeeded
 */
export function announceAction(action: string, success: boolean = true) {
  const message = success ? `${action} successful` : `${action} failed`;
  announceToScreenReader(message, success ? 'polite' : 'assertive');
}
