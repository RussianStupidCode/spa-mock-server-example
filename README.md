# SPA с имитацией бэка для тестирования ui

## Важно, что данные возвращаются в начальное состояние при обновлении страницы. Для сохранения данных придется использвовать либо localstorage либо indexdb ну или еще что-то. При навигации по страницам состояние сохраняется т.к. SPA



### Запуск и устанвока
- npm install
- npm run dev

### Имитация бэка
Фейковый сервер представляет собой обертку над axios-mock-adapter для более удобного использования (добавления ручек api и middlewares)

- раположение в [fake-server](./src/fake-server)
- основная часть лежит в [mockapi](./src/fake-server/mockapi/)

