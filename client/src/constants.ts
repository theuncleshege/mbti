let host: string = '';

if ((process.env.NODE_ENV !== "production" && typeof process.env.REACT_APP_CONTAINER == "undefined")) {
    host = 'http://127.0.0.1:8000/api';
}
else {
    host = '/api';
}

export const API_URI: string = `${host}`;

export const INDICATORS = ['EI', 'SN', 'TF', 'JP'];

export const INDICATOR_MAPPINGS: any = {
    "EI": {
      "I": "Introversion (I)",
      "E": "Extraversion (E)",
    },
    "SN": {
      "S": "Sensing (S)",
      "N": "Intuition (N)",
    },
    "TF": {
      "T": "Thinking (T)",
      "F": "Feeling (F)",
    },
    "JP": {
      "J": "Judging (J)",
      "P": "Perceiving (P)",
    },
  };

export const getAxiosError = (error: any) => {
  if (error.response) {
    return typeof error.response.data === 'string' ? error.response.data : `Error: ${error.message}`;
  } else if (error.request) {
    return 'Request error occured. Kindly ensure the backend api is available.';
  } else {
    return `Error: ${error.message}`;
  }
}