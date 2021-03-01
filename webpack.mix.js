let mix = require('laravel-mix')

mix.setPublicPath('dist')
   .vue()
   .js('resources/js/tool.js', 'js')
