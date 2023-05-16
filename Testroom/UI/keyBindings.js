
class Key_Bindings extends Phaser.Scene {

    constructor(config) {
        super("Key_Bindings");
    }

    Init(data) {

    }

    create() {
        this.increment = 16
        this.colorMain = '#DD0000'
        this.colorOver = '#f39c12'
        this.createButtons()
        this.createBack()
        this.buttonBack.on('pointerdown', () => this.startScene.call(this, 'Settings'));
        /*
                this.moveLeft.on('pointerdown', () => this.startScene.call(this, +1));
                this.moveRight.on('pointerdown', () => this.startScene.call(this, -1));
                this.moveJump.on('pointerdown', () => this.startScene.call(this, +1));
                this.toolGravity.on('pointerdown', () => this.startScene.call(this, -1));
                this.buttonKeys.on('pointerdown', () => this.startScene.call(this, 'Key_Binding'));
        */
    }


    update() { }


    createButtons() {
        //Left
        this.moveLeft = this.add.text(this.increment * 22, this.increment * 4, 'Move Left', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveLeft.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveLeft.setStyle({ fill: this.colorMain }))
        this.textLeft = this.add.text(this.increment * 26, this.increment * 4, 'Q', { fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Right
        this.moveRight = this.add.text(this.increment * 22, this.increment * 8, 'Move Right', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveRight.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveRight.setStyle({ fill: this.colorMain }))
        this.textRight = this.add.text(this.increment * 26, this.increment * 8, 'D', { fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Jump
        this.moveJump = this.add.text(this.increment * 22, this.increment * 12, 'Jump/Hover', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveJump.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveJump.setStyle({ fill: this.colorMain }))
        this.textJump = this.add.text(this.increment * 26, this.increment * 12, 'Z', { fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Gravity tool
        this.toolGravity = this.add.text(this.increment * 22, this.increment * 16, 'Gravity Tool', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.toolGravity.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.toolGravity.setStyle({ fill: this.colorMain }))
        this.textJump = this.add.text(this.increment * 26, this.increment * 16, 'G', { fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        this.buttonKeys = this.add.text(this.increment * 22, this.increment * 27, 'Key Bindings', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonKeys.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonKeys.setStyle({ fill: this.colorMain }))
    }


    createBack() {
        this.buttonBack = this.add.text(this.increment * 8, this.increment * 40, 'Back', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonBack.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonBack.setStyle({ fill: this.colorMain }))
    }

    startScene(sceneName) {
        console.log(sceneName)
        this.scene.switch(sceneName);
    }

    setKey(){
        
    }
    playAmbientMusic() {
        this.music = this.sound.play("menu", { volume: 0.35 });
    }
}

export default Key_Bindings;