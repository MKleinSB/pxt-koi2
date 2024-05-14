//% color="#5c7cfa" weight=10 icon="\u03f0"
//% groups='["Basic", "Face tracking", "Face Mask", "Color blob tracking", "Line follower","Classifier",  "Traffic sign", "Number recognition", "Letter recognition","Object tracking","Scan Code","Custom","WIFI"]'
//% block="koi2"

namespace koi2 {

    let _koiNewEventId = 1228
    type Evtss = (t1: string, t2: string) => void
    let _mqttDataEvt: Evtss = null
    // cached results
    let _className: string = ''
    let _classTarget:string = ''
    let _classTargetMain: boolean = true
    let _classSimilarity:number = 0
    let _faceAttrList: string[] = []
    let _posX: number = -1
    let _posY: number = -1
    let _posW: number = -1
    let _posH: number = -1
    let _lineX1: number = -1
    let _lineY1: number = -1
    let _lineX2: number = -1
    let _lineY2: number = -1

    let updateTime = input.runningTime()

    let _initState = false

    function valReset(){
        if (input.runningTime() - updateTime > 1000){
            _className = ''
            _classTarget = ''
            _classTargetMain = true
            _classSimilarity = 0
            _faceAttrList = []
            _posX = -1
            _posY = -1
            _posW = -1
            _posH = -1
            _lineX1 = -1
            _lineY1 = -1
            _lineX2 = -1
            _lineY2 = -1
        }
    }


    const PortSerial = [
        [SerialPin.P0, SerialPin.P8],
        [SerialPin.P1, SerialPin.P12],
        [SerialPin.P2, SerialPin.P13],
        [SerialPin.P14, SerialPin.P15],
    ]
    
    export enum SerialPorts {
        //% block=port1
        Port1 = 0,
        //% block=port2
        Port2 = 1,
        //% block=port3
        Port3 = 2,
        //% block=port4
        Port4 = 3,
    }

    export enum LCDDirection {
        //% block=front
        Front = 0,
        //% block=back
        Back = 2
    }

    let paths = ["/flash/", "/sd/"]
    export enum Location {
        //% block=flash
        Flash = 0,
        //% block=SD
        SD = 1
    }

    export enum BTNCmd {
        //% block="A"
        A = 1,
        //% block="B"
        B = 2,
        //% block="A+B"
        AB = 3
    }

    export enum CodeTypes {
        //% block="qrcode"
        Qrcode = 0,
        //% block="barcode"
        Barcode = 1,
    }

    export enum IOTSwitch {
        //% block="off"
        OFF = 0,
        //% block="on"
        ON = 0x80,
    }

    let colors = ["255,0,0", "0,255,0", "0,0,255", "255,255,255", "0,0,0"]
    export enum TextColor {
        //% block="red"
        Red = 0,
        //% block="green"
        Green = 1,
        //% block="blue"
        Blue = 2,
        //% block="white"
        White = 3,
        //% block="block"
        Block = 4,
    }

    export enum ColorList {
        //% block="red"
        Red = 0,
        //% block="blue"
        Blue = 1,
        //% block="custom"
        Custom = 9,
    }


    export enum ModelFunction {
        //% block="none mode"
        NoneMode = 0x0,
        //% block="traffic sign"
        TrafficSign = 0x1,
        //% block="object tracking"
        ObjectTracking = 0x2,
        //% block="face tracking"
        FaceTracking = 0x9,
        //% block="face mask"
        FaceMask = 0x7,
        //% block="custom model"
        CustomModel = 0x3,
        //% block="number recognition"
        NumberRecognition = 0x4,
        //% block="classify image"
        ClassifyImage = 0x5,
        //% block="letter recognition"
        LetterRecognition = 0x6,
        //% block="scan code"
        ScanCode = 0x100,
    }

    export enum CvFunction {
        //% block="color blob tracking"
        ColorBlobTracking = 0x10,
        //% block="line follower"
        LineFollower = 0x20,
    }

    export enum FullFunction {
        //% block="none mode"
        NoneMode = 0x0,
        //% block="traffic sign"
        TrafficSign = 0x1,
        //% block="object tracking"
        ObjectTracking = 0x2,
        //% block="face tracking"
        FaceTracking = 0x9,
        //% block="face mask"
        FaceMask = 0x7,
        //% block="custom model"
        CustomModel = 0x3,
        //% block="number recognition"
        NumberRecognition = 0x4,
        //% block="classify image"
        ClassifyImage = 0x5,
        //% block="letter recognition"
        LetterRecognition = 0x6,
        //% block="color blob tracking"
        ColorBlobTracking = 0x10,
        //% block="line follower"
        LineFollower = 0x20,
        //% block="scan code"
        ScanCode = 0x100,
    }

    export enum ColorNames {
        //% block="red"
        Red = 0,
        //% block="blue"
        Blue = 1,
        //% block="yellow"
        Yellow = 2,
        //% block="black"
        Black = 3,
        //% block="custom"
        Custom = 4,
    }



    /*
    * VOC2012Object Card
    */

    export enum VOC2012Object {
        //% block="aeroplane"
        Aeroplane = 0,
        //% block="bicycle"
        Bicycle = 1,
        //% block="bird"
        Bird = 2,
        //% block="boat"
        Boat = 3,
        //% block="bottle"
        Bottle = 4,
        //% block="bus"
        Bus = 5,
        //% block="car"
        Car = 6,
        //% block="cat"
        Cat = 7,
        //% block="chair"
        Chair = 8,
        //% block="cow"
        Cow = 9,
        //% block="dining table"
        DiningTable = 10,
        //% block="dog"
        Dog = 11,
        //% block="horse"
        Horse = 12,
        //% block="motorbike"
        Motorbike = 13,
        //% block="person"
        Person = 14,
        //% block="potted plant"
        PottedPlant = 15,
        //% block="sheep"
        Sheep = 16,
        //% block="sofa"
        Sofa = 17,
        //% block="train"
        Train = 18,
        //% block="TV monitor"
        TVMonitor = 19,
    }

    /*
    * Traffic sign Card
    */
    export enum TrafficCard {
        //% block="u-turn"
        Around = 0,
        //% block="forward"
        Forward = 1,
        //% block="left"
        Left = 2,
        //% block="right"
        Right = 3,
        //% block="speed limit 30"
        Limiting30 = 4,
        //% block="stop"
        Stop = 5,
        //% block="tunnel"
        Tunnel = 6
    }

    /**
    * Number Card
    */
    export enum NumberCard {
        //% block="0"
        Zero = 0,
        //% block="1"
        One = 1,
        //% block="2"
        Two = 2,
        //% block="3"
        Three = 3,
        //% block="4"
        Four = 4,
        //% block="5"
        Five = 5,
        //% block="6"
        Six = 6,
        //% block="7"
        Seven = 7,
        //% block="8"
        Eight = 8,
        //% block="9"
        Nine = 9
    }
    /**
    * Letter Card
    */
    export enum LetterCard {
        //% block="A"
        A = 0,
        //% block="B"
        B = 1,
        //% block="C"
        C = 2,
        //% block="D"
        D = 3,
        //% block="E"
        E = 4,
        //% block="F"
        F = 5
    }

    /**
    * Mask State
    */
    export enum MaskState {
        //% block="without mask"
        Without = 0,
        //% block="with mask"
        With = 1
    }

    /**
    * Result list
    */
    export enum GetResult {
        //% block="x"
        ResultX = 1,
        //% block="y"
        ResultY = 2,
        //% block="w"
        ResultW = 3,
        //% block="h"
        ResultH = 4
    }

    /**
     * Result XY
     */
    export enum GetResultXY {
        //% block="x"
        ResultX = 1,
        //% block="y"
        ResultY = 2
    }

    /**
     * Result line
     */
    export enum Getline {
        //% block="x1"
        ResultX1 = 1,
        //% block="y1"
        ResultY1 = 2,
        //% block="x2"
        ResultX2 = 3,
        //% block="y2"
        ResultY2 = 4
    }

    /**
     * face attr state
     */
    export enum FaceAttrState {
        //% block="smile"
        Smile = 2,
        //% block="glasses"
        Glasses = 3,
        //% block="open mouth"
        OpenMouth = 1,
        //% block="male"
        Male = 0,
    }

    /**
     * face attr Quantity
     */
    export enum FaceAttrQuantity {
        //% block="headcount"
        Headcount = 4,
        //% block="smile"
        Smile = 8,
        //% block="glasses"
        Glasses = 8,
        //% block="open mouth"
        OpenMouth = 6,
        //% block="male"
        Male = 5,
    }

    /**
     * custom model menu
     */
    export enum CustomModelMenu{
        //% block="ball"
        Ball = 0xa20000,
        //% block="pillar"
        Pillar = 0xab0000,
    }



    let btnEvent: (btn: number) => void

    function trim(n: string): string {
        while (n.charCodeAt(n.length - 1) < 0x1f) {
            n = n.slice(0, n.length - 1)
        }
        return n
    }

    let modelCmd: number[] = [31, 81, 82, 83, 84, 85, 20, 86];
    function koi2UpdateData(): void {
        control.inBackground(function() {
            while (1) {
                updateTime = input.runningTime()
                let a = serial.readLine()
                if (a.charAt(0) == 'K') {
                    a = trim(a)
                    let b = a.slice(1, a.length).split(' ')
                    let cmd = parseInt(b[0])
                    if (cmd == 0){
                        _initState = true
                    }else if (cmd == 42) { // feature extraction
                        try {
                            if (_classTarget == b[1] || _classTargetMain) {
                                _className = b[1]
                                let result = ""
                                for (let i = 2; i < b.length; i++) {
                                    result += b[i]
                                }
                                _classSimilarity = parseInt(b[2])
                            }
                        } catch (e) {

                        }
                    } else if (cmd == 34) { // face attr
                        _posX = parseInt(b[1])
                        _posY = parseInt(b[2])
                        _posW = parseInt(b[3])
                        _posH = parseInt(b[4])
                        _faceAttrList = b.slice(5)
                    } else if (cmd == 15) { // color blob tracking
                        _posX = parseInt(b[1])
                        _posY = parseInt(b[2])
                        _posW = parseInt(b[3])
                        _posH = parseInt(b[4])
                    } else if (cmd == 19) { // line follower color
                        _lineX1 = parseInt(b[1])
                        _lineY1 = parseInt(b[2])
                        _lineX2 = parseInt(b[3])
                        _lineY2 = parseInt(b[4])
                    } else if (modelCmd.indexOf(cmd) != -1) { // model cmd
                        _posX = parseInt(b[1])
                        _posY = parseInt(b[2])
                        _posW = parseInt(b[3])
                        _posH = parseInt(b[4])
                        _className = b[5]
                    } else if (cmd == 3) { // btn
                        control.raiseEvent(_koiNewEventId, parseInt(b[1]))
                    } else if (cmd == 55) { // btn
                        if (_mqttDataEvt) {
                            _mqttDataEvt(b[1], b[2])
                        }
                    }
                }
            }
        })

    }

    /**
    * Set the function of koi2 running
    * @param func Function; eg: NoneMode
    * @param iotSwitch switch; eg: OFF
    */
    //% blockId=koi2_switch_function block="switch function %func iot %iotSwitch"
    //% weight=100 group="Basic"
    //% func.fieldEditor="gridpicker"
    //% func.fieldOptions.columns=3
    export function switchFunction(func: FullFunction, iotSwitch: IOTSwitch): void {
        serial.writeLine(`K97 ${func + iotSwitch}`)
        basic.pause(500)
        _initState = false
        while (!_initState){
            serial.writeLine("K0")
            basic.pause(1000)
        }
    }

    function resultXYWH(res: GetResult): number {
        let ret = -1
        if (res == GetResult.ResultX) {
            ret = _posX
        } else if (res == GetResult.ResultY) {
            ret = _posY
        } else if (res == GetResult.ResultW) {
            ret = _posW
        } else if (res == GetResult.ResultH) {
            ret = _posH
        }
        return ret
    }

    function resultXY(res: GetResultXY): number {
        let ret2 = -1
        if (res == GetResultXY.ResultX) {
            ret2 = _posX
        } else if (res == GetResultXY.ResultY) {
            ret2 = _posY
        }
        return ret2
    }

    function resultClass(): string {
        let ret3 = _className
        return ret3
    }

    function lineXY(res: Getline): number {
        let ret4 = -1
        if (res == Getline.ResultX1) {
            ret4 = _lineX1
        } else if (res == Getline.ResultY1) {
            ret4 = _lineY1
        } else if (res == Getline.ResultX2) {
            ret4 = _lineX2
        } else if (res == Getline.ResultY2) {
            ret4 = _lineY2
        }
        return ret4
    }

    /**
    * Powerbrick expansion module initialization
    */
    //% blockId=koi2_init_pw block="koi2 init powerbrick|port %port"
    //% group="Basic" weight=101
    export function koi2InitPw(port: SerialPorts): void {
        serial.redirect(PortSerial[port][0], PortSerial[port][1], BaudRate.BaudRate115200);
        serial.setTxBufferSize(64)
        serial.setRxBufferSize(64)
        serial.readString()
        serial.writeString('\n\n')

        koi2UpdateData()
    }

    /**
     * Init the koi2 library with serial connection
     * @param tx Tx pin; eg: SerialPin.P2
     * @param rx Rx pin; eg: SerialPin.P12 
     */
    //% blockId=koi2_init block="koi2 init tx %tx rx %rx"
    //% weight=101 group="Basic"
    export function koi2Init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate115200);
        serial.setTxBufferSize(64)
        serial.setRxBufferSize(64)
        serial.readString()
        serial.writeString('\n\n')

        koi2UpdateData()
    }

    /**
     * Adjust to the actual direction of the camera
     * @param dir Direction; eg: 0
     */
    //% blockId=koi2_lcd_direction block="lcd direction %dir"
    //% weight=99 group="Basic"
    export function lcdDirection(dir: LCDDirection): void {
        serial.writeLine(`K6 ${dir}`)
    }

    /**
     * When button is pressed
     * @param handler 
     */
    //% blockId=koi2_on_button_pressed block="on button |%btn pressed"
    //% weight=98 group="Basic"
    export function onButtonPressed(btn: BTNCmd, handler: () => void) {
        control.onEvent(_koiNewEventId, btn, handler);
    }


    /**
     * Enable Model + CV
     * @param model Function; eg: FaceTracking
     * @param cv Function; eg: ColorBlobTracking
     */
    //% blockId=koi2_enable_model_cv block="enable model %model cv %cv"
    //% weight=96 group="Basic"
    //% model.fieldEditor="gridpicker"
    //% model.fieldOptions.columns=3
    //% advanced=true
    export function enableModelCV(model: ModelFunction, cv: CvFunction): void {
        serial.writeLine(`K97 ${model + cv}`)
    }

    /**
     * Audio play
     * @param name file name; eg: abc.wav
     */
    //% blockId=koi2_audio_play block="play audio from /sd/%name"
    //% weight=99 group="Basic"
    export function audioPlay(name: string): void {
        serial.writeLine(`K62 ` + `/sd/` + name)
    }

    /**
     * Audio record
     * @param name file name; eg: abc.wav
     * @param sec duration; eg: 3
     */
    //% blockId=koi2_audio_record block="record audio to /sd/%name sec %sec"
    //% weight=99 group="Basic"
    export function audioRecord(name: string,sec :number): void {
        serial.writeLine(`K61 ` + `/sd/` + name +` `+sec)
    }

    /**
     * Save real-time screenshots
     * @param location path; eg: 0
     * @param name file name; eg: abc.jpg
     */
    //% blockId=koi2_image_save block="save img to %location %name"
    //% weight=99 group="Basic"
    export function imageSave(location: Location, name: string): void {
        serial.writeLine(`K2 ` + paths[location] + name)
    }

    /**
     * Image display
     * @param location path; eg: 0
     * @param name file name; eg: abc.jpg
     * @param sec duration; eg: 3
     */
    //% blockId=koi2_image_display block="display img from %location %name sec %sec"
    //% weight=99 group="Basic"
    export function imageDisplay(location: Location, name: string, sec:number): void {
        serial.writeLine(`K1 ` + paths[location] + name + ` `+sec*1000)
    }
    
    /**
     * Display text
     * @param text show text; eg: hello
     * @param x coord x; eg: 0
     * @param y coord y; eg: 0
     * @param color show color; eg: 0
     * @param sec duration; eg: 3
     */
    //% blockId=koi2_text_display block="display text %text x: %x y: %y color: %color sec: %sec"
    //% weight=99 group="Basic"
    export function textDisplay(text: string, x: number, y: number, color: TextColor, sec: number): void {
        serial.writeLine(`K4 ${x+40} ${y} ${sec*1000} ${colors[color]} ${text}`)
    }

    /**
     * Set the color you want to track
     * @param color 
     */
    //% blockId=koi2_color_blob_tracking_set_color block="color blob tracking set color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=90 group="Color blob tracking"
    export function colorTrackingSetColor(color: ColorList): void {
        serial.writeLine(`K18 ${color}`)
    }

    /**
     * Calibrated color settings are updated to "Custom"
     */
    //% blockId=koi2_color_blob_tracking_calibrate block="color blob tracking calibrate"
    //% weight=90 group="Color blob tracking"
    export function colorTrackingCalibrate(): void {
        serial.writeLine(`K16`)
    }

    /**
     * Color blob tracking get result
     */
    //% blockId=koi2_color_tracking_get_position block="color blob tracking get result %res"
    //% weight=89 group="Color blob tracking"
    export function colorTrackingGetPosition(res: GetResult): number {
        return resultXYWH(res)
    }

    /**
     * Determine whether the sign type matches
     * @returns class
     */
    //% block="traffic sign is class %tsclass"
    //% blockId=koi2_traffic_sign_is_class
    //% weight=80 group="Traffic sign"
    //% tsclass.fieldEditor="gridpicker"
    //% tsclass.fieldOptions.columns=2
    export function trafficSignIsClass(tsclass: TrafficCard): boolean {
        valReset()
        let traffic = ["U-Turn", "forward", "left", "right", "limit-30", "stop", "tunnel"]
        return _className == traffic[tsclass]
    }

    /**
     * Return type name directly
     * @returns class
     */
    //% block="traffic sign get class"
    //% blockId=koi2_traffic_sign_get_class
    //% weight=80 group="Traffic sign"
    //% tsclass.fieldEditor="gridpicker"
    //% tsclass.fieldOptions.columns=2
    export function trafficSignGetClass(): string {
        valReset()
        return _className
    }

    /**
     * Return traffic sign coordinates
     * @returns position; eg: GetResult.ResultX
     */
    //% blockId=koi2_traffic_sign_get_position block="traffic sign get %res"
    //% weight=79 group="Traffic sign"
    export function trafficSignGetPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }

    /**
     * Calibrated color settings are updated to "Custom"
     */
    //% blockId=koi2_line_follower_calibration block="line follower calibration"
    //% weight=70 group="Line follower"
    export function lineFollowerCalibration() {
        serial.writeLine(`K16`)
    }

    /**
     * Set the color of the lines to be traced
     * @param color
     */
    //% blockId=koi2_line_follower_set_threshold block="line follower set threshold %key"
    //% weight=71 group="Line follower"
    export function lineFollowerSetThreshold(key: ColorNames) {
        serial.writeLine(`K18 ${key}`)
    }

    /**
     * Returns the coordinates of both ends of the line segment
     * @returns bias x
     */
    //% blockId=koi2_line_follower_get_position block="line follower get %res"
    //% weight=69 group="Line follower"
    export function lineFollowerGetPosition(res: Getline): number {
        return lineXY(res)
    }

    /**
    * Return face coordinates, length and width
    */
    //% block="face tracking get %res"
    //% blockId=koi2_face_tracking_get_position
    //% weight=60 group="Face tracking"
    export function faceTrackingGetPosition(res: GetResult): number {
        return resultXYWH(res)
    }

    /**
    * Get quantity related information
    */
    //% block="face tracking get %quantityType quantity"
    //% blockId=koi2_face_tracking_get_quantity
    //% weight=60 group="Face tracking"
    export function faceTrackingGetQuantity(quantityType:FaceAttrQuantity): number {
        valReset()
        let quantity = _faceAttrList[quantityType]
        _faceAttrList[quantityType] = "-1"
        return parseInt(quantity)
    }

    /**
    * Get face-related status information
    */
    //% block="face tracking get state %stateType"
    //% blockId=koi2_face_tracking_get_state
    //% weight=60 group="Face tracking"
    export function faceTrackingGetState(stateType: FaceAttrState): boolean {
        valReset()
        let state = _faceAttrList[stateType]
        _faceAttrList[stateType] = "-1"
        return parseInt(state) == 1
    }

    /**
     * Determine object type
     * @param object VOC2012Object; eg: VOC2012Object.cat
     */
    //% block="object tracking is class %object"
    //% blockId=koi2_object_tracking_is_class
    //% weight=50 group="Object tracking"
    export function objectTrackingIsClass(obj: VOC2012Object): boolean {
        valReset()
        let objectList = ["aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow", "dining table", "dog", "horse", "motorbike", "person", "potted plant", "sheep", "sofa", "train", "tvmonitor"]
        return _className == objectList[obj]
    }

    /**
     * Object tracking get class
     */
    //% block="object tracking get class"
    //% blockId=koi2_object_tracking_get_class
    //% weight=50 group="Object tracking"
    export function objectTrackingGetClass(): string {
        valReset()
        let ret52 = _className
        return ret52
    }

    /**
     * Return object coordinates, length and width
     * @param axis for x; eg: GetResult.ResultX
     * @returns position
     */
    //% block="object tracking get position %axis"
    //% blockId=koi2_object_tracking_get_position
    //% weight=49 group="Object tracking"
    export function objectTrackingGetPosition(axis: GetResult): number {
        valReset()
        return resultXYWH(axis)
    }

    /**
     * Clear study data
     */
    //% block="classify image reset"
    //% blockId=koi2_classify_image_reset
    //% weight=40 group="Classifier"
    export function classifyImageReset(): void {
        serial.writeLine(`K45`)
    }

    /**
     * After setting, only this label will be returned no matter what the situation is, which is used to obtain the similarity of labels in different situations.
     * @param name tag; eg: apple
     */
    //% blockId=koi2_classify_image_set_detection_target block="classify image set detection target %name"
    //% weight=30 group="Classifier"
    export function classifyImageSetTarget(name: string): void {
        _classTarget = name
        _classTargetMain = false
        serial.writeLine(`K42 ${name}`)
    }

    /**
     * Similarity of current results
     */
    //% blockId=koi2_classify_image_get_most_similar block="classify image get most similar "
    //% weight=30 group="Classifier"
    export function classifyImageGetMostSimilar(): void {
        _classTargetMain = true
        serial.writeLine(`K42`)
    }

    /**
     * Use the current screen as learning data for the specified label
     * @param name tag; eg: apple
     */
    //% blockId=koi2_classify_image_add_tag block="classify image add tag %name"
    //% weight=39 group="Classifier"
    export function classifyImageAddTagID(name: string): void {
        serial.writeLine(`K41 ${name}`)
    }

    /**
     * Classify image get class
     * @returns class
     */
    //% blockId=koi2_classify_image_get_class block="classify image get class"
    //% weight=38 group="Classifier"
    export function classifyImageGetClass(): string {
        valReset()
        return resultClass()
    }

    /**
     * Classify image get similarity
     * @returns class
     */
    //% blockId=koi2_classify_image_get_similarity block="classify image get similarity"
    //% weight=29 group="Classifier"
    export function classifyImageGetSimilarity(): number {
        valReset()
        let deviation = _classSimilarity
        deviation = Math.max(0, Math.min(deviation, 5));
        let similarity = (5 - deviation)/5*100
        return similarity
    }


    /**
     * Save training data
     * @param path json to save; eg: model.json
     */
    //% blockId=koi2_classify_image_save block="classify image save model to %location %path"
    //% group="Classifier" weight=35
    export function classifyImageSave(location: Location,path: string): void {
        let str = `K43 `+paths[location]+path
        serial.writeLine(str)
    }

    /**
     * Read training data
     * @param path json to load; eg: model.json
     */
    //% blockId=koi2_classify_image_load block="classify image load model from %location %path"
    //% group="Classifier" weight=34
    export function classifyImageLoad(location: Location, path: string): void {
        let str2 = `K44 ` + paths[location] + path
        serial.writeLine(str2)
    }


    /**
     * Determine whether numeric results are expected
     * @param number NumberCard; eg: NumberCard.6
     */
    //% block="number recognition number is %number"
    //% blockId=koi2_number_recognition_is_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionIsNumber(num: NumberCard): boolean {
        valReset()
        return _className == num.toString()
    }

    /**
     * Get the number with the largest area in the screen
     */
    //% block="number recognition get number"
    //% blockId=koi2_number_recognition_get_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionGetNumber(): number {
        valReset()
        let transfer2 = resultClass()
        if (transfer2 == '') {
            return -1
        }
        return parseInt(transfer2)
    }

    /**
    * Number recognition, return coordinates, length and width
    */
    //% block="number recognition get %res"
    //% blockId=koi2_number_recognition_get_position
    //% weight=60 group="Number recognition"
    export function numberRecognitionGetPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }


    /**
     * Determine whether the letter is the expected result
     * @param letter LetterCard; eg: LetterCard.6
     */
    //% block="letter recognition letter is %letter ?"
    //% blockId=koi2_letter_recognition_is_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionIsLetter(letter: LetterCard): boolean {
        valReset()
        let letterList = ["A", "B", "C", "D", "E", "F"]
        return _className == letterList[letter]
    }

    /**
     * Get the letter result with the largest area in the recognized image target
     */
    //% block="get letter coordinates, length and width"
    //% blockId=koi2_letter_recognition_get_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionGetLetter(): string {
        valReset()
        return resultClass()
    }

    /**
    * Letter Recognition Get Position
    */
    //% block="letter recognition get %res"
    //% blockId=koi2_letter_recognition_get_position
    //% weight=60 group="Letter recognition"
    export function letterRecognitionGetPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }

    /**
     * Check the wearing condition of the mask
     * @param maskState MaskState; eg: MaskState.0
     */
    //% block="face mask is %maskState ?"
    //% blockId=koi2_face_mask_is
    //% weight=40 group="Face Mask"
    export function faceMaskIsLetter(maskState: MaskState): boolean {
        valReset()
        let maskList = ["without-mask", "with-mask"]
        return resultClass() == maskList[maskState]
    }

    /**
    * Get the face coordinates, length and width of the main character
    */
    //% block="face mask get %res"
    //% blockId=koi2_face_mask_get_position
    //% weight=60 group="Face Mask"
    export function faceMaskGetPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }
    
    /**
    * Set scanning type
    */
    //% block="scan code type %codeType"
    //% blockId=koi2_scan_code_type
    //% weight=60 group="Scan Code"
    export function codeScanTypeSet(codeType: CodeTypes) {
        serial.writeLine(`K21 ${codeType}`)
    }

    /**
    * Returns the coordinates, length and width of the main target
    */
    //% block="scan code get %res"
    //% blockId=koi2_scan_code_position
    //% weight=60 group="Scan Code"
    export function codeScanPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }

    /**
    * Scan code results
    */
    //% block="scan code get result"
    //% blockId=koi2_scan_code_result
    //% weight=60 group="Scan Code"
    export function codeScanResult(): string {
        valReset()
        return resultClass()
    }

    /**
     * Load custom model from sd card
     * @param modelAddr path; eg: /sd/ballRGB.kmodel
     */
    //% blockId=koi2_custom_model_init_sd block="from sd card load model %modelAddr anchor is %anchor"
    //% weight=99 group="Custom"
    export function customModelInitfromSD(modelAddr: string, anchor: number[]): void {
        let anchorStr = ""
        for(let j=0;j<anchor.length;j++){
            anchorStr +=anchor[j].toString()
            if(j != anchor.length-1){
                anchorStr+=","
            }
        }
        serial.writeLine(`K87 1 ${modelAddr} ${anchorStr}`)
    }

    /**
     * Load model from within koi
     * @param modelAddr path; eg: 0xa20000
     */
    //% blockId=koi2_custom_model_init_koi2 block="from koi2 load model %modelAddr anchor is %anchor"
    //% weight=99 group="Custom"
    export function customModelInitfromKoi2(modelAddr: number, anchor: number[]): void {
        let anchorStr2 = ""
        for (let k = 0; k < anchor.length; k++) {
            anchorStr2 += anchor[k].toString()
            if (k != anchor.length - 1) {
                anchorStr2 += ","
            }
        }
        serial.writeLine(`K87 0 ${modelAddr} ${anchorStr2}`)
    }

    /**
     * Set anchor point value
     * @param modelAddr path; eg: 0xab0000
     */
    //% blockId=koi2_custom_model_preset block="from koi2 load pretrained model %modelAddr"
    //% weight=99 group="Custom"
    export function customModelPreset(modelAddr: CustomModelMenu): void {
        let anchorStr22 = ""
        if (modelAddr == 0xa20000){
            anchorStr22 = "1.25,1.25,1.50,1.50,1.72,1.72,1.97,1.97,2.34,2.31"
        } else if (modelAddr == 0xab0000){
            anchorStr22 = "1.78,1.97,2.28,2.56,2.69,3.12,3.31,3.78,4.03,4.59"
        }
        serial.writeLine(`K87 0 ${modelAddr} ${anchorStr22}`)
    }

    /**
    * Returns the coordinates, length and width of the main target
    */
    //% block="custom model get %res"
    //% blockId=koi2_custom_model_get_position
    //% weight=60 group="Custom"
    export function customModelGetPosition(res: GetResult): number {
        valReset()
        return resultXYWH(res)
    }

    /**
     * Return primary target id
     */
    //% block="custom model get id "
    //% blockId=koi2_custom_model_get_number
    //% weight=30 group="Custom"
    export function customModelGetId(): number {
        valReset()
        let id = _className
        if (id == '-1') {
            return -1
        }
        return parseInt(id)
    }

    /**
     * Connect to wifi
     * @param ssid SSID; eg: ssid
     * @param pass PASSWORD; eg: password
     */
    //% blockId=koi2_join_ap block="join ap %ssid %pass"
    //% group="WIFI" weight=50
    export function koi2JoinAp(ssid: string, pass: string) {
        serial.writeLine(`K50 ${ssid} ${pass}`)
        basic.pause(13000)
    }

    /**
     * Display the ip address on the koi screen
     */
    //% blockId=koi2_show_ip_address block="show ip address"
    //% group="WIFI" weight=49
    export function koi2ShowIpAddress() {
        let str3 = `K54`
        serial.writeLine(str3)
        basic.pause(2000)
        serial.writeLine(str3)
        basic.pause(2000)

    }

    /**
     * Connect to iot server
     * @param host Mqtt host; eg: iot.kittenbot.cn
     * @param cid Client ID; eg: clientid
     * @param port Host Port; eg: 1883
     * @param user Username;
     * @param pass Password;
     */
    //% blockId=koi2_mqtt_host block="mqtt host %host| client id%cid||port%port user%user pass%pass"
    //% group="WIFI" weight=46
    export function koi2MqttHost(
        host: string,
        cid: string,
        port: number = 1883,
        user: string = null,
        pass: string = null
    ) {
        if (user && pass) {
            serial.writeLine(`K51 ${host} ${cid} ${port} ${user} ${pass}`)
        } else {
            serial.writeLine(`K51 ${host} ${cid} ${port}`)
        }
        basic.pause(2000)
    }

    /**
     * Subscribe to topics
     * @param topic Topic to subscribe; eg: /topic
     */
    //% blockId=koi2_mqtt_sub block="mqtt subscribe %topic"
    //% group="WIFI" weight=45
    export function koi2MqttSub(topic: string) {
        serial.writeLine(`K52 ${topic}`)
        basic.pause(500)
    }

    /**
     * Push messages to specified topics
     * @param topic Topic to publish; eg: /topic
     * @param data Data to publish; eg: hello
     */
    //% blockId=koi2_mqtt_pub block="mqtt publish %topic %data"
    //% group="WIFI" weight=44
    export function koi2MqttPub(topic: string, data: string) {
        serial.writeLine(`K53 ${topic} ${data}`)
    }

    /**
     * Request topic message
     */
    //% blockId=koi2_mqtt_read block="mqtt read"
    //% group="WIFI" weight=43
    export function koi2MqttRead() {
        let str3 = `K55`
        serial.writeLine(str3)
        basic.pause(1500)

    }
    /**
     * After receiving the topic message
     */
    //% blockId=koi2_mqtt_onread block="on mqtt message"
    //% group="WIFI" weight=42 draggableParameters=reporter
    export function koi2MqttOnread(
        handler: (data: string, topic: string) => void
    ) {
        _mqttDataEvt = handler
    }
}
