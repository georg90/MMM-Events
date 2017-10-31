## MMM-HiH-Events
Show events from heuteinhamburg.de


## Installation
`git clone https://github.com/georg90/MMM-HiH-Events` into the `~/MagicMirror/modules` directory.

## Config.js entry and options
```
    {
        module: 'MMM-HiH-Events',
        position: 'bottom_right',
        config: {
		rotateInterval: 5 * 60 * 1000,     // New Event Appears every 5 minutes
		animationSpeed: 3000,              // Event fades in and out
		picture: true,                     // true, false = no image
        }
    },
```
