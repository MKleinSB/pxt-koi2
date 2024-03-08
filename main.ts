//% color="#5c7cfa" weight=10 icon="\u03f0"
//% groups='["Basic", "Face tracking", "Face Mask", "Color blob tracking", "Line follower","Classifier",  "Traffic sign", "Number recognition", "Letter recognition","Object tracking","Scan Code","Custom","WIFI"]'
//% block="koi2"

namespace koi2 {

    let koiNewEventId = 1228
    type Evtss = (t1: string, t2: string) => void
    let mqttDataEvt: Evtss = null

    // cached results
    let _className: string = ''
    let _classSimilarity: { [key: string]: any } = {};
    let _faceAttrList: string[] = []
    let _posX: number = -1
    let _posY: number = -1
    let _posW: number = -1
    let _posH: number = -1
    let _lineX1: number = -1
    let _lineY1: number = -1
    let _lineX2: number = -1
    let _lineY2: number = -1

    const PortSerial = [
        [SerialPin.P0, SerialPin.P8],
        [SerialPin.P1, SerialPin.P12],
        [SerialPin.P2, SerialPin.P13],
        [SerialPin.P14, SerialPin.P15],
    ]

    export enum SerialPorts {
        PORT1 = 0,
        PORT2 = 1,
        PORT3 = 2,
        PORT4 = 3,
    }

    export enum LCD_Direction {
        //% block=Front
        Front = 0,
        //% block=Back
        Back = 2
    }

    let paths = ["/flash/", "/sd/"]
    export enum Location {
        //% block=Flash
        Falsh = 0,
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
        A = 0,
        //% block="barcode"
        B = 1,
    }

    export enum IOTSwitch {
        //% block="OFF"
        OFF = 0,
        //% block="ON"
        ON = 0x80,
    }

    let colors = ["255,0,0", "0,255,0", "0,0,255", "255,255,255", "0,0,0"]
    export enum TextColor {
        //% block="Red"
        Red = 0,
        //% block="Green"
        Green = 1,
        //% block="Blue"
        Blue = 2,
        //% block="White"
        White = 3,
        //% block="Block"
        Block = 4,
    }

    export enum ColorList {
        //% block="Red"
        Red = 0,
        //% block="Blue"
        Blue = 1,
        //% block="Custom"
        Custom = 9,
    }


    export enum ModelFunction {
        //% block=NoneMode
        NoneMode = 0x0,
        //% block=TrafficSign
        TrafficSign = 0x1,
        //% block=ObjectTracking
        ObjectTracking = 0x2,
        //% block=FaceTracking
        FaceTracking = 0x9,
        //% block=FaceMask
        FaceMask = 0x7,
        //% block=CustomModel
        CustomModel = 0x3,
        //% block=NumberRecognition
        NumberRecognition = 0x4,
        //% block=ClassifyImage
        ClassifyImage = 0x5,
        //% block=LetterRecognition
        LetterRecognition = 0x6,
        //% block=ScanCode
        ScanCode = 0x100,
    }

    export enum CvFunction {
        //% block=ColorBlobTracking
        ColorBlobTracking = 0x10,
        //% block=LineFollower
        LineFollower = 0x20,
    }

    export enum FullFunction {
        //% block=NoneMode
        NoneMode = 0x0,
        //% block=TrafficSign
        TrafficSign = 0x1,
        //% block=ObjectTracking
        ObjectTracking = 0x2,
        //% block=FaceTracking
        FaceTracking = 0x9,
        //% block=FaceMask
        FaceMask = 0x7,
        //% block=CustomModel
        CustomModel = 0x3,
        //% block=NumberRecognition
        NumberRecognition = 0x4,
        //% block=ClassifyImage
        ClassifyImage = 0x5,
        //% block=LetterRecognition
        LetterRecognition = 0x6,
        //% block=ColorBlobTracking
        ColorBlobTracking = 0x10,
        //% block=LineFollower
        LineFollower = 0x20,
        //% block=ScanCode
        ScanCode = 0x100,
    }

    export enum ColorNames {
        //% block=red
        red = 0,
        //% block=blue
        blue = 1,
        //% block=yellow
        yellow = 2,
        //% block=black
        black = 3,
        //% block="Custom"
        Custom = 4,
    }



    /*
    * VOC2012_Object Card
    */

    export enum VOC2012_Object {
        //% block=aeroplane
        aeroplane = 0,
        //% block=bicycle
        bicycle = 1,
        //% block=bird
        bird = 2,
        //% block=boat
        boat = 3,
        //% block=bottle
        bottle = 4,
        //% block=bus
        bus = 5,
        //% block=car
        car = 6,
        //% block=cat
        cat = 7,
        //% block=chair
        chair = 8,
        //% block=cow
        cow = 9,
        //% block=diningtable
        diningtable = 10,
        //% block=dog
        dog = 11,
        //% block=horse
        horse = 12,
        //% block=motorbike
        motorbike = 13,
        //% block=person
        person = 14,
        //% block=pottedplant
        pottedplant = 15,
        //% block=sheep
        sheep = 16,
        //% block=sofa
        sofa = 17,
        //% block=train
        train = 18,
        //% block=tvmonitor
        tvmonitor = 19,
    }

    /*
    * Traffic sign Card
    */
    export enum TrafficCard {
        //% block="U-Turn"
        Around = 0,
        //% block="Forward"
        Forward = 1,
        //% block="Left"
        left = 2,
        //% block="Right"
        Right = 3,
        //% block="Speed Limit 30"
        Limiting30 = 4,
        //% block="Stop"
        Stop = 5,
        //% block="Tunnel"
        Tunnel = 6
    }

    /**
    * Number Card
    */
    export enum NumberCard {
        //% block="0"
        zero = 0,
        //% block="1"
        one = 1,
        //% block="2"
        two = 2,
        //% block="3"
        three = 3,
        //% block="4"
        four = 4,
        //% block="5"
        five = 5,
        //% block="6"
        six = 6,
        //% block="7"
        seven = 7,
        //% block="8"
        eight = 8,
        //% block="9"
        nine = 9
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
        //% block="without-mask"
        A = 0,
        //% block="with-mask"
        B = 1
    }

    /**
    * Result list
    */
    export enum GetResult {
        //% block="X"
        result_X = 1,
        //% block="Y"
        result_Y = 2,
        //% block="W"
        result_W = 3,
        //% block="H"
        result_H = 4
    }

    /**
     * Result XY
     */
    export enum GetResultXY {
        //% block="X"
        result_X = 1,
        //% block="Y"
        result_Y = 2
    }

    /**
     * Result line
     */
    export enum Getline {
        //% block="X1"
        result_X1 = 1,
        //% block="Y1"
        result_Y1 = 2,
        //% block="X2"
        result_X2 = 3,
        //% block="Y2"
        result_Y2 = 4
    }

    /**
     * face attr state
     */
    export enum FaceAttrState {
        //% block="smile"
        smile = 2,
        //% block="glasses"
        glasses = 3,
        //% block="openMouth"
        openMouth = 1,
        //% block="male"
        male = 0,
    }

    /**
     * face attr Quantity
     */
    export enum FaceAttrQuantity {
        //% block="headcount"
        headcount = 4,
        //% block="smile"
        smile = 8,
        //% block="glasses"
        glasses = 8,
        //% block="openMouth"
        openMouth = 6,
        //% block="male"
        male = 5,
    }


    let btnEvent: (btn: number) => void

    function trim(n: string): string {
        while (n.charCodeAt(n.length - 1) < 0x1f) {
            n = n.slice(0, n.length - 1)
        }
        return n
    }
    let modelCmd: number[] = [31, 81, 82, 83, 84, 85, 20, 86];
    /**
     * koi2 update date
     */
    //% blockId=koi2_updateData block="koi2 update date"
    //% weight=97 group="Basic"
    export function koi2UpdateData(): void {
        let a = serial.readUntil('\n')
        serial.writeString(a)
        if (a.charAt(0) == 'K') {
            a = trim(a)
            let b = a.slice(1, a.length).split(' ')
            let cmd = parseInt(b[0])
            if (cmd == 42) { // feature extraction
                try{
                    _className = b[1]
                    let result = ""
                    for (let i = 2; i < b.length; i++) {
                        result += b[i]
                    }
                    _classSimilarity = JSON.parse(result)
                }catch(e){
                    _className = ""
                    _classSimilarity = {}
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
                control.raiseEvent(koiNewEventId, parseInt(b[1]))
            } else if (cmd == 55) { // btn
                if (mqttDataEvt) {
                    mqttDataEvt(b[1], b[2])
                }
            }
        }
    }

    function getResultXYWH(res: GetResult): number {
        let ret = -1
        if (res == GetResult.result_X) {
            ret = _posX
            _posX = -1
        } else if (res == GetResult.result_Y) {
            ret = _posY
            _posY = -1
        } else if (res == GetResult.result_W) {
            ret = _posW
            _posW = -1
        } else if (res == GetResult.result_H) {
            ret = _posH
            _posH = -1
        }
        return ret
    }

    function getResultXY(res: GetResultXY): number {
        let ret2 = -1
        if (res == GetResultXY.result_X) {
            ret2 = _posX
            _posX = -1
        } else if (res == GetResultXY.result_Y) {
            ret2 = _posY
            _posY = -1
        }
        return ret2
    }

    function getResultClass(): string {
        let ret3 = _className
        _className = ''
        return ret3
    }

    function getlineXY(res: Getline): number {
        let ret4 = -1
        if (res == Getline.result_X1) {
            ret4 = _lineX1
            _lineX1 = -1
        } else if (res == Getline.result_Y1) {
            ret4 = _lineY1
            _lineY1 = -1
        } else if (res == Getline.result_X2) {
            ret4 = _lineX2
            _lineX2 = -1
        } else if (res == Getline.result_Y2) {
            ret4 = _lineY2
            _lineY2 = -1
        }
        return ret4
    }

    //% blockId=koi2_init_pw block="KOI2 init powerbrick|Port %port"
    //% group="Basic" weight=101
    export function koi2_init_pw(port: SerialPorts): void {
        serial.redirect(PortSerial[port][0], PortSerial[port][1], BaudRate.BaudRate115200);
        serial.setTxBufferSize(64)
        serial.setRxBufferSize(64)
        serial.readString()
        serial.writeString('\n\n')
    }

    /**
     * Init the koi2 library with serial connection
     * @param tx Tx pin; eg: SerialPin.P2
     * @param rx Rx pin; eg: SerialPin.P12 
     */
    //% blockId=koi2_init block="KOI2 init Tx %tx Rx %rx"
    //% weight=101 group="Basic"
    export function koi2_init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate115200);
        serial.setTxBufferSize(64)
        serial.setRxBufferSize(64)
        serial.readString()
        serial.writeString('\n\n')
    }

    /**
     * LCD Direction
     * @param dir Direction; eg: 0
     */
    //% blockId=koi2_lcd_direction block="LCD direction %dir"
    //% weight=99 group="Basic"
    export function lcdDirection(dir: LCD_Direction): void {
        serial.writeLine(`K6 ${dir}`)
    }

    /**
     * When button is pressed
     * @param handler 
     */
    //% blockId=koi2_on_button_pressed block="on button |%btn pressed"
    //% weight=98 group="Basic"
    export function onButtonPressed(btn: BTNCmd, handler: () => void) {
        control.onEvent(koiNewEventId, btn, handler);
    }
    
    /**
    * Switch Function
    * @param func Function; eg: NoneMode
    * @param iotSwitch switch; eg: OFF
    */
    //% blockId=koi2_switch_function block="switch function %func iot %iotSwitch"
    //% weight=100 group="Basic"
    //% func.fieldEditor="gridpicker"
    //% func.fieldOptions.columns=3
    export function switchFunction(func: FullFunction, iotSwitch: IOTSwitch): void {
        serial.writeLine(`K97 ${func + iotSwitch}`)
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
     * Audio Play
     * @param name file name; eg: abc.wav
     */
    //% blockId=koi2_audio_play block="play audio from /sd/%name"
    //% weight=99 group="Basic"
    export function audioPlay(name: string): void {
        serial.writeLine(`K62 ` + `/sd/` + name)
    }

    /**
     * Audio Record
     * @param name file name; eg: abc.wav
     * @param sec duration; eg: 3
     */
    //% blockId=koi2_audio_record block="record audio to /sd/%name sec %sec"
    //% weight=99 group="Basic"
    export function audioRecord(name: string,sec :number): void {
        serial.writeLine(`K61 ` + `/sd/` + name +` `+sec)
    }

    /**
     * Image Save
     * @param location path; eg: 0
     * @param name file name; eg: abc.jpg
     */
    //% blockId=koi2_image_save block="save img to %location %name"
    //% weight=99 group="Basic"
    export function imageSave(location: Location, name: string): void {
        serial.writeLine(`K2 ` + paths[location] + name)
    }

    /**
     * Image Display
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
     * Text display
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
     * Color Blob Tracking Set Color
     * @param color 
     */
    //% blockId=koi2_color_blob_tracking_set_color block="color blob tracking set color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=90 group="Color blob tracking"
    export function colorTrackingSetColor(color: ColorList): void {
        serial.writeLine(`K18 ${color}`)
    }

    /**
     * Color Blob Tracking Calibrate Color
     */
    //% blockId=koi2_color_blob_tracking_calibrate block="color blob tracking calibrate"
    //% weight=90 group="Color blob tracking"
    export function colorTrackingCalibrate(): void {
        serial.writeLine(`K16`)
    }

    /**
     * Color Blob Tracking Get Result
     */
    //% blockId=colorTrackingGetPosition block="color blob tracking get result %res"
    //% weight=89 group="Color blob tracking"
    export function colorTrackingGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Traffic Sign Is Class
     * @returns class
     */
    //% block="traffic sign is class %tsclass"
    //% blockId=koi2_traffic_sign_is_class
    //% weight=80 group="Traffic sign"
    //% tsclass.fieldEditor="gridpicker"
    //% tsclass.fieldOptions.columns=2
    export function trafficSignIsClass(tsclass: TrafficCard): boolean {
        let traffic = ["U-Turn", "forward", "left", "right", "limit-30", "stop", "tunnel"]
        return _className == traffic[tsclass]
    }

    /**
     * Traffic Sign Get Class
     * @returns class
     */
    //% block="traffic sign get class"
    //% blockId=koi2_traffic_sign_get_class
    //% weight=80 group="Traffic sign"
    //% tsclass.fieldEditor="gridpicker"
    //% tsclass.fieldOptions.columns=2
    export function trafficSignGetClass(): string {
        return _className
    }

    /**
     * Traffic Sign Get Position
     * @returns position; eg: GetResult.result_X
     */
    //% blockId=koi2_traffic_sign_get_position block="traffic sign get %res"
    //% weight=79 group="Traffic sign"
    export function trafficSignGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Line Follower calibration
     */
    //% blockId=koi2_line_follower_calibration block="line follower calibration"
    //% weight=70 group="Line follower"
    export function lineFollowerCalibration() {
        serial.writeLine(`K16`)
    }

    /**
     * Line Follower Set Key Color
     * @param color
     */
    //% blockId=koi2_line_follower_set_threshold block="line follower set threshold %threshold"
    //% weight=71 group="Line follower"
    export function lineFollowerSetThreshold(key: ColorNames) {
        serial.writeLine(`K18 ${key}`)
    }

    /**
     * Line Follower Get Position
     * @returns bias x
     */
    //% blockId=koi2_line_follower_get_position block="line follower get %res"
    //% weight=69 group="Line follower"
    export function lineFollowerGetPosition(res: Getline): number {
        return getlineXY(res)
    }

    /**
    * Face Tracking Get Position 
    */
    //% block="face tracking get %res"
    //% blockId=faceTrackingGetPosition
    //% weight=60 group="Face tracking"
    export function faceTrackingGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
    * Face Tracking Get Quantity
    */
    //% block="face tracking get quantity"
    //% blockId=koi2_face_tracking_get_quantity
    //% weight=60 group="Face tracking"
    export function faceTrackingGetQuantity(qunantityType:FaceAttrQuantity): number {
        let qunantity = _faceAttrList[qunantityType]
        _faceAttrList[qunantityType] = "-1"
        return parseInt(qunantity)
    }

    /**
    * Face Tracking Get State
    */
    //% block="face tracking get state %stateType"
    //% blockId=faceTrackingGetState
    //% weight=60 group="Face tracking"
    export function faceTrackingGetState(stateType: FaceAttrState): boolean {
        let state = _faceAttrList[stateType]
        _faceAttrList[stateType] = "-1"
        return parseInt(state) == 1
    }

    /**
     * Object Tracking is Class
     * @param object VOC2012_Object; eg: VOC2012_Object.cat
     */
    //% block="object tracking is class %object"
    //% blockId=koi2_object_tracking_is_class
    //% weight=50 group="Object tracking"
    export function objectTrackingIsClass(obj: VOC2012_Object): boolean {
        let objectList = ["aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow", "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]
        return _className == objectList[obj]
    }

    /**
     * Object Tracking Get Class
     */
    //% block="object tracking get class"
    //% blockId=koi2_object_tracking_get_class
    //% weight=50 group="Object tracking"
    export function objectTrackingGetClass(): string {
        let ret52 = _className
        return ret52
    }

    /**
     * Object Tracking Get Position
     * @param axis for x; eg: GetResult.result_X
     * @returns position
     */
    //% blockId=koi2_object_tracking_get_position block="object tracking get position %axis"
    //% weight=49 group="Object tracking"
    export function objectTrackingGetPosition(axis: GetResult): number {
        return getResultXYWH(axis)
    }

    /**
     * Classify Image Reset
     */
    //% blockId=koi2_classify_image_reset block="classify image reset"
    //% weight=40 group="Classifier"
    export function classifyImageReset(): void {
        serial.writeLine(`K45`)
    }

    /**
     * Classify Image Add Tag
     * @param name tag; eg: apple
     */
    //% blockId=koi2_classify_image_add_tag block="classify image add tag %name"
    //% weight=39 group="Classifier"
    export function classifyImageAddTagID(name: string): void {
        serial.writeLine(`K41 ${name}`)
    }

    /**
     * Classify Image Get Class
     * @returns class
     */
    //% blockId=koi2_classify_image_get_class block="classify image get class"
    //% weight=38 group="Classifier"
    export function classifyImageGetClass(): string {
        return getResultClass()
    }

    /**
     * Classify Image Get Similarity
     * @returns class
     */
    //% blockId=koi2_classify_image_get_similarity block="classify image get %class similarity"
    //% weight=38 group="Classifier"
    export function classifyImageGetSimilarity(classify: string): number {
        serial.writeLine("--------")
        serial.writeLine(classify)
        serial.writeLine("xxxxxxxx")
        let deviation = _classSimilarity[classify];
        deviation = Math.max(0, Math.min(deviation, 5));
        let similarity = (5 - deviation)/5*100
        return similarity
    }


    /**
     * Classify Image Save
     * @param path json to save; eg: model.json
     */
    //% blockId=koi2_classify_image_save block="classify image save model to %location %path"
    //% group="Classifier" weight=35
    export function classifyImageSave(location: Location,path: string): void {
        let str = `K43 `+paths[location]+path
        serial.writeLine(str)
    }

    /**
     * Classify Image Load
     * @param path json to load; eg: model.json
     */
    //% blockId=koi2_classify_image_load block="classify image load model from %location %path"
    //% group="Classifier" weight=34
    export function classifyImageLoad(location: Location, path: string): void {
        let str2 = `K44 ` + paths[location] + path
        serial.writeLine(str2)
    }


    /**
     * Number Recognition is Number
     * @param number NumberCard; eg: NumberCard.6
     */
    //% block="number recognition number is %number"
    //% blockId=koi2_number_recognition_is_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionIsNumber(num: NumberCard): boolean {
        return _className == num.toString()
    }

    /**
     * Number Recognition Get Number
     */
    //% block="number recognition get number "
    //% blockId=koi2_number_recognition_get_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionGetNumber(): number {
        let transfer2 = getResultClass()
        if (transfer2 == '') {
            return -1
        }
        return parseInt(transfer2)
    }

    /**
    * Number Recognition Get Position
    */
    //% block="number recognition get %res"
    //% blockId=koi2_number_recognition_get_position
    //% weight=60 group="Number recognition"
    export function numberRecognitionGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }


    /**
     * Letter Recognition is Letter
     * @param letter LetterCard; eg: LetterCard.6
     */
    //% block="letter recognition letter is %letter ?"
    //% blockId=koi2_letter_recognition_is_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionIsLetter(letter: LetterCard): boolean {
        let letterList = ["A", "B", "C", "D", "E", "F"]
        return _className == letterList[letter]
    }

    /**
     * Letter Recognition Get Letter
     */
    //% block="letter recognition get letter "
    //% blockId=koi2_letter_recognition_get_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionGetLetter(): string {
        return getResultClass()
    }

    /**
    * Letter Recognition Get Position
    */
    //% block="letter recognition get %res"
    //% blockId=koi2_letter_recognition_get_position
    //% weight=60 group="Letter recognition"
    export function letterRecognitionGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }    

    /**
     * Face Mask is
     * @param maskState MaskState; eg: MaskState.0
     */
    //% block="Face Mask is %maskState ?"
    //% blockId=koi2_face_mask_is
    //% weight=40 group="Face Mask"
    export function faceMaskIsLetter(maskState: MaskState): boolean {
        let maskList = ["with-mask", "without-mask"]
        return getResultClass() == maskList[maskState]
    }

    /**
    * Face Mask Get Position
    */
    //% block="Face Mask get %res"
    //% blockId=koi2_face_mask_get_position
    //% weight=60 group="Face Mask"
    export function faceMaskGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }
    
    /**
    * Scan Code
    */
    //% block="scan code type %codeType"
    //% blockId=koi2_scan_code_type
    //% weight=60 group="Scan Code"
    export function codeScanTypeSet(codeType: CodeTypes) {
        serial.writeLine(`K21 ${codeType}`)
    }

    /**
    * Scan Code Get Position
    */
    //% block="Scan Code get %res"
    //% blockId=koi2_scan_code_position
    //% weight=60 group="Scan Code"
    export function codeScanPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
    * Scan Code Get Result
    */
    //% block="Scan Code get result"
    //% blockId=koi2_scan_code_result
    //% weight=60 group="Scan Code"
    export function codeScanResult(): string {
        return getResultClass()
    }

    /**
     * Custom Model Init SDCard
     * @param modelAddr path; eg: /sd/ballRGB.kmodel
     */
    //% blockId=koi2_custom_model_init_sd block="from sdCard load model %modelAddr anchor is %anchor"
    //% weight=99 group="Custom"
    export function custmoModelInitfromSD(modelAddr: string, anchor: number[]): void {
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
     * Custom Model Init koi2
     * @param modelAddr path; eg: 0xa20000
     */
    //% blockId=koi2_custom_model_init_koi2 block="from koi2 load model %modelAddr anchor is %anchor"
    //% weight=99 group="Custom"
    export function custmoModelInitfromKoi2(modelAddr: number, anchor: number[]): void {
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
    * Custom Model Get Position
    */
    //% block="custom model get %res"
    //% blockId=koi2_custom_model_get_position
    //% weight=60 group="Custom"
    export function customModelGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Custom Model Get id
     */
    //% block="custom model get id "
    //% blockId=koi2_custom_model_get_number
    //% weight=30 group="Custom"
    export function customModelGetId(): number {
        let id = _className
        if (id == '-1') {
            return -1
        }
        return parseInt(id)
    }

    /**
     * @param ssid SSID; eg: ssid
     * @param pass PASSWORD; eg: password
     */
    //% blockId=koi2_join_ap block="Join Ap %ssid %pass"
    //% group="WIFI" weight=50
    export function koi2_join_ap(ssid: string, pass: string) {
        serial.writeLine(`K50 ${ssid} ${pass}`)
        basic.pause(13000)
    }

    /**
     * @param host Mqtt host; eg: iot.kittenbot.cn
     * @param cid Client ID; eg: clientid
     * @param port Host Port; eg: 1883
     * @param user Username; eg: user
     * @param pass Password; eg: pass
     */
    //% blockId=koi2_mqtt_host block="Mqtt Host %host| clientID%cid||Port%port User%user Pass%pass"
    //% group="WIFI" weight=46
    export function koi2_mqtt_host(
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
     * @param topic Topic to subscribe; eg: /topic
     */
    //% blockId=koi2_mqtt_sub block="Mqtt Subscribe %topic"
    //% group="WIFI" weight=45
    export function koi2_mqtt_sub(topic: string) {
        serial.writeLine(`K52 ${topic}`)
        basic.pause(500)
    }

    /**
     * @param topic Topic to publish; eg: /topic
     * @param data Data to publish; eg: hello
     */
    //% blockId=koi2_mqtt_pub block="Mqtt Publish %topic %data"
    //% group="WIFI" weight=44
    export function koi2_mqtt_pub(topic: string, data: string) {
        serial.writeLine(`K53 ${topic} ${data}`)
    }

    /**
     * @param topic Mqtt Read; eg: /topic
     */
    //% blockId=koi2_mqtt_read block="Mqtt Read %topic"
    //% group="WIFI" weight=43
    export function koi2_mqtt_read(topic: string) {
        topic = topic || ''
        let str3 = `K55 ${topic}`
        serial.writeLine(str3)
        basic.pause(200)

    }

    //% blockId=koi2_mqtt_onread block="on mqtt message %data %topic"
    //% group="WIFI" weight=42 draggableParameters=reporter
    export function koi2_mqtt_onread(
        handler: (data: string, topic: string) => void
    ) {
        mqttDataEvt = handler
    }
}
