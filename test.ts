/**
 * Preface
 * please test the separate content of each serial number title separately.
 * don't download them all at once
 */

//1.Most visual modes

//The functions for obtaining coordinates for key events do not need to change with mode switching. 
//In fact, they all call the same variable.
input.onButtonPressed(Button.A, function () {
    basic.showString("" + (koi2.faceTrackingGetPosition(koi2.GetResult.ResultX)))
})
input.onButtonPressed(Button.B, function () {
    basic.showString("" + (koi2.faceTrackingGetPosition(koi2.GetResult.ResultY)))
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
//  most visual modes are universal, they all have xy coordinates
//  the following are all common. You can view the coordinates directly after switching modes.
//      koi2.FullFunction.TrafficSign
//      koi2.FullFunction.ObjectTracking
//      koi2.FullFunction.FaceTracking
//      koi2.FullFunction.FaceMask
//      koi2.FullFunction.CustomModel
//      koi2.FullFunction.NumberRecognition
//      koi2.FullFunction.LetterRecognition
//      koi2.FullFunction.ScanCod
koi2.switchFunction(koi2.FullFunction.FaceTracking, koi2.IOTSwitch.OFF)
basic.forever(function () {
    koi2.koi2UpdateData()
})

//2.ClassifyImage modes
input.onButtonPressed(Button.A, function () {
    koi2.classifyImageAddTagID("A")
})
input.onButtonPressed(Button.B, function () {
    koi2.classifyImageAddTagID("B")
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.ClassifyImage, koi2.IOTSwitch.OFF)
basic.forever(function () {
    basic.showString(koi2.classifyImageGetClass())
})
basic.forever(function () {
    koi2.koi2UpdateData()
})

//3.iot model
input.onButtonPressed(Button.A, function () {
    koi2.koi2MqttPub("/zzytest", "hello")
})
koi2.koi2MqttOnread(function (data, topic) {
    basic.showString(data)
})
koi2.koi2Init(SerialPin.P2, SerialPin.P12)
koi2.switchFunction(koi2.FullFunction.NoneMode, koi2.IOTSwitch.ON)
koi2.koi2JoinAp("zy", "12345678")
koi2.koi2MqttHost(
    "iot.kittenbot.cn",
    "clientid",
    1883,
    "",
    ""
)
koi2.koi2MqttSub("/zzytest")
basic.forever(function () {
    koi2.koi2MqttRead()
})
basic.forever(function () {
    koi2.koi2UpdateData()
})

