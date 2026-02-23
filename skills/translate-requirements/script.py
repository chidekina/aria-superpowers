## Python Automation Script (Integration Layer)

import requests
import argparse
import os

def fetch_jira(project_key):
    url = f"https://your-domain.atlassian.net/rest/api/3/search"
    headers = {
        "Authorization": f"Bearer {os.getenv('JIRA_TOKEN')}",
        "Accept": "application/json"
    }
    params = {
        "jql": f"project={project_key}",
        "maxResults": 50
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

def fetch_trello(board_id):
    url = f"https://api.trello.com/1/boards/{board_id}/cards"
    params = {
        "key": os.getenv("TRELLO_KEY"),
        "token": os.getenv("TRELLO_TOKEN")
    }
    return requests.get(url, params=params).json()

def fetch_clickup(list_id):
    url = f"https://api.clickup.com/api/v2/list/{list_id}/task"
    headers = {
        "Authorization": os.getenv("CLICKUP_TOKEN")
    }
    return requests.get(url, headers=headers).json()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True)
    parser.add_argument("--project")
    args = parser.parse_args()

    if args.source == "jira":
        data = fetch_jira(args.project)
    elif args.source == "trello":
        data = fetch_trello(args.project)
    elif args.source == "clickup":
        data = fetch_clickup(args.project)
    else:
        raise ValueError("Unsupported source")

    print(data)
