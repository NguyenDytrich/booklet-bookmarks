module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
					@import "~bulma/sass/utilities/_all.sass";
				`
      }
    }
  }
};
