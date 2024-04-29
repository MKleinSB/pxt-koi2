input.onButtonPressed(Button.A, function () {
    basic.showString("" + (koi2.faceTrackingGetPosition(koi2.GetResult.ResultX)))
})
input.onButtonPressed(Button.B, function () {
    basic.showString("" + (koi2.faceTrackingGetPosition(koi2.GetResult.ResultY)))
})
koi2.koi2_init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.FaceTracking, koi2.IOTSwitch.OFF)
basic.forever(function () {
    koi2.koi2UpdateData()
})