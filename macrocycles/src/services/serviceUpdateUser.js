import React from 'react'
import { API_URL } from '../config/requests'

export default function serviceUpdateUser (user, data) {
  return fetch(`${API_URL}/user/${user}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json()
    }
    )
    .catch(err => console.error(err))
}
