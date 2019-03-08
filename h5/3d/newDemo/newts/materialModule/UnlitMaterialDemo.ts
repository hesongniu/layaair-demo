class UnlitMaterialDemo{
	private rotation:Laya.Vector3;
    constructor(){
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        
        var scene = Laya.stage.addChild(new Laya.Scene3D());
        
		var camera = new Laya.Camera(0, 0.1, 100);
		scene.addChild(camera);
        camera.transform.translate(new Laya.Vector3(0, 0.5, 1.5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        
		var directionLight = new Laya.DirectionLight();
		scene.addChild(directionLight);
        directionLight.color = new Laya.Vector3(1, 1, 1);
        
        this.rotation = new Laya.Vector3(0, 0.01, 0);

        var earth1 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere())) as Laya.MeshSprite3D;
        earth1.transform.position = new Laya.Vector3(-0.6, 0, 0);
        var earth2 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere())) as Laya.MeshSprite3D;
        earth2.transform.position = new Laya.Vector3(0.6, 0, 0);
        
        //创建Unlit材质
        var material = new Laya.UnlitMaterial();
        Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
            //设置反照率贴图
            material.albedoTexture = texture;
            //设置反照率强度
            material.albedoIntensity = 1;
        }));
        earth1.meshRenderer.material = material;
        
        //创建Unlit材质
        var material2 = new Laya.UnlitMaterial();
        Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
            //设置反照率贴图
            material2.albedoTexture = texture;
            //设置反照率强度
            material2.albedoIntensity = 1;
            //设置材质颜色
            material2.albedoColor = new Laya.Vector4(0, 0, 0.6, 1);
        }));
        earth2.meshRenderer.material = material2;
        
        Laya.timer.frameLoop(1, this, function() {
            earth1.transform.rotate(this.rotation, false);
            earth2.transform.rotate(this.rotation, false);
        });
    }
}
//激活启动类
new UnlitMaterialDemo();