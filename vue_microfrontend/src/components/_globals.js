// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  './',
  // Do not look in subdirectories
  true,
  // Only include  .vue files
  /.+\.vue$/
)
// console.log(requireComponent.keys())
// For each matching file name...
requireComponent.keys().forEach((fileName) => {
    // console.log(fileName)
  // Get the component config
  const componentConfig = requireComponent(fileName)
  fileName = fileName.split('/').slice(-1)[0]
  // Get the PascalCase version of the component name
  const componentName = upperFirst(
    camelCase(
      fileName
        // Remove the "./_" from the beginning
        .replace(/^\.\/_/, '')
        // Remove the file extension from the end
        .replace(/\.\w+$/, '')
    )
  )
  console.log('loaded component - ',componentName)
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})