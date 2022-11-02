# HTML Snippet to JSON converter

## Project Setup
Place the file which you wish to convert in the root of the project

## Installation

```bash
npm ci
```

## Running the converter

```bash
npm run convert html-to-convert.txt
```

The converted `json` file will be found on the `output` directory.

## Running the tests

```bash
npm run test
```

## Things that can be improved in the future
- [ ] Improve test coverage
- [ ] Add the missing Type definitions
- [ ] Configure CI/CD

## About the data format

The HTML contains a sequence of elements that either refer to a character or to a dialog. By definition there is always one dialog following a character.

Within a dialog there can be elements of type `text__action`, please note that their target can refer to a different character than the one currently talking.

The exercise is to convert a dialog-based format into a track-based structure. Every character has a set of three tracks (trackGroup) where each track can contain a number of actions placed along a timeline.

We define the following track types:

- `DI` for dialogues
- `AN` for animations
- `EM` for emotions

A trackGroup has a target, a type and a list of `tracks[]`. A track has a type and a list of `actions[]`. An action has timestamp, along with other different properties, depending on it's type.

To calculate timestamps and durations use: `char count * 70ms` (incl. punctuation marks). Only consider text in dialogues.

### Example input HTML
This example shows a brief conversion between two characters named `CH_genius` and `CH_evil`.

```html
<div class="character">CH_genius</div>
<div class="dialog">lorem <span class="text__action" data-action-type="AN" data-action-target="CH_genius" data-action-id="AN_Wave">Wave</span>ipsum</div>
<div class="character">CH_evil</div>
<div class="dialog">dol<span class="text__action" data-action-type="EM" data-action-target="CH_genius" data-action-id="EM_Laughing">Laughing</span>or sit</div>
<div class="character">CH_genius</div>
<div class="dialog">amet</div>
```

### Example output JSON Structure
```json
{
  "trackGroups": [
    {
      "target": "CH_genius",
      "tracks": [
        {
          "type": "AN",
          "actions": [
            {
              "actionId": "AN_Wave",
              "actionType": "AN",
              "timestamp": 420,
              "target": "CH_genius"
            }
          ]
        },
        {
          "type": "DI",
          "actions": [
            {
              "dialog": "lorem ipsum",
              "duration": 770,
              "timestamp": 0
            },
            {
              "dialog": "amet",
              "duration": 280,
              "timestamp": 1400
            }
          ]
        }
      ]
    },
    {
      "target": "CH_evil",
      "tracks": [
        {
          "type": "EM",
          "actions": [
            {
              "actionId": "EM_Laughing",
              "actionType": "EM",
              "timestamp": 980,
              "target": "CH_genius"
            }
          ]
        },
        {
          "type": "DI",
          "actions": [
            {
              "dialog": "dolor sit",
              "duration": 630,
              "timestamp": 770
            }
          ]
        }
      ]
    }
  ]
}
```

 
