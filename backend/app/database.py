"""
Database client for Supabase operations.

This module handles all database interactions for storing and retrieving
Slack messages and issue groups.

Single Responsibility: Only handles database operations.
Dependency Inversion: Uses Supabase client abstraction.
"""

from datetime import datetime
from typing import Dict, Any, Optional
from supabase import create_client, Client
from app.config import SUPABASE_URL, SUPABASE_KEY


# Initialize Supabase client (singleton pattern)
_supabase_client: Optional[Client] = None


def get_supabase_client() -> Client:
    """
    Get or create Supabase client instance.

    Returns:
        Supabase client instance

    Design Pattern: Singleton - ensures single database connection
    """
    global _supabase_client

    if _supabase_client is None:
        # Create client with correct initialization
        _supabase_client = create_client(
            supabase_url=SUPABASE_URL,
            supabase_key=SUPABASE_KEY
        )

    return _supabase_client


def store_message(
    slack_message_id: str,
    user_id: str,
    user_name: str,
    channel_id: str,
    channel_name: str,
    text: str,
    thread_ts: Optional[str],
    timestamp: datetime,
    classification: Dict[str, Any]
) -> str:
    """
    Store a classified Slack message in the database.

    Args:
        slack_message_id: Slack's unique message timestamp (ts)
        user_id: Slack user ID
        user_name: Human-readable user name
        channel_id: Slack channel ID
        channel_name: Human-readable channel name
        text: Message text content
        thread_ts: Thread timestamp if message is in a thread
        timestamp: Message timestamp
        classification: Classification results with keys:
            - is_relevant (bool)
            - category (str)
            - confidence (float)
            - summary (str)

    Returns:
        UUID of the stored message

    Raises:
        Exception: If database operation fails
    """
    supabase = get_supabase_client()

    # Prepare message data
    message_data = {
        'slack_message_id': slack_message_id,
        'user_id': user_id,
        'user_name': user_name,
        'channel_id': channel_id,
        'channel_name': channel_name,
        'text': text,
        'thread_ts': thread_ts,
        'timestamp': timestamp.isoformat(),
        'is_relevant': classification['is_relevant'],
        'category': classification['category'],
        'confidence': classification['confidence'],
        'summary': classification['summary']
    }

    try:
        # Insert message into database
        result = supabase.table('messages').insert(message_data).execute()

        # Extract and return the message ID
        message_id = result.data[0]['id']
        return message_id

    except Exception as e:
        print(f"❌ Database error storing message: {e}")
        raise


def message_exists(slack_message_id: str) -> bool:
    """
    Check if a message already exists in the database.

    Args:
        slack_message_id: Slack's unique message timestamp

    Returns:
        True if message exists, False otherwise

    Use Case: Prevent duplicate message storage
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('messages')\
            .select('id')\
            .eq('slack_message_id', slack_message_id)\
            .execute()

        return len(result.data) > 0

    except Exception as e:
        print(f"❌ Database error checking message existence: {e}")
        return False


def get_message_by_id(message_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a message by its UUID.

    Args:
        message_id: Message UUID

    Returns:
        Message data dictionary or None if not found
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('messages')\
            .select('*')\
            .eq('id', message_id)\
            .execute()

        if result.data:
            return result.data[0]
        return None

    except Exception as e:
        print(f"❌ Database error retrieving message: {e}")
        return None


def get_messages_by_thread(thread_ts: str) -> list[Dict[str, Any]]:
    """
    Get all messages in a specific Slack thread.

    Args:
        thread_ts: Slack thread timestamp

    Returns:
        List of message dictionaries

    Use Case: Thread-based grouping strategy
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('messages')\
            .select('*')\
            .eq('thread_ts', thread_ts)\
            .order('timestamp')\
            .execute()

        return result.data

    except Exception as e:
        print(f"❌ Database error retrieving thread messages: {e}")
        return []


def create_issue_group(
    title: str,
    summary: str,
    category: str
) -> str:
    """
    Create a new issue group.

    Args:
        title: Short title for the issue group
        summary: Detailed summary of the grouped issue
        category: Issue category (support, bug, feature, question)

    Returns:
        UUID of the created issue group

    Raises:
        Exception: If database operation fails
    """
    supabase = get_supabase_client()

    group_data = {
        'title': title,
        'summary': summary,
        'category': category,
        'status': 'open'
    }

    try:
        result = supabase.table('issue_groups').insert(group_data).execute()
        group_id = result.data[0]['id']
        return group_id

    except Exception as e:
        print(f"❌ Database error creating issue group: {e}")
        raise


def get_all_issue_groups() -> list[Dict[str, Any]]:
    """
    Get all issue groups ordered by creation date.

    Returns:
        List of issue group dictionaries

    Use Case: Dashboard display
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('issue_groups')\
            .select('*')\
            .order('created_at', desc=True)\
            .execute()

        return result.data

    except Exception as e:
        print(f"❌ Database error retrieving issue groups: {e}")
        return []


def get_issue_group_by_id(group_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve an issue group by its UUID.

    Args:
        group_id: Issue group UUID

    Returns:
        Issue group data dictionary or None if not found
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('issue_groups')\
            .select('*')\
            .eq('id', group_id)\
            .execute()

        if result.data:
            return result.data[0]
        return None

    except Exception as e:
        print(f"❌ Database error retrieving issue group: {e}")
        return None


def add_message_to_group(
    message_id: str,
    group_id: str,
    similarity_score: Optional[float] = None
) -> bool:
    """
    Add a message to an issue group.

    Args:
        message_id: Message UUID
        group_id: Issue group UUID
        similarity_score: Optional similarity score (0-1)

    Returns:
        True if successful, False otherwise

    Use Case: Grouping strategy implementation
    """
    supabase = get_supabase_client()

    relationship_data = {
        'message_id': message_id,
        'group_id': group_id,
        'similarity_score': similarity_score
    }

    try:
        supabase.table('message_groups').insert(relationship_data).execute()
        return True

    except Exception as e:
        print(f"❌ Database error adding message to group: {e}")
        return False


def get_messages_in_group(group_id: str) -> list[Dict[str, Any]]:
    """
    Get all messages in a specific issue group.

    Args:
        group_id: Issue group UUID

    Returns:
        List of message dictionaries with similarity scores

    Use Case: Display grouped messages in dashboard
    """
    supabase = get_supabase_client()

    try:
        # Join messages with message_groups to get similarity scores
        result = supabase.table('message_groups')\
            .select('*, messages(*)')\
            .eq('group_id', group_id)\
            .execute()

        # Extract message data with similarity scores
        messages_with_scores = []
        for row in result.data:
            message = row['messages']
            message['similarity_score'] = row['similarity_score']
            messages_with_scores.append(message)

        return messages_with_scores

    except Exception as e:
        print(f"❌ Database error retrieving group messages: {e}")
        return []


def update_issue_group_status(group_id: str, status: str) -> bool:
    """
    Update the status of an issue group.

    Args:
        group_id: Issue group UUID
        status: New status ('open' or 'closed')

    Returns:
        True if successful, False otherwise

    Use Case: Mark issues as resolved
    """
    supabase = get_supabase_client()

    try:
        supabase.table('issue_groups')\
            .update({'status': status})\
            .eq('id', group_id)\
            .execute()
        return True

    except Exception as e:
        print(f"❌ Database error updating issue group status: {e}")
        return False


def get_issue_groups_by_category(category: str) -> list[Dict[str, Any]]:
    """
    Get all issue groups for a specific category.

    Args:
        category: Category to filter by (support, bug, feature, question)

    Returns:
        List of issue group dictionaries

    Use Case: Dashboard filtering
    """
    supabase = get_supabase_client()

    try:
        result = supabase.table('issue_groups')\
            .select('*')\
            .eq('category', category)\
            .order('created_at', desc=True)\
            .execute()

        return result.data

    except Exception as e:
        print(f"❌ Database error retrieving issue groups by category: {e}")
        return []
