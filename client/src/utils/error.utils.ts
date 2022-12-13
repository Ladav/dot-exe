import axios from 'axios'

export function extractErrorMessage(error: unknown, defaultMessage = 'Something went wrong, try again later') {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.message) {
      return error.response.data.message
    }

    if (error.message) {
      return error.message
    }
  }
  return defaultMessage
}
