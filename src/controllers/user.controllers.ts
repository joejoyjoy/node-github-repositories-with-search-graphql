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

export const getUserData = async (req, res) => {
  console.log('Authorization header:', req.get('Authorization'));

  req.get("Authorization");

  try {
    const response = await fetch(`https://api.github.com/user`, {
      headers: {
        "Authorization": req.get("Authorization")
      }
    })

    const data = await response.json()
    return res.json(data);

  } catch (err) {
    console.error(err);
  }
}