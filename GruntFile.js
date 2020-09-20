module.exports = function(grunt) {
	grunt.initConfig({
		conf: {
			testPath: 'spec'
		},
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: 
                '// <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) \n'+
                '// license:<%= pkg.license %> \n'+
                '// <%= pkg.author %> \n'
			},
			dist: {
				src: 'insQ.js',
				dest: 'insQ.min.js'
			}
		},

	
		jasmine: {
			src: 'insQ.js',
			options: {
				specs: '<%= conf.testPath %>/test.js'
			}
		},
		
		jshint: {
			code: {
				options: {
					jshintrc: '<%= conf.testPath %>/jshintrc.json'
				},
				src: [
					'insQ.js'
				]
			}
		},

	
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	
	grunt.registerTask('dist', ['jshint', 'jasmine',  'uglify:dist']);
	
	grunt.registerTask('default', ['dist']);
};