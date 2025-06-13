// Constants for element IDs
const ELEMENT_IDS = {
    PERCENTAGE: 'percentage',
    WAITING_MESSAGE: 'waiting-message'
};

// Message type constants
const MESSAGE_TYPES = {
    PROGRESS: 'progress',
    UPDATE_WAITING_MESSAGE: 'updateWaitingMessage'
};

// Expected origin for messages
const EXPECTED_ORIGIN = window.location.origin;

/**
 * Updates element text content if element exists
 * @param {string} elementId - ID of element to update
 * @param {string} content - New content to set
 * @returns {void}
 */
function updateElementContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element && content) {
        element.textContent = content;
    }
}

// Listen for messages from parent window
window.addEventListener('message', function(event) {
    // Verify the origin of the received message
    // if (event.origin !== EXPECTED_ORIGIN) {
    //     console.warn('Received message from unexpected origin:', event.origin);
    //     return;
    // }

    try {
        const data = event.data;
        
        // Handle different message types
        switch(data.type) {
            case MESSAGE_TYPES.PROGRESS: {
                const percentageText = data.value ? `${data.value}%` : '';
                updateElementContent(ELEMENT_IDS.PERCENTAGE, percentageText);
                break;
            }
            
            case MESSAGE_TYPES.UPDATE_WAITING_MESSAGE: {
                updateElementContent(ELEMENT_IDS.WAITING_MESSAGE, data.message);
                break;
            }

            default: {
                console.log('Unhandled message type:', data);
                break;
            }
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
});
