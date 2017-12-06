module.exports = function(grunt, activeTheme, baseTask) {

	function runTasks() {

		const filesConfigurer = require('../../lib/staticAssets/filesConfigurer');
		const filesConfig = filesConfigurer.configure('images', activeTheme, grunt.config('themes'), baseTask);

		grunt.config('sync.images.files', filesConfig);

		grunt.task.run('sync:images');
	}

	return {
		runTasks: runTasks
	}
}