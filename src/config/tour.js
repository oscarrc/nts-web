const intro = [
    {
        title: "Welcome to NTS-1",
        intro: "Let's walk through all the controls and features of the app",
        tooltipClass: 'tour intro',
    },
    {
        title: "Compatibility check",
        intro: "But before, check if your browser is compatible with the <a class='link' href='https://caniuse.com/midi' target='_BLANK' rel='noreferrer noopener'>Web Midi API</a> and the <a class='link' href='https://caniuse.com/audio-api' target='_BLANK' rel='noreferrer noopener'> Web Audio API </a>",
        tooltipClass: 'tour intro'
    },
    {
        intro: "From this menu you can control different aspects of the app",
        tooltipClass: 'tour',
        element: '#menu',
    },
    {
        intro: "This, is the file menu where you can import your banks, sequence or the whole state of the app as well as rename your banks or clear the sequence",
        tooltipClass: 'tour',
        element: '#file',
    },
    {
        intro: "This is the save menu. Here you are able to export your banks, sequence or the whole state of the app",
        tooltipClass: 'tour',
        element: '#save',
    },
    {
        intro: "By clicking this button all the controls will be randomized",
        tooltipClass: 'tour',
        element: '#randomize',
    },
    {
        intro: "In this menu is where the tempo and bar length controls are located. You can also enable or disble the metronome.",
        tooltipClass: 'tour',
        element: '#tempo',
    },
    {
        intro: "By clicking this button you can open/close the live controls.",
        tooltipClass: 'tour',
        element: '#toggleLive',
    },
    {
        intro: "This button will open the Midi settings for selecting input, output and passthrough devices and their channels.",
        tooltipClass: 'tour',
        element: '#settings',
    },
    {
        intro: "These are the memory banks. You can select a bank by clicking on it. All changes made will be saved to the currently selected bank.",
        tooltipClass: 'tour',
        element: '#memory',
    },
    {
        title: "Controls",
        intro: "NTS-web has 4 types of controls, to change parameters on your NTS-1",
        tooltipClass: 'tour intro',
    },
    {
        intro: "Selectors allow you to select a value between the available options.",
        tooltipClass: 'tour',
        element: '.selector-control',
    },
    {
        intro: "Knobs can tweak a parameter with a value between 0 and 127",
        tooltipClass: 'tour',
        element: '.knob-control',
    },
    {
        intro: "Knobs and selectors can be controlled by dragging them or by using the mouse wheel. When using the mouse wheel holding the shift key will allow you to fine tune the parameter",
        tooltipClass: 'tour'
    },
    {
        intro: "Dropdowns are classic menus that allow you to select a value between the given options",
        tooltipClass: 'tour',
        element: '.dropdown-control',
    },
    {
        intro: "Switches will turn on or off the effect or filter they're linked to.",
        tooltipClass: 'tour',
        element: '.switch-control',
    },
    {
        title: "Sequencer",
        intro: "Now, let's talk about the sequencer. It allows you to create a sequence using a different bank for each step",
        tooltipClass: 'tour intro',
    },
    {
        intro: "The interface of the sequencer is contained within this display and buttons",
        tooltipClass: 'tour',
        element: '#display',
    },
    {
        intro: "These buttons will move the current selected step up or down. You can also select a step scrolling with the mouse wheel and clicking on it",
        tooltipClass: 'tour',
        element: '#stepSelect',
    },
    {
        intro: "These buttons will add or remove a bar from the sequence",
        tooltipClass: 'tour',
        element: '#addRemoveBars',
    },
    {
        intro: "This button will toggle the record mode",
        tooltipClass: 'tour',
        element: '#toggleRecording',
    },
    {
        intro: "This button will toggle the playback mode",
        tooltipClass: 'tour',
        element: '#togglePlayback',
    },
    {
        title: "Recording",
        intro: "When in record mode, you can enter notes using live keyboard. \n Then you can edit them, as well as the duration and bank, using your keyboard or the arrow controls that appear on hover. \n You can enable the record and playback mode at once to do live recording",
        tooltipClass: 'tour intro',
    },
    {
        intro: "Finally, if you found a bug, don't hesitate into reporting it. \n If you want you can install the app too, and remember, if you like the app you can buy me a coffee.",
        tooltipClass: 'tour',
        element: '#footerMenu',
    },
];

export { intro };