# cz-emoji

My Commitizen adapter

## Installation

```
yarn add commitizen @yuriazevedo/cz-emoji -D
```

## Usage example

In `package.json`:

```json
{
  "config": {
    "cz-emoji": {},
    "commitizen": {
      "path": "./node_modules/@yuriazevedo/cz-emoji"
    }
  }
}
```

## Configuration Options

#### Types

An [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) choices array:

```json
{
  "config": {
    "cz-emoji": {
      "types": [
        {
          "emoji": "🌟",
          "code": ":star2:",
          "description": "A new feature",
          "name": "feature"
        }
      ]
    }
  }
}
```

#### Scopes

An [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) choices array:

```json
{
  "config": {
    "cz-emoji": {
      "scopes": ["home", "accounts", "ci"]
    }
  }
}
```

#### Symbol

A boolean value that allows for an using a unicode value rather than the default of [Gitmoji](https://gitmoji.carloscuesta.me/) markup in a commit message. The default for symbol is true.

```json
{
  "config": {
    "cz-emoji": {
      "symbol": false
    }
  }
}
```

#### Skip Questions

An array of questions you want to skip:

```json
{
  "config": {
    "cz-emoji": {
      "skipQuestions": ["scope", "issues"]
    }
  }
}
```

You can skip the following questions: `scope`, `body` and `issues`. The `type` and `subject` questions are mandatory.

#### Customize Questions

An object that contains overrides of the original questions:

```json
{
  "config": {
    "cz-emoji": {
      "questions": {
        "body": "This will be displayed instead of original text"
      }
    }
  }
}
```

#### Customize the subject max length

The maximum length you want your subject has

```json
{
  "config": {
    "cz-emoji": {
      "subjectMaxLength": 200
    }
  }
}
```
