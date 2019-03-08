class D3SpaceToD2Space {
    private scene:Laya.Scene3D;
    private camera:Laya.Camera;
    private layaMonkey3D:Laya.Sprite3D;
    private layaMonkey2D:Laya.Image;
    private _position:Laya.Vector3 = new Laya.Vector3();
    private _outPos:Laya.Vector3 = new Laya.Vector3();
    private scaleDelta:number = 0;
    constructor() {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        
        this.scene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D; 
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(0, 0.35, 1));
        this.camera.transform.rotate(new Laya.Vector3( -15, 0, 0), true, false);
        
        var directionLight:Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        
        var completeHandler:Laya.Handler = Laya.Handler.create(this, this.onComplete);
        
        Laya.loader.create("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", completeHandler);
    }
    public onComplete(): void {
       
			Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, function(layaMonkey3D:Laya.Sprite3D):void {
				this.layaMonkey3D = layaMonkey3D;
				this.scene.addChild(layaMonkey3D);
				this.layaMonkey2D = Laya.stage.addChild(new Laya.Image("res/threeDimen/monkey.png")) as Laya.Image;
				Laya.timer.frameLoop(1, this, this.animate);
			}))
    }

    private animate(): void {

            this._position.x = Math.sin(this.scaleDelta += 0.01);
            this.layaMonkey3D.transform.position = this._position;
            this.layaMonkey3D.transform.scale = new Laya.Vector3(0.1,0.1,0.1);
            //转换坐标
            this.camera.viewport.project(this.layaMonkey3D.transform.position, this.camera.projectionViewMatrix, this._outPos);
            //赋值给2D
            this.layaMonkey2D.pos(this._outPos.x / Laya.stage.clientScaleX, this._outPos.y / Laya.stage.clientScaleY);
    }
}
new D3SpaceToD2Space;