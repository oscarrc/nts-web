[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y43D7I3)

## NTS-web 4.0.1

A web controller for the Korg NTS-1.

![NTS-web](https://github.com/oscarrc/nts-web/blob/master/public/static/media/screenshot.png?raw=true "NTS-web Korg NTS-1 web controller")

<table>
  <tr>
    <td align="center">
      <a href="https://nts-web.oscarrc.me" target="_BLANK">
      <img width="175" src="https://user-images.githubusercontent.com/3104648/28969264-d14f6178-791b-11e7-9399-e7820d6aaa39.png" alt="PWA"></a>
    </td>
    <td align="center">
       <a href="https://play.google.com/store/apps/details?id=me.oscarrc.nts_web.twa" target="_BLANK"><img width="200" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Play Store"/></a>
    </td>
  </tr>
</table>

---

### THIS IS A WORK IN PROGRESS

This is still a work in progress, so expect some bugs and issues.

#### TODOs

- [x] Implement midi passthrough
- [x] Compile standalone apps
- [x] Get names of user oscilators and effects
- [x] Detect changes on plugged devices and act accordingly
- [ ] Test the sequencer for real-time performance

If you miss any feature, please, request it.

### How it works

1. Connect your [NTS-1 device](https://amzn.to/3j3yu2Q) to the computer
2. Go to the [NTS-web page](https://nts-web.oscarrc.me) (if you're already there the device will just be detected, if not, refresh the page)
3. Start tweaking parameters

### Features

- Installable, and works offline as a PWA
- Control any parameter from within the app
  - Changes made on the NTS-1 device reflect on the app
  - The app remembers all your settings and banks (_**NEW**_)
- Play with the on screen keyboard (_**UPDATED**_)
  - Change the starting octave
  - Send pitch bend
- Use any USB Midi controller to play the NTS-1
- Sequence melodies with the built-in sequencer (_**UPDATED**_)
  - Control the tempo of the sequencer
  - Play notes any octave
- Sixteen memory banks for your patches (_**UPDATED**_)
  - Rename memory banks for easy identification (_**NEW**_)
- Save and load the state of your app
  - Import / export your patches from/to any of the sixteen patch banks
  - Import / export your sequences
  - Import / export all the state of the app

### Found a bug?

Open an [issue](https://github.com/oscarrc/nts-web/issues) and let me know.

### Do you wanna help?

[Buy me a coffee](https://ko-fi.com/Y8Y43D7I3), and feel free to open a PR

### License

This work is license under the [MIT License](https://github.com/oscarrc/nts-web/blob/master/LICENSE)
Google Play and the Google Play logo are trademarks of Google LLC.
