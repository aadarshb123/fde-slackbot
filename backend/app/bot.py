"""
Main Slack bot application.
Connects to Slack using Socket Mode and logs all incoming messages.
"""

from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from app.config import SLACK_BOT_TOKEN, SLACK_APP_TOKEN

# Initialize Slack app
app = App(token=SLACK_BOT_TOKEN)


@app.message("")
def handle_message(message, logger):
    """
    Handle all incoming messages.
    Logs message details for debugging.
    """
    print("🔔 MESSAGE HANDLER TRIGGERED!")  # Debug print

    user = message.get("user", "Unknown")
    text = message.get("text", "")
    channel = message.get("channel", "Unknown")

    print(f"📨 Message received:")
    print(f"   User: {user}")
    print(f"   Channel: {channel}")
    print(f"   Text: {text}")

    logger.info(f"📨 Message received:")
    logger.info(f"   User: {user}")
    logger.info(f"   Channel: {channel}")
    logger.info(f"   Text: {text}")


@app.error
def handle_error(error, body, logger):
    """
    Global error handler for the Slack app.
    """
    logger.exception(f"❌ Error: {error}")
    logger.info(f"Request body: {body}")


if __name__ == "__main__":
    # Start the bot using Socket Mode
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    print("⚡ Nixo FDE Monitor is running!")
    print("   Listening for messages...")
    print(f"   Bot Token: {SLACK_BOT_TOKEN[:20]}...")
    print(f"   App Token: {SLACK_APP_TOKEN[:20]}...")
    print("   Socket Mode handler starting...")
    handler.start()
