import fetch from "node-fetch";

import { config } from 'dotenv';

config()

export const getAccessToken = async (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`

  try {
    const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    })

    const data = await response.json()
    return res.json(data);

  } catch (err) {
    console.error(err);
  }
}

export const getUserDetails = async (req, res) => {
  req.get("Authorization");

  try {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: 'POST',
      headers: {
        "Authorization": req.get("Authorization"),
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        "query": `{
          viewer {
            id
            login
            avatarUrl
            name
            url
            followers {
              totalCount
            }
            following(first: 11) {
              totalCount
              nodes {
                avatarUrl
                id
                name
                login
                url
              }
            }
            issues {
              totalCount
            }
            repositories(privacy: PUBLIC) {
              totalCount
            }
          }
        }`
      })
    });

    const data = await response.json();
    return res.json(data);

  } catch (err) {
    console.error(err);
  }
}

export const getUserRepos = async (req, res) => {
  req.get("Authorization");
  const { login, totalCount, field, direction } = req.body;
  
  try {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: 'POST',
      headers: {
        "Authorization": req.get("Authorization"),
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        "query": `{
          user(login: "${login}") {
            repositories(first: ${totalCount}, orderBy: {field: ${field}, direction: ${direction}}) {
              totalCount
              nodes {
                id
                name
                url
                createdAt
                owner {
                  id
                  avatarUrl
                  login
                }
                upCase: object(expression: "master:README.md") {
                  ... on Blob {
                    text
                  }
                }
                object(expression: "main:README.md") {
                  ... on Blob {
                    text
                  }
                }
                otherFile: object(expression: "master:readme.md") {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
        }`
      })
    });

    const data = await response.json();
    return res.json(data);

  } catch (err) {
    console.error(err);
  }
}