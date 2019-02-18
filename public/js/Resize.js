function resize (gameSize, baseSize, displaySize, resolution)
{
	console.log('Resizing...')
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    console.log('Resized!')
}