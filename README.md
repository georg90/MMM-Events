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
		maxLength: "40",             // adjust to your liking 
		animationSpeed: 3000,          // Event fades in and out
        	initialLoadDelay: 4250,
        	retryDelay: 2500,
		updateInterval: 60 * 60 * 1000, // 60 minutes. No need to change!
		
        }
    },
```
