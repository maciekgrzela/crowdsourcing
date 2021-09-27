import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../App';
import config from '../config.json';

axios.defaults.baseURL = config.API_SERVER;

axios.interceptors.request.use(
  (cfg) => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      cfg.headers.common['x-access-token'] = token;
    }
    return cfg;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log('INTERCEPTOR RESPONSE', res);
    return res;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error('Błąd związany z działaniem aplikacji', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.response.status === 401) {
        toast.error('Brak autoryzacji danych użytkownika', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.response.status === 403) {
        toast.error('Brak uprawnień do wykonywanej operacji', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.response.status === 404) {
        toast.error(
          'Nie znaleziono podanego zasobu lub adres e-mail pod który wysyłana jest wiadomość nie istnieje',
          {
            position: 'top-right',
            autoClose: 3000,
          }
        );
      } else if (error.response.status > 404 && error.response.status < 500) {
        toast.error(
          'Wystąpił błąd związany z działaniem aplikacji. Spróbuj ponownie później',
          {
            position: 'top-right',
            autoClose: 3000,
          }
        );
      } else {
        history.push('/error');
      }
    } else if (error.request) {
      toast.error('Brak odpowiedzi serwera. Spróbuj ponownie później', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error(
        'Wystąpił błąd związany z działaniem aplikacji. Spróbuj ponownie później',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
    Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  getWithHeaders: (url) => axios.get(url),
  getDownload: (url) => axios.get(url, { responseType: 'arraybuffer' }),
  post: (url, body) => axios.post(url, body).then(responseBody),
  postWithHeaders: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body).then(responseBody),
  putWithHeaders: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url).then(responseBody),
  deleteWithHeaders: (url) => axios.delete(url),
};

const Folds = {
  list: () => requests.get('/folds'),
  listOne: (id) => requests.get(`/folds/${id}`),
};

const Users = {
  register: (credentials) => requests.post('/auth/register', credentials),
  login: (credentials) => requests.post('/auth/login', credentials),
  current: () => requests.get('/auth/current'),
  editInfo: (id, data) => requests.post(`/auth/${id}/edit/info`, data),
};

const Experiments = {
  list: () => requests.get('/experiments'),
  listOne: (id) => requests.get(`/experiments/${id}`),
  generate: (data) => requests.post('/experiments/generate', data),
  download: () => requests.getDownload('/experiments/download'),
  updateAdjustingInfo: (id, data) =>
    requests.put(`/experiments/${id}/adjusting/info`, data),
  updateResults: (id, data) => requests.put(`/experiments/${id}/results`, data),
  finish: (id, data) => requests.put(`/experiments/${id}/finish`, data),
};

const RegistrationLinks = {
  listOne: (id) => requests.get(`/registration/token/${id}`),
  generate: (data) => requests.post('/registration/token/generate', data),
};

const endpoints = {
  Folds,
  Users,
  Experiments,
  RegistrationLinks,
};

export default endpoints;
