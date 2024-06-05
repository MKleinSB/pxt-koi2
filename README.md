## Introduction

KOI2 is an AI camera module from KittenBot, which aims to combine advanced AI technology and high-performance embedded systems to provide strong support for visual recognition and intelligent AI applications. 

It comes with hardware such as a screen, camera, speaker, microphone, and buttons, which can fully unleash the capabilities of AI applications. It has a front and rear flip camera, a plastic case with Lego structural holes, providing a richer and more convenient building form, meeting the classroom and project needs of educational scenarios.

Purchase link
https://www.kittenbot.cc/products/kittenbot-koi-2-artificial-intelligence-module-k210?_pos=7&_sid=04533234e&_ss=r

Tutorial Links
https://learn.kittenbot.cc/docs/KOI2/01KOI2

## Basic usage

Usage: take photo

```blocks
input.onButtonPressed(Button.A, function () {
    koi2.imageSave(koi2.Location.Flash, "abc.jpg")
})
input.onButtonPressed(Button.B, function () {
    koi2.imageDisplay(koi2.Location.Flash, "abc.jpg", 3)
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.NoneMode, koi2.IOTSwitch.OFF)
```

Usage: KOI Buttons

```blocks
koi2.onButtonPressed(koi2.BTNCmd.AB, function () {
    basic.showIcon(IconNames.Heart)
})
koi2.onButtonPressed(koi2.BTNCmd.B, function () {
    basic.showString("B")
})
koi2.onButtonPressed(koi2.BTNCmd.A, function () {
    basic.showString("A")
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.NoneMode, koi2.IOTSwitch.OFF)
```

Usage: displayText

```blocks
input.onButtonPressed(Button.A, function () {
    koi2.textDisplay(
    "hello kitten",
    0,
    0,
    koi2.TextColor.Red,
    3
    )
})
input.onButtonPressed(Button.B, function () {
    koi2.textDisplay(
    "KOI",
    0,
    0,
    koi2.TextColor.Blue,
    3
    )
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.NoneMode, koi2.IOTSwitch.OFF)
```

Usage: colorBlockTracking

```blocks
input.onButtonPressed(Button.A, function () {
    koi2.lineFollowerSetThreshold(koi2.ColorNames.Red)
})
input.onButtonPressed(Button.B, function () {
    koi2.colorTrackingCalibrate()
    koi2.colorTrackingSetColor(koi2.ColorList.Custom)
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.ColorBlobTracking, koi2.IOTSwitch.OFF)
basic.forever(function () {
    basic.showNumber(koi2.colorTrackingGetPosition(koi2.GetResult.ResultY))
})
```

Usage: Facial Attributes

```blocks
input.onButtonPressed(Button.A, function () {
    koi2.lcdDirection(koi2.LCDDirection.Front)
})
input.onButtonPressed(Button.B, function () {
    koi2.lcdDirection(koi2.LCDDirection.Back)
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.FaceTracking, koi2.IOTSwitch.OFF)
basic.forever(function () {
    if (koi2.faceTrackingGetState(koi2.FaceAttrState.smile)) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Asleep)
    }
})
```

Usage: faceMask

```blocks
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.FaceMask, koi2.IOTSwitch.OFF)
basic.forever(function () {
    if (koi2.faceMaskIsLetter(koi2.MaskState.A)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})

```

## License

MIT

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
