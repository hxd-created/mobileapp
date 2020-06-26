# SOUL Mobile Application

Це додаток для соціальної мережі soul.ua

## Підготовка оточення для розробки

Поперше, потрібно завантажити актуальну graphql схему, що використовуватиметься react-relay.

Для цього рекомендовано використовувати утиліту `get-graphql-schema`, встановіть її глобально:
```sh
$ yarn global add get-graphql-schema 
```

потім завантажте схему. Вона повинна бути у корні і мати назву файла `schema.graphql`

```sh
$ get-graphql-schema http://soul.lcl/query > schema.graphql
```

Після цього - потрібно скомпілювати все, що пов'язано з graphql.

```sh
$ yarn relay
```

Запуск проекта

```sh
$ expo start
```
