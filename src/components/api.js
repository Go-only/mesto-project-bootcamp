const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-15',
  headersInit: {
    authorization: 'ba42137c-da6e-43b1-a681-81f24d8482e3',
    "Content-type": "application/json",
  }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}/${endpoint}`, {
    method: "GET",
    ...options,
    headers: { ...config.headersInit, ...options?.headers }
  }).then(onResponse);
}

function onResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then(error => Promise.reject(error));
}

// Рендеринг карточек с сервера
export function getAllCards() {
  return request('cards');
}

// Добавление карточки
export function addCard(dataCard) {
  return request('cards', {
    method: "POST",
    body: JSON.stringify(dataCard),
  });
}

// Удаление карточки
export function deleteCard(_id) {
  return request(`cards/${_id}`, {
    method: "DELETE"
  });
}

// Рендеринг информации профиля с сервера
export function getInfoProfile() {
  return request('users/me');
}


// Редактирование профиля
export function editProfile(newDataProfile) {
  return request('users/me', {
    method: "PATCH",
    body: JSON.stringify(newDataProfile),
  });
}
